<?php

namespace App\View\Components\Modals;

use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class FormModal extends Component
{
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(
        public string  $title,
        public string  $formId,
        public string  $formAction,
        public string  $formMethod,
        public ?string $modalId = null,
        public ?string $modalDismissBtnId = null
    )
    {
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return View|Closure|string
     */
    public function render(): View|\Closure|string
    {
        $this->modalId = $this->modalId ?? 'app-modal';
        $this->modalDismissBtnId = $this->modalDismissBtnId ?? 'app-modal-dismiss-btn';
        $ariaLabelledby = "{$this->modalId}-label";

        return view('components.modals.form-modal')
            ->with('ariaLabelledby', $ariaLabelledby);
    }
}
