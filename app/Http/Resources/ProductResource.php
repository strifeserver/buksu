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
            'product_type' => $this->product_type,
            'variety' => $this->variety,
            'kilograms' => $this->kilograms,
            'planted_date' => $this->planted_date,
            'prospect_harvest_in_kg' => $this->prospect_harvest_in_kg,
            'prospect_harvest_date' => $this->prospect_harvest_date,
            'actual_harvested_in_kg' => $this->actual_harvested_in_kg,
            'harvested_date' => $this->harvested_date,
            'product_location' => $this->product_location,
            'is_verified' => $this->is_verified,
            'price' => $this->price,
            'farm_belonged' => $this->farm_belonged,
            'product_picture' => $this->product_picture,
            'actual_sold_kg' => $this->actual_sold_kg,
        ];
    }
}
