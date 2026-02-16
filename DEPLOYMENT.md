# מדריך פריסה (Deployment Guide)

## ⚠️ בעיה חשובה

האפליקציה הנוכחית שומרת תמונות על הדיסק המקומי (`public/uploads`). רוב פלטפורמות הפריסה (Vercel, Netlify) לא תומכות בשמירת קבצים על הדיסק - הקבצים נמחקים בכל deployment.

## פתרונות

### אופציה 1: Vercel (מומלץ - הכי קל) + Cloudinary

Vercel הוא הפלטפורמה הטובה ביותר ל-Next.js, אבל צריך להשתמש באחסון ענן לתמונות.

#### שלבים:

1. **התקן את Cloudinary:**
```bash
npm install cloudinary
```

2. **צור חשבון ב-Cloudinary:**
   - היכנס ל-https://cloudinary.com
   - צור חשבון חינמי (25GB אחסון)
   - העתק את ה-API credentials

3. **הוסף משתני סביבה:**
   - צור קובץ `.env.local`:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. **עדכן את קוד ההעלאה** (אני אכין לך גרסה מעודכנת)

5. **העלה ל-GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/wedding-photos.git
git push -u origin main
```

6. **התחבר ל-Vercel:**
   - היכנס ל-https://vercel.com
   - התחבר עם GitHub
   - בחר את הפרויקט
   - הוסף את משתני הסביבה ב-Settings → Environment Variables
   - לחץ Deploy

---

### אופציה 2: Netlify + Cloudinary

דומה ל-Vercel:

1. העלה ל-GitHub (כמו למעלה)
2. היכנס ל-https://netlify.com
3. התחבר עם GitHub
4. בחר את הפרויקט
5. הוסף משתני סביבה
6. Deploy

---

### אופציה 3: Railway / Render (תמיכה באחסון קבצים)

פלטפורמות אלה תומכות באחסון קבצים קבוע:

#### Railway:
1. היכנס ל-https://railway.app
2. New Project → Deploy from GitHub
3. בחר את הפרויקט
4. הוסף משתנה `NODE_ENV=production`
5. Deploy

#### Render:
1. היכנס ל-https://render.com
2. New → Web Service
3. חבר ל-GitHub repository
4. Build Command: `npm install && npm run build`
5. Start Command: `npm start`
6. Deploy

**הערה:** גם כאן מומלץ להשתמש באחסון ענן לטווח ארוך.

---

### אופציה 4: VPS (שרת פרטי)

אם יש לך שרת VPS (DigitalOcean, AWS EC2, וכו'):

1. התקן Node.js ו-npm
2. Clone את הפרויקט
3. התקן תלויות: `npm install`
4. Build: `npm run build`
5. הפעל עם PM2: `pm2 start npm --name "wedding" -- start`

---

## המלצה שלי

**השתמש ב-Vercel + Cloudinary:**
- ✅ חינמי (עד גבול מסוים)
- ✅ הכי קל לפריסה
- ✅ מהיר מאוד
- ✅ תמיכה מעולה ב-Next.js
- ✅ אחסון תמונות אמין בענן

אני יכול לעזור לך לעדכן את הקוד לשימוש ב-Cloudinary. זה ייקח רק כמה דקות!

---

## לפני הפריסה

1. **ודא שהכל עובד מקומית:**
```bash
npm run build
npm start
```

2. **הוסף ל-.gitignore:**
```
.env.local
.env
public/uploads/
data/photos.json
node_modules/
```

3. **צור קובץ `.env.example`:**
```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## שאלות?

אם תרצה, אני יכול:
- לעדכן את הקוד לשימוש ב-Cloudinary
- לעזור עם הפריסה
- להוסיף תכונות נוספות