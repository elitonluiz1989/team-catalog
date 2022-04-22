<div
    class="modal fade"
    id="{{ $modalId }}"
    tabindex="-1"
    aria-labelledby="{{ $ariaLabelledby }}"
    aria-hidden="true">

    <div class="modal-dialog">
        <form
            action="{{ $formAction }}"
            id="{{ $formId }}"
            method="{{ $formMethod }}">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 id="{{ $titleId }}" class="modal-title">{{ $title }}</h5>

                    <button
                        type="button"
                        id="{{ $modalDismissBtnId }}"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close">
                    </button>
                </div>

                <div class="modal-body">
                    {{ $slot }}
                </div>

                <div class="modal-footer d-flex justify-content-evenly">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                    <button type="reset" class="btn btn-outline-secondary">Reset</button>

                    <button type="submit" class="btn btn-success">Save</button>
                </div>
            </div>
        </form>
    </div>
</div>
