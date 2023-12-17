<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ReviewService;


class ReviewController extends Controller
{
    public function __construct(ReviewService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $filters = request('filter') ?? '';
        $page = request('page') ?? '';
        $itemsPerPage = request('itemsPerPage') ?? '';
        $pagination = request('pagination') ?? '';
        $sort = request('sort') ?? [];
        $requests = [
            'filter' => $filters,
            'page' => $page,
            'itemsPerPage' => $itemsPerPage,
            'pagination' => $pagination,
            'sort' => $sort,
        ];
        $execution = $this->service->index($requests);

        return response(json_encode($execution), 200)->header('Content-Type', 'application/json');

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
        return response(json_encode($execution), 200)->header('Content-Type', 'application/json');

    }


    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Response
     */
    public function edit(int $Id)
    {
        $execution = $this->service->edit($Id);
        return response(json_encode($execution), 200)->header('Content-Type', 'application/json');
    }
    public function update(request $request, $id)
    {
        $data = $request->all();
        $data['id'] = $id;
        $execution = $this->service->update($data);

        return response(json_encode($execution), 200)->header('Content-Type', 'application/json');
    }

    public function destroy($id)
    {
        $returns = [];
        if ($id) {
            $execution = $this->service->destroy($id);
            $returns = $execution;
        }
        $code = $returns['code'] ?? 400;
        return response(json_encode($execution), 200)->header('Content-Type', 'application/json');
    }

}
