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
            $table->string('variety');
            $table->date('planted_date');
            $table->float('prospect_harvest_in_kg')->nullable();
            $table->date('prospect_harvest_date')->nullable();
            $table->float('actual_harvested_in_kg')->nullable();
            $table->date('harvested_date')->nullable();
            $table->string('product_location');
            $table->tinyInteger('is_verified')->default(0);
            $table->double('price')->default(0);
            $table->string('product_picture');
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
