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
        Schema::create('people', function (Blueprint $table) {
            $table->id();
            $table->string('UserName');
            $table->string('City');
            $table->string('State');
            $table->string('Zip');
            $table->string('Contry');

            $table->longText('About');

            $table->string('FirstName');
            $table->string('LastName');
            $table->string('Email');
            $table->string('Address');
            $table->string('Specialization');
            $table->longText('ImageName');
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
        Schema::dropIfExists('people');
    }
};
