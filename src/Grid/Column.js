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
import React from 'react';
import { createStyledComponent } from '../styles';
import { componentTheme as rowComponentTheme } from './Row';

type Props = {
  /** @Private From Row */
  columns?: number,
  /** TODO */
  pull?: number,
  /** TODO */
  push?: number,
  /** Number of columns spanned */
  span?: number
};

const Root = createStyledComponent(
  'div',
  ({ columns, span, theme: baseTheme }) => {
    const theme = rowComponentTheme(baseTheme);

    const flexBasis = span ? `${span / columns * 100}%` : 'auto';

    return {
      flex: `1 1 ${flexBasis}`,
      margin: `0 ${parseFloat(theme.Row_gutterWidth) / 2}em`
    };
  },
  {
    displayName: 'Column',
    includeStyleReset: true
  }
);

/**
 * Grid Column.
 */
export default function Column(props: Props) {
  return <Root {...props} />;
}
