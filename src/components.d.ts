/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface BdsIcon {
    /**
    * Specifies the label to use for accessibility. Defaults to the icon name.
    */
    'ariaLabel'?: string;
    /**
    * Specifies the color to use.Specifies a color to use. The default is svg.
    */
    'color'?: string;
    /**
    * Specifies which icon to use from the built-in set of icons.
    */
    'name': string;
    /**
    * Icon size. Entered as one of the icon size design tokens. Can be one of: "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large".
    */
    'size'?: string;
    /**
    * Specifies the theme to use outline or solid icons. Defaults to outline.
    */
    'theme': 'outline' | 'solid';
  }
  interface SbpButton {}
}

declare global {


  interface HTMLBdsIconElement extends Components.BdsIcon, HTMLStencilElement {}
  var HTMLBdsIconElement: {
    prototype: HTMLBdsIconElement;
    new (): HTMLBdsIconElement;
  };

  interface HTMLSbpButtonElement extends Components.SbpButton, HTMLStencilElement {}
  var HTMLSbpButtonElement: {
    prototype: HTMLSbpButtonElement;
    new (): HTMLSbpButtonElement;
  };
  interface HTMLElementTagNameMap {
    'bds-icon': HTMLBdsIconElement;
    'sbp-button': HTMLSbpButtonElement;
  }
}

declare namespace LocalJSX {
  interface BdsIcon {
    /**
    * Specifies the label to use for accessibility. Defaults to the icon name.
    */
    'ariaLabel'?: string;
    /**
    * Specifies the color to use.Specifies a color to use. The default is svg.
    */
    'color'?: string;
    /**
    * Specifies which icon to use from the built-in set of icons.
    */
    'name': string;
    /**
    * Icon size. Entered as one of the icon size design tokens. Can be one of: "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large".
    */
    'size'?: string;
    /**
    * Specifies the theme to use outline or solid icons. Defaults to outline.
    */
    'theme'?: 'outline' | 'solid';
  }
  interface SbpButton {}

  interface IntrinsicElements {
    'bds-icon': BdsIcon;
    'sbp-button': SbpButton;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'bds-icon': LocalJSX.BdsIcon & JSXBase.HTMLAttributes<HTMLBdsIconElement>;
      'sbp-button': LocalJSX.SbpButton & JSXBase.HTMLAttributes<HTMLSbpButtonElement>;
    }
  }
}


