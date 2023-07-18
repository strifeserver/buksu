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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->date('ordered_on');
            $table->date('payed_on')->nullable();
            $table->date('seller_prospect_date_todeliver')->nullable();
            $table->date('buyers_prospect_date_toget')->nullable();
            $table->date('agreed_date_of_exchange')->nullable();
            $table->double('price_of_goods');
            $table->double('price_payed')->default(0);
             //foreign ID
             $table->unsignedBigInteger('buyers_name');
             $table->foreign('buyers_name')->references('id')->on('users');
             $table->unsignedBigInteger('from_farm');
             $table->foreign('from_farm')->references('id')->on('farms');
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
        Schema::dropIfExists('transactions');
    }
};
