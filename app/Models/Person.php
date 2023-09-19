<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    use HasFactory;

    protected $fillable = ['FirstName',"UserName","LastName","Email","Address","Specialization","imageName","City","Zip","State","About","Contry"];
}
