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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('image')->nullable();
            $table->unsignedInteger('order');
            $table->unsignedBigInteger('user_created_id')->nullable();
            $table->unsignedBigInteger('user_updated_id')->nullable();
            $table->unsignedBigInteger('user_deleted_id')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_created_id')
                ->references('id')
                ->on('users')
                ->restrictOnDelete();
            $table->foreign('user_updated_id')
                ->references('id')
                ->on('users')
                ->restrictOnDelete();
            $table->foreign('user_deleted_id')
                ->references('id')
                ->on('users')
                ->restrictOnDelete();

            $table->unique(['name', 'order', 'user_deleted_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categories');
    }
};
