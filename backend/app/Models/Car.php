<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Rent;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'photo1',
        'photo2',
        'brand',
        'model',
        'gearbox',
        'fuel_type',
        'price',
        'available',
        'rental_count'
    ];

    public function rents()
    {
        return $this->hasMany(Rent::class);
    }

    public function availabilities()
    {
        return $this->hasMany(CarAvailability::class);
    }
    public function maintenances()
    {
        return $this->hasMany(Maintenance::class);
    }
}