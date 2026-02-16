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

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            איך זה עובד?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                סרוק את הקוד
              </h3>
              <p className="text-gray-600">
                סרוק את קוד ה-QR עם הטלפון שלך
              </p>
            </div>
            <div className="card text-center">
              <div className="text-5xl mb-4">📸</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                העלה תמונות
              </h3>
              <p className="text-gray-600">
                בחר תמונות מהגלריה שלך והעלה אותן
              </p>
            </div>
            <div className="card text-center">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                שתף רגעים
              </h3>
              <p className="text-gray-600">
                כל התמונות מופיעות בגלריה המשותפת
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            אלבום תמונות דיגיטלי
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            כל התמונות נשמרות במקום אחד ונגישות לכולם. 
            אין צורך באפליקציה או הרשמה - פשוט סרוק והעלה!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white rounded-lg px-6 py-3 shadow-md">
              <span className="text-2xl">✨</span>
              <p className="text-sm text-gray-600 mt-1">ללא הגבלה</p>
            </div>
            <div className="bg-white rounded-lg px-6 py-3 shadow-md">
              <span className="text-2xl">⚡</span>
              <p className="text-sm text-gray-600 mt-1">עדכון בזמן אמת</p>
            </div>
            <div className="bg-white rounded-lg px-6 py-3 shadow-md">
              <span className="text-2xl">🔒</span>
              <p className="text-sm text-gray-600 mt-1">פרטי ובטוח</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}