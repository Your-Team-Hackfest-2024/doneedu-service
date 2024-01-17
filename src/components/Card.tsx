import { Paragraph, styled, Card as CardTamagui, withStaticProperties } from 'tamagui';

export const CardDescription = styled(Paragraph, {
  size: '$1',

  variants: {
    padded: {
      true: {
        paddingHorizontal: '$4',
      },
    },
  },
});

export const Card = withStaticProperties(CardTamagui, {
  Description: CardDescription,
});
