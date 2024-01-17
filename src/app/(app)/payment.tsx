import { useLocalSearchParams } from 'expo-router';
import { Paragraph } from 'tamagui';

export default function PaymentScreen() {
  const { donationId } = useLocalSearchParams();

  return <Paragraph>Donation ID: {donationId}</Paragraph>;
}
