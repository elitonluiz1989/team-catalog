@if ($errors->any())
    <div class="alert alert-danger">
        @foreach ($errors->all() as $error)
            <div>{{ $error }}</div>
        @endforeach
    </div>
@endif

@isset($success)
    <div class="alert alert-success">
        <div>{{ $success }}</div>
    </div>
@endisset