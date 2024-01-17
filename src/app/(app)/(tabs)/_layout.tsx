import React from 'react';
import {
  DotSize,
  IAppearanceOptions,
  TabButtonLayout,
  TabElementDisplayOptions,
} from 'react-native-animated-nav-tab-bar';
import { IconHome, IconCoins, IconUser } from 'tabler-icons-react-native';
import { useTheme } from 'tamagui';

import { Tabs } from '@/lib/navigation';

export default function TabsLayout() {
  const theme = useTheme({ name: 'Button' });

  const defaultAppearance: IAppearanceOptions = {
    topPadding: 10,
    bottomPadding: 10,
    horizontalPadding: 10,
    tabBarBackground: theme.primary.val,
    floating: true,
    dotCornerRadius: 100,
    whenActiveShow: TabElementDisplayOptions.BOTH,
    whenInactiveShow: TabElementDisplayOptions.ICON_ONLY,
    shadow: true,
    dotSize: DotSize.DEFAULT,
    tabButtonLayout: TabButtonLayout.HORIZONTAL,
    activeColors: theme.color.val,
    activeTabBackgrounds: theme.accent.val,
  };

  return (
    <Tabs initialRouteName="home" appearance={defaultAppearance}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <IconHome color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="(private)/points"
        options={{
          tabBarLabel: 'Points',
          tabBarIcon: ({ color, size }) => <IconCoins color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="(private)/profile"
        options={{
          tabBarLabel: 'You',
          tabBarIcon: ({ color, size }) => <IconUser color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
