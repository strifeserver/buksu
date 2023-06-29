<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{

    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'product_name' => $this->product_name,
            'variety' => $this->variety,
            'kilograms' => $this->kilograms,
            // 'planted_date' => $this->planted_date->format('Y-m-d'),
            // 'prospect_harvest_date' => $this->prospect_harvest_date ? $this->prospect_harvest_date->format('Y-m-d') : null,
            'product_location' => $this->product_location,
            'is_verified' => $this->is_verified,
            'product_picture' => $this->product_picture,
            'product_seller' => $this->product_seller,
            // 'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
