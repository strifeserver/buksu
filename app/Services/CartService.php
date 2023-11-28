<?php

namespace App\Services;

use App\Models\Cart;
use Illuminate\Support\Facades\Crypt;
class CartService
{

/**
 * @param Webhook $repository
 */
    public function __construct(Cart $repository)
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

        $execution = $this->repository->store($request);

        if ($execution['status'] === 1) {
            $audit_data = ['incoming_data' => $request];
        }
        return $execution;
    }

    public function update(array $request)
    {
        $user_ID = Crypt::decryptString($request['user_ID']);
        $request['product_id'] = $request['productID_'];
        $request['user_id'] = $user_ID;
        $request['kg_added'] = $request['kg_'];
        $request['added_on'] = date('Y-m-d h:i:s');
        
        $execution = $this->repository->execute_update($request);
        // if ($execution['result']) {
        //     // $id = $execution['result']['shopify_id'] ?? null;

        // }


        return $execution;
    }
    public function destroy($id)
    {
        $existing_data = $this->edit($id);
        $execution = $this->repository->execute_destroy($id);
    
        if ($execution['status'] === 1 && $existing_data) {
            // $existing_data = $existing_data['result'];
            // $audit_data = ['existing_data' => $existing_data];
            // $this->audit_service->store($audit_data);
        }
        return $execution;
    }

}
