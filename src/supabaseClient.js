import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zqfnncsdaiimchnigppf.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxZm5uY3NkYWlpbWNobmlncHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5OTQxMDIsImV4cCI6MjA0NzU3MDEwMn0.T3mfgvgbkMXP_bKpEiSv-x_PSM6634SRUvIXpCJN12o";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
