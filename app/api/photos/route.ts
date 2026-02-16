import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function GET() {
  try {
    const metadataPath = path.join(process.cwd(), 'data', 'photos.json')

    if (!existsSync(metadataPath)) {
      return NextResponse.json([])
    }

    const data = await readFile(metadataPath, 'utf-8')
    const photos = JSON.parse(data)

    // Sort by upload date (newest first)
    photos.sort((a: any, b: any) => 
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )

    return NextResponse.json(photos)
  } catch (error) {
    console.error('Error reading photos:', error)
    return NextResponse.json(
      { error: 'שגיאה בטעינת התמונות' },
      { status: 500 }
    )
  }
}