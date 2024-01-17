import { YStack, styled } from 'tamagui';

export const Container = styled(YStack, {
  flex: 1,
  padding: 24,
  paddingBottom: '$13',
  backgroundColor: '$background',

  variants: {
    unsetPB: {
      true: {
        paddingBottom: 0,
      },
    },
  },
});
