<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        if (Auth::check()) {
            if (Auth::user()->hasRole((int)$role)) {
                return $next($request);
            } else {
                switch (Auth::user()->role_id) {
                    case 1:
                        return redirect("/admin");
                        break;
                    case 2:
                        return redirect("/kurikulum");
                        break;
                    case 3:
                        return redirect("/");
                        break;
                    default:
                        return redirect("/fail404");
                        break;
                };
            }
        }
        return $next($request);
    }
}
