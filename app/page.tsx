'use client'

import Link from 'next/link'
import { QRCodeSVG } from 'qrcode.react'
import { useState, useEffect } from 'react'

export default function Home() {
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    setCurrentUrl(window.location.origin)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
            ברוכים הבאים לחתונה שלנו! 💍
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            שתפו איתנו את הרגעים היפים ביותר מהאירוע
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/upload" className="btn-primary text-lg">
              העלה תמונה 📸
            </Link>
            <Link href="/gallery" className="btn-secondary text-lg">
              צפה בגלריה 🖼️
            </Link>
          </div>

          {/* QR Code Section */}
          <div className="card max-w-md mx-auto mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              סרוק כדי לשתף תמונות
            </h2>
            <div className="flex justify-center bg-white p-4 rounded-lg">
              {currentUrl && (
                <QRCodeSVG 
                  value={`${currentUrl}/upload`}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              )}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              האורחים יכולים לסרוק את הקוד ולהעלות תמונות ישירות
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}