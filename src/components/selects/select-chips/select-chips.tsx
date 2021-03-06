import { Component, h, State, Prop, EventEmitter, Event, Element, Listen, Method } from '@stencil/core';
import { Option, SelectChangeEventDetail } from '../select-interface';

@Component({
  tag: 'bds-select-chips',
  styleUrl: '../select.scss',
  scoped: true,
})
export class SelectChips {
  private nativeInput?: HTMLBdsInputChipsElement;

  @Element() el!: HTMLElement;

  @State() isOpen? = false;

  @Prop({ mutable: true }) options?: Array<Option> = [];

  @Prop({ mutable: true }) chips: string[] = [];

  /**
   * Used for add prefix on new option select.
   */
  @Prop({ reflect: true }) newPrefix?: string = '';

  /**
   * the value of the select.
   */
  @Prop({ mutable: true }) value?: string | null = '';

  /**
   * Add state danger on input, use for use feedback.
   */
  @Prop({ reflect: true, mutable: true }) danger? = false;

  /**
   * Indicated to pass an feedback to user.
   */
  @Prop({ mutable: true }) errorMessage? = '';

  /**
   * Disabled input.
   */
  @Prop({ reflect: true }) disabled? = false;

  /**
   * Emitted when the value has changed.
   */
  @Event() bdsChange!: EventEmitter<SelectChangeEventDetail>;

  /**
   * Emitted when the selection is cancelled.
   */
  @Event() bdsCancel!: EventEmitter<void>;

  /**
   * Emitted when the select loses focus.
   */
  @Event() bdsFocus!: EventEmitter<void>;

  /**
   * Emitted when the select loses focus.
   */
  @Event() bdsBlur!: EventEmitter<void>;

  /**
   *  label in input, with he the input size increases.
   */
  @Prop() label? = '';

  /**
   * used for add icon in input left. Uses the bds-icon component.
   */
  @Prop({ reflect: true }) icon?: string = '';

  /**
   * Do not accept duplicate chip elements.
   */
  @Prop() duplicated?: boolean = false;

  @Listen('mousedown', { target: 'window', passive: true })
  handleWindow(ev: Event) {
    if (!this.el.contains(ev.target as HTMLInputElement)) {
      this.isOpen = false;
    }
  }

  /**
   * Return the validity of the input chips.
   */
  @Method()
  async isValid(): Promise<boolean> {
    return this.nativeInput.isValid();
  }

  async connectedCallback() {
    for (const option of this.childOptions) {
      option.addEventListener('optionSelected', this.handler);
    }
  }

  componentDidLoad() {
    this.resetFilterOptions();
  }

  private get childOptions(): HTMLBdsSelectOptionElement[] {
    return Array.from(this.el.querySelectorAll('bds-select-option:not(#option-add)'));
  }

  private get childOptionsEnabled(): HTMLBdsSelectOptionElement[] {
    return Array.from(this.el.querySelectorAll('bds-select-option:not([invisible]):not(#option-add)'));
  }

  private enableCreateOption(): boolean {
    return !!(this.childOptionsEnabled.length === 0 && this.nativeInput && this.nativeInput.value);
  }

  private onFocus = (): void => {
    this.bdsFocus.emit();
  };

  private onBlur = (): void => {
    this.bdsBlur.emit();
  };

  private toggle = (): void => {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  };

  private handler = async (event: CustomEvent) => {
    const {
      detail: { value },
    } = event;
    const text = this.getText(value);
    await this.addChip(text);
  };

  private getText = (value: string) => {
    const el: HTMLBdsSelectOptionElement = this.childOptions.find((option) => option.value === value);
    return el.textContent;
  };

  private handlerNewOption = async (text: string) => {
    await this.addChip(text);
  };

  private async addChip(chip: string) {
    await this.nativeInput.add(chip);
    this.nativeInput.value = '';
    this.toggle();
  }

  private setFocusWrapper = (): void => {
    if (this.nativeInput) {
      this.nativeInput.setFocus();
    }
  };

  private removeFocusWrapper = (event: FocusEvent): void => {
    const isInputElement = (event.relatedTarget as Element).localName === 'bds-input-chips';

    if (this.nativeInput && !isInputElement) {
      this.nativeInput.removeFocus();
    }
  };

  private keyPressWrapper = (event: KeyboardEvent): void => {
    const isSelectElement = (event.target as Element).localName === 'bds-select';
    const isInputElement = (event.target as Element).localName === 'bds-input-chips';

    switch (event.key) {
      case 'Enter':
        if (this.childOptionsEnabled.length === 1) {
          this.nativeInput.add(this.childOptionsEnabled[0].textContent);
        } else {
          this.nativeInput.add(this.nativeInput.value);
        }

        this.nativeInput.value = '';

        if (!this.isOpen && (isSelectElement || isInputElement)) {
          this.toggle();
        }
        break;
    }
  };

  private changedInputValue = () => {
    // Update this.value for trigger render componente, same two-way binding
    this.value = this.nativeInput.value;

    if (this.nativeInput.value) {
      this.filterOptions(this.nativeInput.value);
    } else {
      this.resetFilterOptions();
    }

    if (this.value && this.isOpen === false) {
      this.isOpen = true;
    }
  };

  private handleChangeChipsValue = () => {
    this.nativeInput.value = '';
    this.resetFilterOptions();
  };

  private filterOptions(term: string) {
    if (!term) {
      this.resetFilterOptions();
      return;
    }

    for (const option of this.childOptions) {
      const isExistsChip = this.existsChip(option.textContent, this.nativeInput.chips);
      const optionTextLower = option.textContent.toLowerCase();
      const termLower = term.toLowerCase();

      if (isExistsChip) {
        option.setAttribute('invisible', 'invisible');
      }

      if (term && optionTextLower.includes(termLower) && !isExistsChip) {
        option.removeAttribute('invisible');
      }

      if (term && !optionTextLower.includes(termLower) && !isExistsChip) {
        option.setAttribute('invisible', 'invisible');
      }
    }
  }

  private resetFilterOptions() {
    for (const option of this.childOptions) {
      const optionText = option.querySelector('bds-typo').textContent;
      if (this.existsChip(optionText, this.nativeInput.chips)) {
        option.setAttribute('invisible', 'invisible');
      } else {
        option.removeAttribute('invisible');
      }
    }
  }

  private existsChip(optionChip: string, chips: string[]) {
    return chips.some((chip) => optionChip === chip);
  }

  private generateKey(value: string) {
    return value.toLowerCase().replace(/ /g, '-');
  }

  render(): HTMLElement {
    const iconArrow = this.isOpen ? 'arrow-up' : 'arrow-down';

    return (
      <div
        class="select"
        tabindex="0"
        onFocus={this.setFocusWrapper}
        onBlur={this.removeFocusWrapper}
        onKeyPress={this.keyPressWrapper}
      >
        <bds-input-chips
          ref={(el) => (this.nativeInput = el as HTMLBdsInputChipsElement)}
          onBdsChangeChips={this.handleChangeChipsValue}
          onBdsChange={this.changedInputValue}
          icon={this.icon}
          label={this.label}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onClick={this.toggle}
          danger={this.danger}
          error-message={this.errorMessage}
          chips={this.chips}
          disable-submit={true}
          duplicated={this.duplicated}
        >
          <div slot="input-right" class="select__icon">
            <bds-icon size="small" name={iconArrow} color="inherit"></bds-icon>
          </div>
        </bds-input-chips>
        <div
          class={{
            select__options: true,
            'select__options--open': this.isOpen,
          }}
        >
          {this.options.map((option) => (
            <bds-select-option
              key={this.generateKey(option.value)}
              onOptionSelected={this.handler}
              value={option.value}
            >
              {option.label}
            </bds-select-option>
          ))}
          <slot />
          {this.enableCreateOption() && (
            <bds-select-option
              id="option-add"
              value="add"
              onClick={() => this.handlerNewOption(this.nativeInput.value)}
            >
              {this.newPrefix}
              {this.nativeInput.value}
            </bds-select-option>
          )}
        </div>
      </div>
    );
  }
}
