<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Maintenance extends Model
{
    use HasFactory;

    protected $fillable = ['car_id', 'maintenance_date', 'description', 'cost'];

    public function car()
    {
        return $this->belongsTo(Car::class);
    }
}
