<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TableUserController extends Controller
{
    //

    public function index()
    {
    }



    public function search(Request $request)
    {
        $user = User::with(['role', 'status'])
            ->where('name', 'LIKE', '%' . $request->search . '%')
            ->orWhere('email', 'LIKE', '%' . $request->search . '%')
            ->orWhereHas('role', function ($query) use ($request) {
                $query->where('name', 'LIKE', '%' . $request->search . '%');
            })->orWhereHas('status', function ($query) use ($request) {
                $query->where('name', 'LIKE', '%' . $request->search . '%');
            })->latest()->get();

        return response()->json($user);
    }

    public function create(Request $request)
    {
        // buatkan create user validation
        $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users',
            'role_id' => 'required',
            'status_id' => 'required',
        ]);

        // buatkan create user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role_id' => (int) $request->role_id,
            'status_id' => (int) $request->status_id,
            'password' => bcrypt('password'),
        ]);

        return response()->json($user);
    }

    public function store(Request $request)
    {
        //
    }

    public function show(user $user)
    {
        //
    }

    public function edit(user $user)
    {
        //
    }

    public function update(Request $request, user $user)
    {
        //
    }

    public function destroy(User $user)
    {
        // buatkan delete user
        $user->delete();

        return response()->json($user);
    }
}
