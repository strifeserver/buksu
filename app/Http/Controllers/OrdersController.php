<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\OrderService;

class OrdersController extends Controller
{
    public function __construct(OrderService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $filters = request('filter') ?? '';
        $page = request('page') ?? '';
        $itemsPerPage = request('itemsPerPage') ?? '';
        $pagination = request('pagination') ?? '';
        $requests = [
            'filter' => $filters,
            'page' => $page,
            'itemsPerPage' => $itemsPerPage,
            'pagination' => $pagination,
        ];
        $execution = $this->service->index($requests);

        return response()->json($execution);

    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Response
     */
    public function store(request $request)
    {
        $data = $request->all();
        $execution = $this->service->store($data);

        return response()->json($execution);
    }


    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Response
     */
    public function edit(int $Id)
    {
        $execution = $this->service->edit($Id);
        return response()->json($execution);
    }
    public function update(request $request, $id)
    {
        $data = $request->all();
        $data['id'] = $id;
        $execution = $this->service->update($data);

        return response()->json($execution);
    }

    public function destroy($id)
    {
        $returns = [];
        if ($id) {
            $execution = $this->service->destroy($id);
            $returns = $execution;
        }
        return response()->json($execution);
    }

}
