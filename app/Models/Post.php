<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use DateTimeInterface;

class Post extends Model
{
    use HasFactory;
    use Sluggable;

    protected $fillable = ['title', 'slug', 'body', 'image_url', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class, `user_id`);
    }



    public function sluggable():array 
    {
        return [
            'slug' => [
                'source'=> 'title'
            ]
          ];
    }

    public function serializeDate(DateTimeInterface $date)
    {
        return $date->format('j F Y');
    }
}
