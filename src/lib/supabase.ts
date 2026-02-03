import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// 타입 정의
export interface User {
  id: string;
  email: string;
  user_type: 'artist' | 'client' | 'admin';
  name?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Artist {
  id: string;
  user_id: string;
  stage_name: string;
  category: string;
  location: string;
  genres: string[];
  skills: string[];
  bio: string;
  logo?: string; // 아티스트 로고 URL
  experience_years: number;
  min_fee: number;
  max_fee: number;
  equipment: string[];
  photos: string[];
  videos: string[];
  music_links: string[];
  sns: Record<string, string>;
  agency?: string;
  is_verified: boolean;
  is_available: boolean;
  avg_rating: number;
  review_count: number;
  view_count: number;
  favorite_count: number;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  artist_id: string;
  user_id: string;
  user_name: string;
  user_company?: string;
  rating: number;
  content: string;
  event_type: string;
  event_date: string;
  event_location: string;
  photos: string[];
  helpful_count: number;
  artist_reply?: string;
  artist_reply_date?: string;
  created_at: string;
}

export interface ContactRequest {
  id: string;
  artist_id: string;
  client_id: string;
  contact_name: string;
  company_name: string;
  email: string;
  phone: string;
  event_name: string;
  event_type: string;
  event_date: string;
  event_time?: string;
  event_location: string;
  budget_min: number;
  budget_max: number;
  requirements: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  artist_response?: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'contact' | 'message' | 'review' | 'system';
  title: string;
  content: string;
  link?: string;
  is_read: boolean;
  created_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  artist_id: string;
  folder?: string;
  created_at: string;
}
