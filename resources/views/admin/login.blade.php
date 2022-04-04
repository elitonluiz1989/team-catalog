<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Login</title>

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body class="login antialiased">
    <header class="header container-fluid">
        <h1 class="header__title">
            <a class="navbar-brand" href="#">{{ env('APP_NAME') }}</a>
        </h1>
    </header>

    <form action="{{ route('login.authenticate') }}" class="login-form container-fluid" method="post">
        @csrf

        @if ($errors->any())
          <div class="alert alert-danger">
              @foreach ($errors->all() as $error)
                <div>{{ $error }}</div>
              @endforeach
          </div>
      @endif

        <div class="form-group row mt-5">
            <div class="col-12 col-lg-3">
              <label for="login-email">E-mail</label>
            </div>

            <div class="input-group col-12">
              <input type="email" id="login-email" class="w-100" name="email" value="{{ old('email', '') }}">
            </div>
        </div>

        <div class="form-group row">
          <div class="col-12 col-lg-3">
            <label for="login-password">Password</label>
          </div>

          <div class="input-group col-12">
              <input type="password" id="login-password" class="w-100" name="password">
            </div>
        </div>

        <div class="form-group row">
          <div class="col-12 d-flex align-items-center justify-content-end">
            <label for="login-remember" class="p-1">Remember me</label>

            <input type="checkbox" id="login-remember" name="remember">
          </div>
        </div>

        <div class="form-group row">
          <div class="col-12 d-flex mt-4 justify-content-between">
            <div class="d-flex align-items-end">
              <a href="#" class="login-form__back">Back to home</a>
            </div>

            <button class="login-form__submit btn" type="submit">log in</button>
          </div>
        </div>
    </form>

    <script src="{{ asset('js/manifest.js') }}"></script>
    <script src="{{ asset('js/app.js') }}"></script>
</body>

</html>
