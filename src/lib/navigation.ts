import {
  BottomTabNavigationEventMap,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { ParamListBase, StackNavigationState, TabNavigationState } from '@react-navigation/native';
import {
  StackNavigationEventMap,
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import { withLayoutContext } from 'expo-router';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar';

const { Navigator } = createStackNavigator();
export const Stack = withLayoutContext<
  StackNavigationOptions,
  typeof Navigator,
  StackNavigationState<ParamListBase>,
  StackNavigationEventMap
>(Navigator);

const { Navigator: TabsNavigator } = AnimatedTabBarNavigator();
export const Tabs = withLayoutContext<
  BottomTabNavigationOptions,
  typeof TabsNavigator,
  TabNavigationState<ParamListBase>,
  BottomTabNavigationEventMap
>(TabsNavigator);
