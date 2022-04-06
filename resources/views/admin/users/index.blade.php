@extends('layout.admin')

@section('view')

<div class="container-fluid">
    <div class="page-title row">
        <div class="col-12">
            <h2>Users</h2>
        </div>
    </div>

    <div class="row justify-content-center justify-content-md-start mt-3">
        <a
            href="{{ route('users.create') }}"
            class="user col-8 col-md-4 col-lg-3 col-xl-2 d-flex align-items-center justify-content-center text-decoration-none">
            <i class="fas fa-plus"></i>
        </a>
    </div>
</div>

@endsection