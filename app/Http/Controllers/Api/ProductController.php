<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{

/**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    // public function index()
    // {
    //     return UserResource::collection(User::query()->orderBy('id', 'desc')->paginate(10));
    // }
    // public function products()
    // {
    //     return ProductResource::collection(Product::query()->orderBy('id', 'asc'));
    // }
    public function allProducts()
    {
        $products =Product::all()->paginate(5);
        return ProductResource::collection($products);
    }


}
