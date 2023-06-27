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
            $table->float('kilograms');
            $table->date('planted_date');
            $table->date('prospect_harvest_date')->nullable();
            $table->string('product_location');
            $table->tinyInteger('is_verified')->default(0);
            $table->string('product_picture');
           //foreign ID
            $table->unsignedBigInteger('product_seller');
            $table->foreign('product_seller')->references('id')->on('users');
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
