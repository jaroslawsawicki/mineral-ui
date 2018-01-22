/**
 * Copyright 2017 CA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */
import React, { Children, cloneElement } from 'react';
import { createStyledComponent } from '../styles';

type Props = {
  /** Must be [Column](./column) */
  children: React$Element<*>,
  /** Number of columns */
  columns?: number
};

export const componentTheme = (baseTheme: Object) => ({
  Row_gutterWidth: baseTheme.space_inline_md,

  ...baseTheme
});

const Root = createStyledComponent(
  'div',
  ({ theme: baseTheme }) => {
    const theme = componentTheme(baseTheme);

    return {
      display: 'flex',
      margin: `0 -${parseFloat(theme.Row_gutterWidth) / 2}em`
    };
  },
  {
    displayName: 'Row',
    includeStyleReset: true
  }
);

/**
 * Grid Row.
 */
export default function Row({ children, columns = 12, ...restProps }: Props) {
  const columnChildren = columns
    ? Children.map(children, child => {
        return cloneElement(child, { columns });
      })
    : children;
  return <Root {...restProps}>{columnChildren}</Root>;
}
