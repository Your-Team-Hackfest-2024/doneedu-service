import { FlashList } from '@shopify/flash-list';
import { Link, useRouter } from 'expo-router';
import {
  H4,
  SizableText,
  Spacer,
  XStack,
  Image,
  Button,
  YStack,
  Avatar,
  Progress,
  Paragraph,
} from 'tamagui';

import { Card } from '@/components/Card';
import { Container } from '@/components/Container';
import ShareButton from '@/components/ShareButton';
import { DATA } from '@/constants/mockData';

export default function DonationsScreen() {
  const router = useRouter();

  return (
    <Container unsetPB>
      <H4>Ongoing Donations</H4>
      <XStack minHeight={2} flex={1} paddingVertical="$4">
        <FlashList
          data={Array.from({ length: 3 }, () => DATA)}
          ItemSeparatorComponent={() => <Spacer space="$2" />}
          renderItem={({ item }) => (
            <Card
              backgroundColor="$secondary"
              animation="100ms"
              pressStyle={{
                scale: 0.95,
              }}
              onPress={() => {
                router.push({ pathname: '/(app)/donation/[id]', params: { id: item.id } });
              }}
              overflow="hidden"
            >
              <Image
                source={{
                  uri: 'https://statik.tempo.co/data/2023/11/14/id_1254519/1254519_720.jpg',
                  height: 100,
                }}
              />
              <Card.Header
                paddingVertical="$2"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <SizableText size="$5">{item.title}</SizableText>
                <ShareButton small />
              </Card.Header>
              <Paragraph paddingHorizontal="$4">Donations made: 21,0231,874</Paragraph>
              <XStack justifyContent="space-between" marginHorizontal="$4" alignItems="center">
                <Card.Description>Top Donors</Card.Description>
                <XStack gap={-10}>
                  <Avatar circular bordered size="$2">
                    <Avatar.Image src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80" />
                    <Avatar.Fallback backgroundColor="$accent" />
                  </Avatar>
                  <Avatar circular bordered size="$2">
                    <Avatar.Image src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80" />
                    <Avatar.Fallback backgroundColor="$accent" />
                  </Avatar>
                  <Avatar circular bordered size="$2">
                    <Avatar.Image src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80" />
                    <Avatar.Fallback backgroundColor="$accent" />
                  </Avatar>
                </XStack>
              </XStack>
              <YStack marginHorizontal="$4">
                <XStack justifyContent="space-between">
                  <Card.Description>Collected</Card.Description>
                  <Card.Description>90%</Card.Description>
                </XStack>
                <Progress value={90} size="$1" backgroundColor="#f8df87">
                  <Progress.Indicator animation="bouncy" backgroundColor="$primary" />
                </Progress>
              </YStack>
              <Card.Footer padded gap="$4" alignItems="flex-end">
                <Card.Description theme="alt1">Due on : 21 March 2024</Card.Description>
                <Link href={{ pathname: '/payment', params: { donationId: item.id } }} asChild>
                  <Button flex={1}>Donate Now</Button>
                </Link>
              </Card.Footer>
            </Card>
          )}
          estimatedItemSize={250}
        />
      </XStack>
    </Container>
  );
}
