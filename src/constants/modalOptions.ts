import { StackNavigationOptions, TransitionPresets } from '@react-navigation/stack';

import { BackButton } from '@/components/BackButton';

export const modalOptions = ({ backgroundColor }: { backgroundColor: string }) =>
  ({
    ...TransitionPresets.ModalPresentationIOS,
    gestureEnabled: true,
    headerTitleAlign: 'center',
    headerLeft: () => BackButton({ modal: true }),
    presentation: 'modal',
    headerStyle: {
      backgroundColor,
    },
  }) satisfies StackNavigationOptions;
