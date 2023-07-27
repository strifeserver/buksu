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
        Schema::create('crop_records', function (Blueprint $table) {
            $table->id();
            $table->string('barangay');
            $table->string('commodity');
            $table->string('record_date');
            $table->double('area')->nullable();
            $table->double('yeild')->nullable();
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
        Schema::dropIfExists('crop_records');
    }
};
