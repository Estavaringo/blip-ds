/* eslint-disable @typescript-eslint/no-explicit-any */
import { isStr } from './utils';

export const isValid = (elm: HTMLElement): boolean => {
  if (elm.nodeType === 1) {
    if (elm.nodeName.toLowerCase() === 'script') {
      return false;
    }

    for (let i = 0; i < elm.attributes.length; i++) {
      const val = elm.attributes[i].value;
      if (isStr(val) && val.toLowerCase().indexOf('on') === 0) {
        return false;
      }
    }

    for (let i = 0; i < elm.childNodes.length; i++) {
      if (!isValid(elm.childNodes[i] as any)) {
        return false;
      }
    }
  }
  return true;
};

export const validateContent = (svgContent: string | null): string => {
  if (svgContent && typeof document !== 'undefined') {
    const div = document.createElement('div');
    div.innerHTML = svgContent;

    // setup this way to ensure it works on our buddy IE
    for (let i = div.childNodes.length - 1; i >= 0; i--) {
      if (div.childNodes[i].nodeName.toLowerCase() !== 'svg') {
        div.removeChild(div.childNodes[i]);
      }
    }

    // must only have 1 root element
    const svgElm = div.firstElementChild;
    if (svgElm && svgElm.nodeName.toLowerCase() === 'svg') {
      const svgClass = svgElm.getAttribute('class') || '';
      svgElm.setAttribute('class', (svgClass + ' s-ion-icon').trim());

      // root element must be an svg
      // lets double check we've got valid elements
      // do not allow scripts
      if (isValid(svgElm as any)) {
        return div.innerHTML;
      }
    }
  }
  return '';
};