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
  const [downloadingAll, setDownloadingAll] = useState(false)

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

  const downloadPhoto = async (photo: Photo) => {
    try {
      const response = await fetch(photo.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = photo.filename || `photo-${photo.id}.jpg`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading photo:', error)
      alert('שגיאה בהורדת התמונה')
    }
  }

  const downloadAllPhotos = async () => {
    if (photos.length === 0) return
    
    setDownloadingAll(true)
    try {
      // Dynamically import JSZip
      const JSZip = (await import('jszip')).default
      const zip = new JSZip()
      
      // Download each photo and add to zip
      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i]
        try {
          const response = await fetch(photo.url)
          const blob = await response.blob()
          const filename = photo.filename || `photo-${photo.id}.jpg`
          zip.file(filename, blob)
        } catch (error) {
          console.error(`Error downloading photo ${i + 1}:`, error)
        }
      }
      
      // Generate zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      const url = window.URL.createObjectURL(zipBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `wedding-photos-${new Date().toISOString().split('T')[0]}.zip`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading all photos:', error)
      alert('שגיאה בהורדת כל התמונות. אנא נסה שוב.')
    } finally {
      setDownloadingAll(false)
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
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <Link href="/" className="text-wedding-gold hover:underline">
            ← חזרה לדף הבית
          </Link>
          <div className="flex gap-3">
            {photos.length > 0 && (
              <button
                onClick={downloadAllPhotos}
                disabled={downloadingAll}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloadingAll ? 'מוריד...' : '📥 הורד את כל התמונות'}
              </button>
            )}
            <Link href="/upload" className="btn-primary">
              העלה תמונות נוספות
            </Link>
          </div>
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
                >
                  <img
                    src={photo.url}
                    alt={photo.filename}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onClick={() => setSelectedPhoto(photo)}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      downloadPhoto(photo)
                    }}
                    className="absolute bottom-2 right-2 bg-wedding-gold text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-yellow-500"
                    title="הורד תמונה"
                  >
                    📥
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Modal for full-size photo */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedPhoto(null)
            }}
          >
            <div className="relative max-w-5xl max-h-full">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 left-4 text-white text-3xl hover:text-gray-300 z-10 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
              >
                ✕
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  downloadPhoto(selectedPhoto)
                }}
                className="absolute top-4 right-4 text-white bg-wedding-gold hover:bg-yellow-500 px-4 py-2 rounded-full z-10 flex items-center gap-2 font-semibold"
              >
                📥 הורד
              </button>
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.filename}
                className="max-w-full max-h-[90vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}