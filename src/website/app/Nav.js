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
import { NavLink } from 'react-router-dom';
import { darken, rgba } from 'polished';
import {
  createStyledComponent,
  getNormalizedValue,
  pxToEm
} from '../../styles';
import { mineralTheme, ThemeProvider } from '../../themes';
import _Logo from './Logo';
import Heading from './SiteHeading';
import _Link from './SiteLink';
import siteColors from './siteColors';
import sections from './pages';

type Props = {
  demoRoutes: { [string]: DemoRoute },
  wide?: Boolean
};

type DemoRoute = { slug: string, title: string };

const navTheme = {
  Heading_color_4: mineralTheme.color_gray_30,

  SiteLink_borderColor_focus: mineralTheme.color_white,
  SiteLink_color: mineralTheme.color_gray_30,
  SiteLink_color_focus: mineralTheme.color_white,
  SiteLink_color_hover: mineralTheme.color_white
};

const navThemeWide = {
  Heading_color_4: siteColors.slateDarker,

  SiteLink_borderColor_focus: siteColors.slateDarker_focus,
  SiteLink_color: siteColors.slateDarker,
  SiteLink_color_active: siteColors.slateDarker_active,
  SiteLink_color_focus: siteColors.slateDarker_focus,
  SiteLink_color_hover: siteColors.slateDarker_hover
};

const styles = {
  heading: ({ theme, wide }) => ({
    margin: 0,
    paddingRight: wide ? getNormalizedValue(pxToEm(8), theme.fontSize_h4) : null
  }),
  link: ({ theme, wide }) => {
    let styles = {
      display: 'block',
      fontWeight: theme.fontWeight_regular,
      // top & bottom: results of `getNormalizedValue(pxToEm(5), theme.fontSize_ui)`
      // (6px for bottom), rounded down for baseline alignment
      padding: '0.35em 0 0.4em',
      textDecoration: 'none'
    };

    if (wide) {
      styles = {
        ...styles,
        paddingLeft: getNormalizedValue(pxToEm(8), theme.fontSize_ui),
        paddingRight: getNormalizedValue(pxToEm(8), theme.fontSize_ui),

        '&.active': {
          backgroundColor: rgba(theme.color_text_primary, 0.15),
          color: darken(0.1, theme.color_text_primary),
          position: 'relative',

          '&::before': {
            backgroundColor: theme.color_text_primary,
            bottom: 0,
            content: '""',
            position: 'absolute',
            right: `-${pxToEm(3)}`,
            top: 0,
            width: pxToEm(3)
          }
        }
      };
    } else {
      styles = {
        ...styles,

        '&.active': {
          color: theme.navLink_color_active_narrow,
          position: 'relative',

          '&::before': {
            backgroundColor: theme.navLink_color_active_narrow,
            bottom: 2,
            content: '""',
            left: `-${pxToEm(18)}`,
            position: 'absolute',
            top: 2,
            width: pxToEm(6)
          }
        }
      };
    }

    return styles;
  },
  list: {
    listStyle: 'none',
    margin: `0 0 ${pxToEm(44)}`, // to baseline
    paddingLeft: '0'
  },
  listItem: ({ theme }) => ({
    fontSize: theme.fontSize_ui,

    '& > a:focus': {
      outlineOffset: 0
    }
  }),
  // [1] to align first SectionHeading with baseline of third intro line
  logoHeading: {
    fontSize: '1em',
    margin: `0 0 ${pxToEm(9)}`, // [1]

    '& svg': {
      width: 29, // 36px tall is the important dimension

      '& .band-1': { fill: siteColors.yellow },
      '& .band-2': { fill: siteColors.orange },
      '& .band-3': { fill: siteColors.slate }
    }
  }
};

const Link = createStyledComponent(_Link, styles.link, {
  filterProps: ['wide']
}).withProps({
  element: NavLink
});
const List = createStyledComponent('ol', styles.list);
const ListItem = createStyledComponent('li', styles.listItem);
const SectionHeading = createStyledComponent(
  Heading,
  styles.heading
).withProps({
  as: 'h2',
  level: 4
});
const LogoHeading = createStyledComponent(
  Heading,
  styles.logoHeading
).withProps({
  level: 1
});

const Logo = () => (
  <LogoHeading>
    <Link exact to="/">
      <_Logo />
    </Link>
  </LogoHeading>
);

const pages = wide => {
  return sections.map((section, index) => {
    return (
      <div key={index}>
        <SectionHeading wide={wide}>{section.heading}</SectionHeading>
        <List>
          {section.pages.map(page => {
            return (
              !page.hiddenInNav && (
                <ListItem key={page.title}>
                  <Link to={page.path} wide={wide}>
                    {page.title}
                  </Link>
                </ListItem>
              )
            );
          })}
        </List>
      </div>
    );
  });
};

export default function Nav({ demoRoutes, wide, ...restProps }: Props) {
  const rootProps = { ...restProps };

  const demoLinks = Object.keys(demoRoutes).map(slug => {
    const demo = demoRoutes[slug];
    return (
      <ListItem key={slug}>
        <Link to={`/components/${slug}`} wide={wide}>
          {demo.title}
        </Link>
      </ListItem>
    );
  });

  return (
    <ThemeProvider theme={wide ? navThemeWide : navTheme}>
      <nav {...rootProps}>
        <Logo />
        {pages(wide)}
        <SectionHeading>Components</SectionHeading>
        <List>{demoLinks}</List>
      </nav>
    </ThemeProvider>
  );
}
