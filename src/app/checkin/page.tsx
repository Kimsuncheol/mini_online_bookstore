import { Metadata } from 'next'
import CheckInWrapper from '../components/checkIn/CheckInWrapper'

export const metadata: Metadata = {
  title: 'Daily Check-in - BookNest',
  description: 'Check in daily to earn coupons, build streaks, and unlock special rewards',
}

export default function CheckInPage() {
  return <CheckInWrapper />
}
