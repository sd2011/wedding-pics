import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function GET() {
  try {
    const metadataPath = path.join(process.cwd(), 'data', 'photos.json')

    if (!existsSync(metadataPath)) {
      return NextResponse.json(
        { error: 'No photos found' },
        { status: 404 }
      )
    }

    const data = await readFile(metadataPath, 'utf-8')
    const photos = JSON.parse(data)

    if (photos.length === 0) {
      return NextResponse.json(
        { error: 'No photos to download' },
        { status: 404 }
      )
    }

    // Return all photos with their URLs and filenames
    // Client-side will handle zip creation using JSZip
    return NextResponse.json({
      photos: photos.map((photo: any) => ({
        url: photo.url.startsWith('http') 
          ? photo.url 
          : `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${photo.url}`,
        filename: photo.filename || `photo-${photo.id}.jpg`,
      })),
    })
  } catch (error) {
    console.error('Error preparing download:', error)
    return NextResponse.json(
      { error: 'Error preparing download' },
      { status: 500 }
    )
  }
}