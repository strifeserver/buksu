<?php

namespace App\Services;

use App\Models\Review;
use App\Models\User;
use Crypt;
class ReviewService
{

/**
 * @param Webhook $repository
 */
    public function __construct(Review $repository)
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
        $special_filter = request('special_filter') ?? null;
        if (empty($pagination)) {
            $pagination = 0;
        }

        $data['items_per_page'] = $itemsPerPage;
        $data['filters'] = $filter;
        $data['sort'] = $sort;
        $data['pagination'] = $pagination;
        $data['special_filter'] = $special_filter;
        $execution = $this->repository->index($data);

        $reviews =$execution['data']; 
        $totalRatings = count($reviews);
        $totalRatingValue = 0;
    
        foreach ($reviews as $review) {
            $totalRatingValue += $review['rating'];
        }
        $averageRating = ($totalRatings > 0) ? ($totalRatingValue / $totalRatings) : 0;
    
        $execution['data'] = [
            'average_rating'=> $averageRating,
            'total_reviews'=> $totalRatingValue,
            'reviews'=> $execution['data'],
        ];



        return $execution;
    }

    public function edit(int $Id)
    {
        $execution = $this->repository->edit($Id);
        return $execution;
    }


    public function store(array $request)
    {
        $user_ID = Crypt::decryptString($request['user_ID']);
        $request['user_id'] = $user_ID;


        $getUser = User::where('id','=',$user_ID)->first();
        if(!empty($getUser)){
            $request['display_name'] = $getUser->name;
        }




        $execution = $this->repository->store($request);

        if ($execution['status'] === 1) {
            $audit_data = ['incoming_data' => $request];
        }
        return $execution;
    }

    public function update(array $request)
    {
        $execution = $this->repository->execute_update($request);
        // if ($execution['result']) {
        //     // $id = $execution['result']['shopify_id'] ?? null;

        // }

        // $response = $this->helper->apiResponse($execution['status'], 200, $execution['message'] ?? null, $execution['result']);

        return $execution;
    }
    public function destroy($id)
    {
        $existing_data = $this->edit($id);
        $execution = $this->repository->execute_destroy($id);

        if ($execution['status'] === 1 && $existing_data) {
            $existing_data = $existing_data['result'];
            $audit_data = ['existing_data' => $existing_data];
            // $this->audit_service->store($audit_data);
        }

        return $execution;
    }

}
