export type SessionType = 'easy' | 'tempo' | 'intervals' | 'long' | 'social'

export type Difficulty = 'easy' | 'moderate' | 'hard'

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced' | 'all'

export interface RunEvent {
  id: string
  number: string
  title: string
  date: string
  time: string
  distanceKm: number
  pace: string
  effort: string
  meetingPoint: string
  difficulty: Difficulty
  type: SessionType
  capacity: number
  registered: number
  status: 'open' | 'filling' | 'full'
  description: string
  routePreview: string
  elevationM: number
}

export interface RoutePoint {
  x: number
  y: number
}

export interface ClubRoute {
  id: string
  name: string
  tagline: string
  distanceKm: number
  elevationM: number
  durationMin: number
  difficulty: Difficulty
  start: string
  finish: string
  description: string
  path: string
  points: RoutePoint[]
  color: string
}

export interface CommunityMember {
  id: string
  name: string
  role: string
  story: string
  distanceWeekly: string
  image: string
  experience: ExperienceLevel
}

export interface JournalArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string
  category: JournalCategory
  date: string
  readTime: string
  image: string
  author: string
}

export type JournalCategory =
  | 'training'
  | 'culture'
  | 'routes'
  | 'races'
  | 'members'
  | 'events'

export interface CommunityStats {
  members: number
  weeklyRuns: number
  collectiveKm: number
  upcomingEvents: number
}
