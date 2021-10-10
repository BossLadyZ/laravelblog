<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Cviebrock\EloquentSluggable\Services\SlugService;
use Illuminate\Validation\Rules\In;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return Inertia::render('Posts/Index', [
            'posts'=>Post::when($request->term, function($query, $term){
                $query->where('title', 'LIKE', '%' . $term . '%');
            })->orderBy('updated_at', 'DESC')->with('user')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'body' => 'required',
            'image_url' => 'required'
        ]);
 

        Post::create([
           'title' => $request->input('title'),
           'body' => $request->input('body'),
           'slug' => SlugService::createSlug(Post::class, 'slug',
                    $request->title),
            'image_url' => $request->input('image_url'),
            'user_id' => auth()->user()->id
        ]);

        return redirect('/posts')->with('message', 'Post Added!');
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $slug
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        return Inertia::render('Posts/Show')->with('post', Post::where('slug', $slug)->first());
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($slug)
    {
        return Inertia::render('Posts/Edit')->with('post', Post::where('slug', $slug)->first());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $slug)
    {
        Post::where('slug', $slug)
        ->update([
             'title' => $request->input('title'),
           'body' => $request->input('body'),
           'slug' => SlugService::createSlug(Post::class, 'slug',
                    $request->title),
            'image_url' => $request->input('image_url'),
            'user_id' => auth()->user()->id
        ]);
        return redirect('/posts')->with('message', 'Post Updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($slug)
    {
        $post = Post::where('slug', $slug);
        $post->delete();

        return redirect('/posts')->with('message', 'Post deleted!');
    }
}
