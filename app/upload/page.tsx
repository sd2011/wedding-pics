'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setFiles(selectedFiles)
      setError('')
    }
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      setError('אנא בחר תמונות להעלאה')
      return
    }

    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append('photos', file)
      })

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('שגיאה בהעלאת התמונות')
      }

      setSuccess(true)
      setFiles([])
      
      setTimeout(() => {
        router.push('/gallery')
      }, 2000)
    } catch (err) {
      setError('אירעה שגיאה בהעלאת התמונות. אנא נסה שוב.')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-wedding-gold hover:underline mb-6 inline-block">
          ← חזרה לדף הבית
        </Link>

        <div className="card">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            העלה תמונות לחתונה שלנו 📸
          </h1>

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              <p className="font-bold">התמונות הועלו בהצלחה! 🎉</p>
              <p className="text-sm">מעבירים אותך לגלריה...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              בחר תמונות להעלאה:
            </label>
            <div className="border-2 border-dashed border-wedding-gold rounded-lg p-8 text-center hover:bg-wedding-blush/30 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="cursor-pointer block"
              >
                <div className="text-5xl mb-4">📷</div>
                <p className="text-gray-600 mb-2">
                  לחץ כאן לבחירת תמונות
                </p>
                <p className="text-sm text-gray-500">
                  ניתן לבחור מספר תמונות בבת אחת
                </p>
              </label>
            </div>

            {files.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">
                  נבחרו {files.length} תמונות:
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {files.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                      <p className="text-xs text-gray-600 mt-1 truncate">
                        {file.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading || files.length === 0}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'מעלה תמונות...' : `העלה ${files.length > 0 ? `${files.length} תמונות` : 'תמונות'}`}
          </button>

          <div className="mt-6 text-center">
            <Link href="/gallery" className="text-wedding-gold hover:underline">
              צפה בגלריה המלאה →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}