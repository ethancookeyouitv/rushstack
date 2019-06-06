// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import * as tsdoc from '@microsoft/tsdoc';

import { ApiDocumentedItem } from '../items/ApiDocumentedItem';
import { Excerpt } from '../mixins/Excerpt';
import { ApiTypeParameterListMixin } from '../mixins/ApiTypeParameterListMixin';

/**
 * Constructor options for {@link TypeParameter}.
 * @public
 */
export interface ITypeParameterOptions {
  name: string;
  constraintExcerpt: Excerpt | undefined;
  defaultTypeExcerpt: Excerpt | undefined;
  parent: ApiTypeParameterListMixin;
}

/**
 * Represents a named type parameter for a generic declaration.
 *
 * @remarks
 *
 * `TypeParameter` represents a TypeScript declaration such as `T` in this example:
 *
 * ```ts
 * export interface Array<T> {
 * }
 * ```
 *
 * `TypeParameter` objects belong to the {@link (ApiTypeParameterListMixin:interface).typeParameters} collection.
 *
 * @public
 */
export class TypeParameter {
  /**
   * An {@link Excerpt} that describes the base constraint of the type parameter.
   */
  public readonly constraintExcerpt: Excerpt | undefined;

  /**
   * An {@link Excerpt} that describes the default type of the type parameter.
   */
  public readonly defaultTypeExcerpt: Excerpt | undefined;

  /**
   * The parameter name.
   */
  public name: string;

  private _parent: ApiTypeParameterListMixin;

  public constructor(options: ITypeParameterOptions) {
    this.name = options.name;
    this.constraintExcerpt = options.constraintExcerpt;
    this.defaultTypeExcerpt = options.defaultTypeExcerpt;
    this._parent = options.parent;
  }

  /**
   * Returns the `@typeParam` documentation for this parameter, if present.
   */
  public get tsdocTypeParamBlock(): tsdoc.DocParamBlock | undefined {
    if (this._parent instanceof ApiDocumentedItem) {
      if (this._parent.tsdocComment) {
        return this._parent.tsdocComment.typeParams.tryGetBlockByName(this.name);
      }
    }
  }

}
