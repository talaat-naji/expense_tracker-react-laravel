<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public function expense(){
        return $this->hasMany(Expense::class);

    }
}
