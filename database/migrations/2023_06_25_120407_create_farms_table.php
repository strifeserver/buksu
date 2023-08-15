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
        Schema::create('farms', function (Blueprint $table) {
            $table->id();
            $table->string('farm_name');
            $table->string('farm_location');
            $table->float('farm_hectares');
            $table->text('farm_info');
            $table->text('longitude');
            $table->text('latitude');
            $table->string('farm_pictures');
            $table->tinyInteger('is_verified')->default(0);
           //foreign ID
            $table->unsignedBigInteger('farm_owner');
            $table->foreign('farm_owner')->references('id')->on('users');
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
        Schema::dropIfExists('farms');
    }
};
