import type { ExpoConfig } from '@expo/config';

const defineConfig = (): ExpoConfig => ({
  name: 'DoNeedU',
  slug: 'do-need-u',
  version: process.env.VERSION?.toString(),
  owner: 'your_team',

  scheme: 'do-need-u',
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-build-properties',
      {
        ios: {
          deploymentTarget: '13.0',
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    tsconfigPaths: true,
  },

  orientation: 'portrait',
  icon: './assets/adaptive-icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/icon.png',
    resizeMode: 'contain',
    backgroundColor: '#90e0e4',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    bundleIdentifier: 'com.hackfest.doneedu',
    supportsTablet: true,
  },
  android: {
    package: 'com.hackfest.doneedu',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#faf8fc',
    },
  },
  extra: {
    eas: {
      projectId: 'e5823884-b1d7-4210-b56f-2372c63105f2',
    },
    EXPO_PUBLIC_FIREBASE_API_KEY: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    EXPO_PUBLIC_DATABASE_URL: process.env.EXPO_PUBLIC_DATABASE_URL,
    EXPO_PUBLIC_PROJECT_ID: process.env.EXPO_PUBLIC_PROJECT_ID,
    EXPO_PUBLIC_STORAGE_BUCKET: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    EXPO_PUBLIC_MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    EXPO_PUBLIC_APP_ID: process.env.EXPO_PUBLIC_APP_ID,
    EXPO_PUBLIC_MEASUREMENT_ID: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
  },
  updates: {
    url: 'https://u.expo.dev/e5823884-b1d7-4210-b56f-2372c63105f2',
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
});

export default defineConfig;
