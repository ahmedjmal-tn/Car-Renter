<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Rent;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstname',
        'lastname',
        'telephone',
        'email',
        'password',
        'role', // Role attribute
        'avatar',
        'isActive'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    
    protected static function boot()
    {
        parent::boot();

        // Set the default role to "client" if not explicitly assigned
        static::creating(function ($user) {
            if (empty($user->role)) {
                $user->role = 'client';
            }
        });
    }

    public function rents()
    {
        return $this->hasMany(Rent::class);
    }
    /**
* Get the identifier that will be stored in the subject claim of the JWT.
*
* @return mixed
*/
public function getJWTIdentifier() {
    return $this->getKey();
    }
    /**
    * Return a key value array, containing any custom claims to be added to
    the JWT.
    *
    * @return array
    */
    public function getJWTCustomClaims() {
    return [];
    }
}
