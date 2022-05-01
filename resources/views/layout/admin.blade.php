<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Admin Panel</title>

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body class="antialiased">
    <header class="header container-fluid">
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <h1 class="header__title">
                    <a class="navbar-brand" href="#">{{ env('APP_NAME') }}</a>
                </h1>

                <button class="header__toggler navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#admin-navbar" aria-controls="admin-navbar" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <i class="fas fa-bars"></i>
                </button>

                <div class="collapse navbar-collapse justify-content-lg-end" id="admin-navbar">
                    <ul class="navbar-nav me-auto me-lg-0 ms-lg-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="{{ route('users.index') }}">Users</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="/categories">Categories</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="/products">Products</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('logout') }}">Log out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <section>
        @yield('view')
    </section>

    <script src="{{ asset('js/app.js') }}"></script>
</body>

</html>
