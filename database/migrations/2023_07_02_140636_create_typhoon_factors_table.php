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
        Schema::create('typhoon_factors', function (Blueprint $table) {
            $table->id();
            $table->text('typhoon_name')->nullable();
            $table->tinyInteger('is_low_pressure_area')->nullable();
            $table->date('typhoon_lpa_date_from');
            $table->date('typhoon_lpa_date_until');
            $table->tinyInteger('signal_number')->nullable();
            $table->text('affected_areas');
            $table->date('harvested_date')->nullable();
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
        Schema::dropIfExists('typhoon_factors');
    }
};
