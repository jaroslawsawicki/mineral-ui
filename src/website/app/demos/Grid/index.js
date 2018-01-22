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
import { componentTheme as columnComponentTheme } from '../../../../Grid/Column';
import { componentTheme as rowComponentTheme } from '../../../../Grid/Row';
import bestPractices from './bestPractices';
import columnExamples from './examples/column';
import rowExamples from './examples/row';

const columnDoc = require('!!react-docgen-loader!../../../../Grid/Column');
const rowDoc = require('!!react-docgen-loader!../../../../Grid/Row');

export default [
  {
    bestPractices: bestPractices.column,
    componentTheme: columnComponentTheme,
    doc: columnDoc,
    examples: columnExamples,
    slug: 'column',
    title: 'Column',
    whenHowToUse: `TODO`
  },
  {
    bestPractices: bestPractices.row,
    componentTheme: rowComponentTheme,
    doc: rowDoc,
    examples: rowExamples,
    slug: 'row',
    title: 'Row',
    whenHowToUse: `TODO`
  }
];
