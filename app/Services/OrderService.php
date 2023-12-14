<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use Illuminate\Support\Facades\Crypt;

class OrderService
{

/**
 * @param Webhook $repository
 */
    public function __construct(Order $repository)
    {
        $this->repository = $repository;
    }

    public function index()
    {

        $data = [];
        $itemsPerPage = request('itemsPerPage') ?? 10;
        $filter = request('filter') ?? [];
        $sort = request('sort') ?? [];
        $pagination = request('pagination');
        if (empty($pagination)) {
            $pagination = 0;
        }

        $data['items_per_page'] = $itemsPerPage;
        $data['filters'] = $filter;
        $data['sort'] = $sort;
        $data['pagination'] = $pagination;
        $execution = $this->repository->index($data);

        foreach ($execution['data'] as $Orderkey => $OrderVal) {
            $OrderProduct = OrderProduct::where('transaction_id', '=', $OrderVal['id'])->first()->toArray();
            $OrderProduct['transaction_detail_id'] = $OrderProduct['id'];
            unset($OrderProduct['id']);

            $execution['data'][$Orderkey] = array_merge($OrderVal, $OrderProduct);
            if(strlen($execution['data'][$Orderkey]['date_delivered']) == 0){
                $execution['data'][$Orderkey]['date_delivered'] = 'Pending';
            }
            if(strlen($execution['data'][$Orderkey]['payed_on']) == 0){
                $execution['data'][$Orderkey]['payed_on'] = 'Pending';
            }
            if($execution['data'][$Orderkey]['payed_on'] != 'Pending' || $execution['data'][$Orderkey]['date_delivered'] != 'Pending' ){
                $execution['data'][$Orderkey]['order_status'] = 'Success';
            }else{
                $execution['data'][$Orderkey]['order_status'] = 'Pending';
            }


        }

        return $execution;
    }

    public function edit(int $Id)
    {
        $execution = $this->repository->edit($Id);
        return response($execution, 200)->header('Content-Type', 'application/json');
    }

    public function store(array $request)
    {

        // $currentUserId = auth()->id();
        $user_ID = Crypt::decryptString($request['user_ID']);
        $request['product_id'] = $request['productID_'];
        $request['user_id'] = $user_ID;
        $request['kg_added'] = $request['kg_'];
        $request['added_on'] = date('Y-m-d h:i:s');
        $message = '';
        $checkProduct = Product::where('id', $request['productID_'])->first();

        if ($checkProduct) {
            if ($checkProduct->prospect_harvest_in_kg - $checkProduct->actual_sold_kg <= 0) {
                $message = 'out of stock';

            } else if ($checkProduct->prospect_harvest_in_kg - $request['kg_added'] <= 0) {
                $message = 'out of stock';
                $execution = [
                    'status' => 0,
                    'message' => $message,
                ];
            } else {
                $execution = $this->repository->store($request);
            }
        }

        return $execution;
    }

    public function update(array $request)
    {

        $request['kg_added'] = $request['kg_'];
        $message = '';
        $execution = $this->repository->edit($request['id']);
        $checkProduct = Product::where('id', $execution['data']['product_id'])->first();

        if ($checkProduct) {
            if ($checkProduct->prospect_harvest_in_kg - $checkProduct->actual_sold_kg <= 0) {
                $message = 'out of stock';
            } else if ($checkProduct->prospect_harvest_in_kg - $request['kg_added'] <= 0) {
                $message = 'out of stock';
                $execution = [
                    'status' => 0,
                    'message' => $message,
                ];
            } else {
                $execution = $this->repository->execute_update($request);
            }
        }

        return $execution;
    }
    public function destroy($id)
    {
        // $existing_data = $this->edit($id);
        $execution = $this->repository->execute_destroy($id);

        // if ($execution['status'] === 1 && $existing_data) {
        //     // $existing_data = $existing_data['result'];
        //     // $audit_data = ['existing_data' => $existing_data];
        //     // $this->audit_service->store($audit_data);
        // }
        return $execution;
    }

}
