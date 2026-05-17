import { getSupabase } from '@/lib/supabase'

export async function GET() {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function POST(request: Request) {
  const { title } = await request.json()

  if (!title?.trim()) {
    return Response.json({ error: '제목을 입력해주세요.' }, { status: 400 })
  }

  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('todos')
    .insert({ title: title.trim() })
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data, { status: 201 })
}
