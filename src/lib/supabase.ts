import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rxtzjmuwbvfrccyfrcwx.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_ivLcYXdknInGUCTQ53_ufg_0glxmzBx'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const createSupabaseClient = (token?: string) => {
  if (token) {
    return createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })
  }
  return supabase
}
