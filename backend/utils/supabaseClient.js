const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://qseldenfnhiuffhshlvj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzZWxkZW5mbmhpdWZmaHNobHZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MjM2MzksImV4cCI6MjA5OTE5OTYzOX0.x5zrPyEBZjPUzMJNA5oIrMxWmED0B0uTX8_-hf0EOKg';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: false
  }
});

module.exports = { supabase };
