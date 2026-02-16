# פריסה מהירה - מדריך קצר 🚀

## אופציה מומלצת: Vercel + Cloudinary

### שלב 1: התקן Cloudinary (אופציונלי - רק לפריסה)
```bash
npm install
```
החבילה כבר נוספה ל-`package.json`

### שלב 2: צור חשבון Cloudinary
1. היכנס ל-https://cloudinary.com/users/register/free
2. הירשם (חינמי - 25GB)
3. העתק את ה-Credentials מה-Dashboard:
   - Cloud Name
   - API Key
   - API Secret

### שלב 3: העלה ל-GitHub
```bash
git init
git add .
git commit -m "Wedding photo sharing site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/wedding-photos.git
git push -u origin main
```

### שלב 4: פרוס ב-Vercel
1. היכנס ל-https://vercel.com
2. לחץ "Add New" → "Project"
3. חבר את ה-GitHub repository
4. לחץ "Import"
5. ב-"Environment Variables", הוסף:
   - `CLOUDINARY_CLOUD_NAME` = הערך שלך
   - `CLOUDINARY_API_KEY` = הערך שלך
   - `CLOUDINARY_API_SECRET` = הערך שלך
6. לחץ "Deploy"

**זהו!** האתר שלך יהיה זמין תוך דקות! 🎉

---

## ללא Cloudinary (לפיתוח מקומי בלבד)

אם אתה רוצה לנסות מקומית בלבד:
1. הרץ `npm run dev`
2. האתר יעבוד עם אחסון מקומי
3. **לא מומלץ לפריסה** - הקבצים יימחקו

---

## קישורים שימושיים

- Vercel: https://vercel.com
- Cloudinary: https://cloudinary.com
- GitHub: https://github.com

---

## בעיות?

אם נתקלת בבעיה:
1. ודא שמשתני הסביבה מוגדרים נכון
2. בדוק את ה-logs ב-Vercel Dashboard
3. ודא ש-Cloudinary credentials נכונים