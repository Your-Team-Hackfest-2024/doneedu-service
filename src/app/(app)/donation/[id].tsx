import { LinearGradient } from 'expo-linear-gradient';
import { Link, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Avatar,
  Button,
  H3,
  Paragraph,
  Progress,
  SizableText,
  XStack,
  YStack,
  useTheme,
} from 'tamagui';

import { Card } from '@/components/Card';
import { Container } from '@/components/Container';
import Logo from '@/components/Logo';
import ShareButton from '@/components/ShareButton';
import { DATA } from '@/constants/mockData';
import { Stack } from '@/lib/navigation';

const IMG_HEIGHT = 300;

export default function DonationDetailScreen() {
  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const scrollRef = useRef<Animated.ScrollView>(null);
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, 300 / 2], [0, 1]),
    };
  });
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  const [moreText, setMoreText] = useState(false);

  return (
    <YStack flex={1} backgroundColor="$background">
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: () => (
            <Animated.View style={headerAnimatedStyle}>
              <Logo primaryColor={theme.accent.val} secondaryColor={theme.primary.val} />
            </Animated.View>
          ),
          headerBackground: () => (
            <Animated.View
              style={[
                headerAnimatedStyle,
                {
                  backgroundColor: theme.background.val,
                  height: 104,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                },
              ]}
            />
          ),
          headerRight: () => <ShareButton />,
        }}
      />
      <StatusBar style="light" />

      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: bottom + 32 }}
      >
        <YStack>
          <Animated.Image
            source={{
              uri: 'https://statik.tempo.co/data/2023/11/14/id_1254519/1254519_720.jpg',
              height: IMG_HEIGHT,
            }}
            style={imageAnimatedStyle}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', theme.background.val]}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: IMG_HEIGHT,
            }}
          />
        </YStack>

        <Container unsetPB>
          <H3 y="$-11">{DATA.title}</H3>

          <YStack space="$4" marginTop="$-9">
            <YStack space="$4">
              <YStack>
                <Paragraph size="$5">Donations made: 21,0231,874</Paragraph>
                <Card.Description theme="alt1" size="$3">
                  Due on : 21 March 2024
                </Card.Description>
              </YStack>

              <XStack justifyContent="space-between" space>
                <YStack>
                  <Card.Description size="$3">Top Donors</Card.Description>
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
                </YStack>
                <YStack flex={1}>
                  <XStack justifyContent="space-between">
                    <Card.Description>Collected</Card.Description>
                    <Card.Description>90%</Card.Description>
                  </XStack>
                  <Progress value={90} size="$1" backgroundColor="#f8df87">
                    <Progress.Indicator animation="bouncy" backgroundColor="$primary" />
                  </Progress>
                </YStack>
              </XStack>
            </YStack>

            <YStack space="$4" paddingVertical="$4">
              <Paragraph size="$5" fontWeight="700">
                Overview
              </Paragraph>
              <Paragraph size="$2" numberOfLines={moreText ? undefined : 10}>
                Current conflicts are putting the nutritional status of infants, young children,
                pregnant and breastfeeding mothers, and other vulnerable populations at risk due to
                shock, stress, and lack of food, water, and other essential services. Health
                facilities across the State of Palestine (SoP) are overwhelmed, with nutritional and
                medical services affected by intense hostilities and frequent power outages.{' '}
                {`\n\n`}
                This jeopardizes access to preventive and life-saving care for all children across
                the Gaza Strip. In Gaza, one of the most densely populated areas on earth, 2.2
                million people have lived under lockdown for 16 years, with limited access to basic
                needs.
                {`\n\n`}
                In Gaza, bakeries and other food producers have been destroyed and remaining
                businesses are at risk of running out of fuel, cutting off a vital food source for
                millions of people. Food shortages are expected to worsen. Children under the age of
                five are particularly at risk of water and food insecurity. Due to poor hygiene,
                they are at high risk of illness and are highly susceptible to diarrheal diseases,
                which can quickly become life-threatening if not treated immediately.
              </Paragraph>
              <TouchableOpacity onPress={() => setMoreText((prev) => !prev)}>
                <SizableText color="$primary">{moreText ? 'Show less' : 'Show more'}</SizableText>
              </TouchableOpacity>
            </YStack>
          </YStack>
        </Container>
      </Animated.ScrollView>

      <Animated.View
        style={{
          position: 'absolute',
          bottom,
          left: 0,
          right: 0,
          alignItems: 'center',
        }}
        entering={SlideInDown.delay(200)}
      >
        <Link href={{ pathname: '/payment', params: { donationId: id } }} asChild>
          <Button paddingHorizontal="$6" borderRadius="$5">
            Donate
          </Button>
        </Link>
      </Animated.View>
    </YStack>
  );
}
