import { createAnimations } from '@tamagui/animations-react-native';
import { createInterFont } from '@tamagui/font-inter';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';
import { createTamagui } from 'tamagui';

export const animations = createAnimations({
  '100ms': {
    type: 'timing',
    duration: 100,
  },
  bouncy: {
    damping: 9,
    mass: 0.9,
    stiffness: 150,
  },
  lazy: {
    damping: 18,
    stiffness: 50,
  },
  medium: {
    damping: 15,
    stiffness: 120,
    mass: 1,
  },
  slow: {
    damping: 15,
    stiffness: 40,
  },
  quick: {
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
  tooltip: {
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
});

const headingFont = createInterFont({
  size: {
    6: 15,
  },
  transform: {
    6: 'uppercase',
    7: 'none',
  },
  weight: {
    6: '400',
    7: '700',
  },
  color: {
    6: '$colorFocus',
    7: '$color',
  },
  letterSpacing: {
    5: 2,
    6: 1,
    7: 0,
    8: -1,
    9: -2,
    10: -3,
    12: -4,
    14: -5,
    15: -6,
  },
  face: {
    700: { normal: 'InterBold' },
  },
});

const bodyFont = createInterFont(
  {
    face: {
      700: { normal: 'InterBold' },
    },
  },
  {
    sizeSize: (size) => Math.round(size * 1.1),
    sizeLineHeight: (size) => Math.round(size * 1.1 + (size > 20 ? 10 : 10)),
  }
);

const color = {
  dark: {
    primary: '#1b6b6f',
    secondary: '#0f3a3e',
    accent: '#deb00d',
    background: '#050307',
    color: '#e5f5f4',
  },
  light: {
    primary: '#90e0e4',
    secondary: '#c1ecf0',
    accent: '#f2c521',
    background: '#faf8fc',
    color: '#0a1a19',
  },
};

const config = createTamagui({
  defaultFont: 'body',
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    body: bodyFont,
    heading: headingFont,
  },
  tokens,
  themes: {
    ...themes,
    dark_primary_Button: {
      background: color.dark.primary,
      color: color.dark.color,
      backgroundPress: '#144d52',
    },
    light_primary_Button: {
      background: color.light.primary,
      color: color.dark.color,
      backgroundPress: '#ade6eb',
    },
    dark_Button: {
      background: color.dark.accent,
      color: color.dark.color,
      backgroundPress: '#c1990b',
    },
    light_Button: {
      background: color.light.accent,
      color: color.dark.color,
      backgroundPress: '#f8df87',
    },
    dark: {
      ...themes.dark,
      ...color.dark,
    },
    light: {
      ...themes.light,
      ...color.light,
    },
  },
  // media: createMedia({
  //   xs: { maxWidth: 660 },
  //   sm: { maxWidth: 800 },
  //   md: { maxWidth: 1020 },
  //   lg: { maxWidth: 1280 },
  //   xl: { maxWidth: 1420 },
  //   xxl: { maxWidth: 1600 },
  //   gtXs: { minWidth: 660 + 1 },
  //   gtSm: { minWidth: 800 + 1 },
  //   gtMd: { minWidth: 1020 + 1 },
  //   gtLg: { minWidth: 1280 + 1 },
  //   short: { maxHeight: 820 },
  //   tall: { minHeight: 820 },
  //   hoverNone: { hover: 'none' },
  //   pointerCoarse: { pointer: 'coarse' },
  // }),
});

type AppConfig = typeof config;

// Enable auto-completion of props shorthand (ex: jc="center") for Tamagui templates.
// Docs: https://tamagui.dev/docs/core/configuration

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
