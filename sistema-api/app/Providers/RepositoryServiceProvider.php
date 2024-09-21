<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Interfaces\EspacioRepositoryInterface;
use App\Repositories\AuthRepository;
use App\Interfaces\AuthRepositoryInterface;
use App\Repositories\EspacioRepository;
use App\Interfaces\TareaRepositoryInterface;
use App\Repositories\TareaRepository;
use App\Interfaces\CalendarioRepositoryInterface;
use App\Repositories\CalendarioRepository;
use App\Interfaces\ReporteRepositoryInterface;
use App\Repositories\ReporteRepository;
use App\Interfaces\CuentaRepositoryInterface;
use App\Repositories\CuentaRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(AuthRepositoryInterface::class, AuthRepository::class);
        $this->app->bind(EspacioRepositoryInterface::class, EspacioRepository::class);
        $this->app->bind(TareaRepositoryInterface::class, TareaRepository::class);
        $this->app->bind(CalendarioRepositoryInterface::class, CalendarioRepository::class);
        $this->app->bind(ReporteRepositoryInterface::class, ReporteRepository::class);
        $this->app->bind(CuentaRepositoryInterface::class, CuentaRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}