export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          discounted_price: number | null
          image: string
          available: boolean
          capacity: string
          condition: string
          delivery: string
          warranty: string
          features: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          discounted_price?: number | null
          image: string
          available?: boolean
          capacity: string
          condition: string
          delivery: string
          warranty: string
          features: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          discounted_price?: number | null
          image?: string
          available?: boolean
          capacity?: string
          condition?: string
          delivery?: string
          warranty?: string
          features?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}