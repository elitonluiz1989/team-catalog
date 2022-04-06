@extends('layout.admin')

@section('view')
<div class="container-fluid mt-3">
    <div class="row justify-content-lg-center">
        <div class="col-12 col-lg-8 col-xl-4">
            <form action="{{ $routes['store'] }}" class="user-form container-fluid pt-3 pb-3" method="{{ $formMethod }}">
                @csrf

                @if ($inEditing)
                    <input type="hidden" name="id" value="{{ $data['id'] }}">
                @endif

                <div class="row">
                    <div class="col-12">
                        <h2 class="user-form__title">Create an user</h2>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        @include('layout.partials.messages')
                    </div>
                </div>
            
                <div class="form-field row mb-1">
                    <label for="user-name" class="col-12">Name</label>
            
                    <div class="input-group col-12">
                        <input
                            type="text"
                            id="user-name"
                            class="form-control"
                            name="name"
                            value="{{ $data['name'] }}">
                    </div>
                </div>
            
                <div class="form-field row mb-1">
                    <label for="user-email" class="col-12">E-mail</label>
            
                    <div class="input-group col-12">
                        <input
                            type="email"
                            id="user-email"
                            class="form-control"
                            name="email"
                            value="{{ $data['email'] }}"
                            @disabled($inEditing)">
                    </div>
                </div>
            
                <div class="form-field row mb-2">
                    <label for="" class="col-12">Password</label>
            
                    <div class="input-group col-12">
                        <input
                            type="text"
                            id="user-password"
                            class="form-control"
                            name="password"
                            value="{{ $data['password'] }}">
                    </div>
                </div>
            
                <div class="form-field row">
                    <div class="col-12 d-flex justify-content-evenly">
                        <a href="{{ $routes['back'] }}" class="btn btn-outline-secondary">Cancel</a>
                        
                        <button type="reset" class="btn btn-outline-secondary">Reset</button>
            
                        <button type="submit" class="btn btn-success">Save</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection