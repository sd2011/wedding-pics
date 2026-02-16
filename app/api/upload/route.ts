import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

// Optional Cloudinary support
let cloudinary: any = null
try {
  if (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  ) {
    const cloudinaryModule = require('cloudinary')
    cloudinaryModule.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
    cloudinary = cloudinaryModule.v2
  }
} catch (error) {
  console.log('Cloudinary not configured, using local storage')
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('photos') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'לא נבחרו תמונות' },
        { status: 400 }
      )
    }

    const useCloudinary = !!cloudinary
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    
    // Create uploads directory if using local storage
    if (!useCloudinary && !existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const uploadedFiles = []

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        continue
      }

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      if (useCloudinary) {
        // Upload to Cloudinary
        const base64 = buffer.toString('base64')
        const dataURI = `data:${file.type};base64,${base64}`

        const result = await cloudinary.uploader.upload(dataURI, {
          folder: 'wedding-photos',
          resource_type: 'image',
        })

        uploadedFiles.push({
          id: result.public_id,
          filename: file.name,
          url: result.secure_url,
          uploadedAt: new Date().toISOString(),
        })
      } else {
        // Local storage
        const timestamp = Date.now()
        const randomStr = Math.random().toString(36).substring(2, 15)
        const extension = file.name.split('.').pop()
        const filename = `${timestamp}-${randomStr}.${extension}`
        const filepath = path.join(uploadDir, filename)

        await writeFile(filepath, buffer)

        uploadedFiles.push({
          id: `${timestamp}-${randomStr}`,
          filename: file.name,
          url: `/uploads/${filename}`,
          uploadedAt: new Date().toISOString(),
        })
      }
    }

    // Update photos metadata file
    const metadataPath = path.join(process.cwd(), 'data', 'photos.json')
    const metadataDir = path.dirname(metadataPath)
    
    if (!existsSync(metadataDir)) {
      await mkdir(metadataDir, { recursive: true })
    }

    let existingPhotos = []
    if (existsSync(metadataPath)) {
      const fs = await import('fs/promises')
      const data = await fs.readFile(metadataPath, 'utf-8')
      existingPhotos = JSON.parse(data)
    }

    const updatedPhotos = [...existingPhotos, ...uploadedFiles]
    const fs = await import('fs/promises')
    await fs.writeFile(metadataPath, JSON.stringify(updatedPhotos, null, 2))

    return NextResponse.json({
      success: true,
      message: `הועלו ${uploadedFiles.length} תמונות בהצלחה`,
      photos: uploadedFiles,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'שגיאה בהעלאת התמונות' },
      { status: 500 }
    )
  }
}