<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('product_name');
            $table->string('product_type');
            $table->string('variety');
            $table->date('planted_date');
            $table->float('prospect_harvest_in_kg')->nullable();
            $table->date('prospect_harvest_date')->nullable();
            $table->float('actual_harvested_in_kg')->default(0);
            $table->float('actual_sold_kg')->default(0);
            $table->date('harvested_date')->nullable();
            $table->string('product_location');
            $table->double('price')->default(0);
            $table->string('product_picture')->nullable();
            $table->tinyInteger('is_approved')->default(0);
           //foreign ID
            $table->unsignedBigInteger('farm_belonged');
            $table->foreign('farm_belonged')->references('id')->on('farms');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
