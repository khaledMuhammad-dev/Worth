import fs from 'fs'
import path from 'path'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const ALLOWLIST = [
  'announcements',
  'navigation',
  'home',
  'about',
  'services',
  'pricing',
  'work',
  'contact',
  'blog-meta',
  'settings',
]

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  const cookieStore = await cookies()
  const token = cookieStore.get('worth_admin_token')?.value

  if (!token || token !== process.env.ADMIN_SECRET_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { page } = await params

  if (!ALLOWLIST.includes(page)) {
    return NextResponse.json({ error: 'Invalid page' }, { status: 400 })
  }

  const data = await request.json()
  const filePath = path.join(process.cwd(), 'content/data', `${page}.json`)

  // TODO: Firebase migration
  // Replace: fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
  // With:    await db.collection('content').doc(page).set(data)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')

  return NextResponse.json({ success: true })
}
