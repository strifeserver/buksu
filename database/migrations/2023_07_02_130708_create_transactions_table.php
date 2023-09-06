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
            $table->date('seller_prospect_date_todeliver')->nullable();
            $table->date('date_delivered')->nullable();
            $table->double('price_of_goods')->nullable();
            $table->double('price_payed')->nullable();
            $table->date('payed_on')->nullable();
            $table->text('proof_of_delivery')->nullable();
             //foreign ID
            $table->unsignedBigInteger('buyers_name');
            $table->foreign('buyers_name')->references('id')->on('users');
            $table->unsignedBigInteger('seller');
            $table->foreign('seller')->references('id')->on('users');
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
