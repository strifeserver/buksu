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
        Schema::create('transaction_details', function (Blueprint $table) {
            $table->id();
             $table->string('product_name');
             $table->string('variety');
             $table->date('planted_date');
             $table->date('harvested_date')->nullable();
             $table->float('kg_purchased')->nullable();
             $table->double('price_per_kilo')->default(0);
             $table->double('total_price')->default(0);
             //Foreign ID
             $table->unsignedBigInteger('transaction_id');
             $table->foreign('transaction_id')->references('id')->on('transactions');
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
        Schema::dropIfExists('transaction_details');
    }
};
