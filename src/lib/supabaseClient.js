import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tngphuggmgrhulennpwp.supabase.co'
const supabaseKey = 'sb_publishable_Xmy5aWp1XP_kVkmDq06Z2A_6BXtCznl'

export const supabase = createClient(supabaseUrl, supabaseKey)