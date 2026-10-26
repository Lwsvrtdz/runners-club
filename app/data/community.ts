import type { CommunityMember, CommunityStats } from '~/types'

export const communityStats: CommunityStats = {
  members: 186,
  weeklyRuns: 3,
  collectiveKm: 4200,
  upcomingEvents: 6,
}

export const communityMembers: CommunityMember[] = [
  {
    id: 'm1',
    name: 'Ana M.',
    role: 'Monday regular',
    story: 'Started on easy Mondays. Still here every 7PM. The Grove feels like home now.',
    distanceWeekly: '28 KM',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80&auto=format&fit=crop',
    experience: 'intermediate',
  },
  {
    id: 'm2',
    name: 'Rico T.',
    role: 'Friday speed',
    story: 'Speed sessions hurt in the best way. GenTri nights hit different with this pack.',
    distanceWeekly: '45 KM',
    image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80&auto=format&fit=crop',
    experience: 'advanced',
  },
  {
    id: 'm3',
    name: 'Kai L.',
    role: 'First month',
    story: 'Thought I was too slow. Monday easy proved me wrong. Showed up. Kept showing up.',
    distanceWeekly: '15 KM',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80&auto=format&fit=crop',
    experience: 'beginner',
  },
  {
    id: 'm4',
    name: 'Jess R.',
    role: 'Weekend LSD',
    story: 'Long Sundays from Maples Grove. Slow kilometres, good talks, stronger base.',
    distanceWeekly: '55 KM',
    image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=800&q=80&auto=format&fit=crop',
    experience: 'intermediate',
  },
  {
    id: 'm5',
    name: 'Miguel S.',
    role: 'Night pack',
    story: 'Work ends late. 7PM is perfect. Lights, asphalt, people who get it.',
    distanceWeekly: '32 KM',
    image: 'https://images.unsplash.com/photo-1513593771513-7b58b6a4eb5d?w=800&q=80&auto=format&fit=crop',
    experience: 'intermediate',
  },
  {
    id: 'm6',
    name: 'Trish V.',
    role: 'Pace buddy',
    story: 'I hang mid-pack so nobody feels alone. Cavite nights, shared effort.',
    distanceWeekly: '38 KM',
    image: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?w=800&q=80&auto=format&fit=crop',
    experience: 'advanced',
  },
]
