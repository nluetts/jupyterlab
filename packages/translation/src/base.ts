// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { Gettext } from './gettext';
import { ITranslator, TranslationBundle } from './tokens';

/**
 * A translator that loads a dummy language bundle that returns the same input
 * strings.
 */
class EmptyTranslator implements ITranslator {
  constructor(bundle: TranslationBundle) {
    this._languageBundle = bundle;
  }

  load(domain: string): TranslationBundle {
    return this._languageBundle;
  }

  locale(): string {
    return 'en-us';
  }

  private _languageBundle: TranslationBundle;
}

/**
 * A language bundle that returns the same input strings.
 */
class EmptyLanguageBundle {
  __(msgid: string, ...args: any[]): string {
    return this.gettext(msgid, ...args);
  }

  _n(msgid: string, msgid_plural: string, n: number, ...args: any[]): string {
    return this.ngettext(msgid, msgid_plural, n, ...args);
  }

  _p(msgctxt: string, msgid: string, ...args: any[]): string {
    return this.pgettext(msgctxt, msgid, ...args);
  }

  _np(
    msgctxt: string,
    msgid: string,
    msgid_plural: string,
    n: number,
    ...args: any[]
  ): string {
    return this.npgettext(msgctxt, msgid, msgid_plural, n, ...args);
  }

  gettext(msgid: string, ...args: any[]): string {
    return Gettext.strfmt(msgid, ...args);
  }

  ngettext(
    msgid: string,
    msgid_plural: string,
    n: number,
    ...args: any[]
  ): string {
    return Gettext.strfmt(n == 1 ? msgid : msgid_plural, ...[n].concat(args));
  }

  pgettext(msgctxt: string, msgid: string, ...args: any[]): string {
    return Gettext.strfmt(msgid, ...args);
  }

  npgettext(
    msgctxt: string,
    msgid: string,
    msgid_plural: string,
    n: number,
    ...args: any[]
  ): string {
    return this.ngettext(msgid, msgid_plural, n, ...args);
  }

  dcnpgettext(
    domain: string,
    msgctxt: string,
    msgid: string,
    msgid_plural: string,
    n: number,
    ...args: any[]
  ): string {
    return this.ngettext(msgid, msgid_plural, n, ...args);
  }
}

/**
 * The basic translator interface.
 *
 * This translator just returns the input string plus any interpolation if needed.
 */
export namespace DefaultTranslator {
  /**
   * Get the basix translator instance.
   */
  export function getInstance(): ITranslator {
    return Private.instance;
  }
}

/**
 * The namespace for module private data.
 */
namespace Private {
  /**
   * The application base translator instance that just returns the same text.
   * Also provides interpolation.
   */
  export let instance = new EmptyTranslator(new EmptyLanguageBundle());
}