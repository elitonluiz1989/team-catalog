<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ env('APP_NAME') }}</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body class="body body--default antialiased">
    <header class="header container-fluid">
        <nav class="navbar navbar-expand-lg row">
            <div class="col-12">
                <div class="row">
                    <div class="header__logo col-12 col-md-3"></div>

                    <h1 class="header__title col-12 col-md-7">
                        <a class="navbar-brand d-block text-center text-md-start me-0"
                            href="{{ url('/') }}">{{ env('APP_NAME') }}</a>
                    </h1>

                    <button class="header__toggler header__toggler--floating navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#main-navbar"
                        aria-controls="main-navbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <i class="fas fa-bars"></i>
                    </button>

                    <div class="navbar-collapse justify-content-lg-end collapse col-12 col-md-2" id="main-navbar">
                        <ul class="navbar-nav me-auto me-lg-0 ms-lg-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="{{ route('login') }}">Log in</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <section class="content container-fluid">
        @yield('view')
    </section>

    <footer class="footer container-fluid">

    </footer>

    <script src="{{ asset('js/app.js') }}"></script>
</body>

</html>
