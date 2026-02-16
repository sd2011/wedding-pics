'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Photo {
  id: string
  filename: string
  url: string
  uploadedAt: string
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    try {
      const response = await fetch('/api/photos')
      if (response.ok) {
        const data = await response.json()
        setPhotos(data)
      }
    } catch (error) {
      console.error('Error fetching photos:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">⏳</div>
          <p className="text-xl text-gray-600">טוען תמונות...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-wedding-gold hover:underline">
            ← חזרה לדף הבית
          </Link>
          <Link href="/upload" className="btn-primary">
            העלה תמונות נוספות
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          גלריית התמונות שלנו 🖼️
        </h1>

        {photos.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📸</div>
            <p className="text-2xl text-gray-600 mb-4">
              עדיין לא הועלו תמונות
            </p>
            <Link href="/upload" className="btn-primary inline-block">
              העלה את התמונה הראשונה
            </Link>
          </div>
        ) : (
          <>
            <p className="text-center text-gray-600 mb-8">
              {photos.length} תמונות בגלריה
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={photo.url}
                    alt={photo.filename}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Modal for full-size photo */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div className="relative max-w-5xl max-h-full">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 left-4 text-white text-3xl hover:text-gray-300 z-10"
              >
                ✕
              </button>
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.filename}
                className="max-w-full max-h-[90vh] object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}