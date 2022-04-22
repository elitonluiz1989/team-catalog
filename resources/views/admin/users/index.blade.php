@extends('layout.admin')

@section('view')

<div class="container-fluid">
    <div class="page-title row">
        <div class="col-12">
            <h2>Users</h2>
        </div>
    </div>

    <div class="row justify-content-center justify-content-md-start mt-3">
        @foreach ($users as $user)
            <div class="col-8 col-md-4 col-lg-3 col-xl-2 mb-3">
                <div class="user w-100 d-flex flex-column ps-2 pe-2">
                    <div class="user__item--bordered d-flex flex-fill w-100 align-items-center justify-content-center">
                        <h3 class="text-break">{{ $user->name }}</h3>
                    </div>

                    <div class="user__item user__item--bordered pt-3 pb-3 text-center text-break">{{ $user->email }}</div>

                    <div class="user__item d-flex justify-content-evenly pt-2 pb-3">
                        <button
                            class="user__edit-action btn btn-outline-secondary"
                            data-find-route="{{ route('users.find', $user->id) }}"
                            data-action-route="{{ route('users.update', $user->id) }}">
                            <i class="fas fa-pen"></i>
                        </button>

                        <button
                            id="remove-user-btn"
                            class="btn btn-outline-secondary" @disabled($user->id === $currentUserId)
                            data-user-id="{{ $user->id }}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>

            @if ($loop->last)
                <div class="col-8 col-md-4 col-lg-3 col-xl-2 d-flex mb-3">
                    <button
                        id="user-store-modal-opener-btn"
                        class="user user--add btn w-100 d-flex align-items-center justify-content-center text-decoration-none"
                        data-bs-toggle="modal"
                        data-bs-target="#user-store-modal">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            @endif
        @endforeach

        {{ $users->onEachSide(5)->links() }}

        <x-modals.form-modal
            modal-id="user-store-modal"
            modal-dismiss-btn-id="user-store-modal-dismiss-btn"
            title="User"
            form-id="user-form"
            form-action="{{ route('users.store') }}"
            form-method="{{ \App\Enums\HttpMethodsEnum::POST }}">
            @include('admin.users.form')
        </x-modals.form-modal>

    </div>
</div>

@endsection
