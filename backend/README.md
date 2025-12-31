# Learning Platform Backend

## תיאור הפרויקט
פלטפורמת למידה מבוססת בינה מלאכותית (Mini MVP) המאפשרת למשתמשים לבחור קטגוריה ותת-קטגוריה, לשלוח הנחיות ל-AI לקבלת שיעורים מותאמים, ולצפות בהיסטוריית הלמידה.

## טכנולוגיות בשימוש
- **Node.js** עם **TypeScript**
- **Express.js** לשרת REST API
- **MongoDB** עם **Mongoose** לבסיס נתונים
- **OpenAI GPT-3.5-turbo** לאינטגרציה עם בינה מלאכותית
- **JWT** לאימות משתמשים
- **Docker Compose** להרמת בסיס הנתונים

## הנחות עבודה
- Node.js גרסה 18 ומעלה
- MongoDB רץ מקומית או דרך Docker
- מפתח API של OpenAI (OPENAI_API_KEY)
- סוד JWT (JWT_SECRET)

## התקנה והגדרה
1. שכפל את המאגר:
   ```
   git clone <repository-url>
   cd backend
   ```

2. התקן תלויות:
   ```
   npm install
   ```

3. צור קובץ `.env` ברוט של הפרויקט (ראה דוגמה ב-.env.example):
   ```
   OPENAI_API_KEY=your_openai_api_key
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   MONGO_URI=mongodb://localhost:27017/learning-platform
   ```

4. הרם את בסיס הנתונים עם Docker:
   ```
   docker-compose up -d
   ```

## הרצה מקומית
```
npm run dev
```
השרת ירוץ על http://localhost:3000

## מבנה הפרויקט
- `controllers/` - בקרים לטיפול בבקשות
- `models/` - מודלים של בסיס הנתונים
- `routes/` - ניתובי ה-API
- `services/` - שירותים עסקיים (כמו קריאה ל-AI)
- `middleware/` - middleware לאימות וטיפול בשגיאות
- `utils/` - כלים עזר

## API Endpoints
- `POST /api/users/register` - רישום משתמש
- `POST /api/users/login` - התחברות
- `GET /api/users` - קבלת כל המשתמשים (מנהל בלבד)
- `POST /api/prompts` - יצירת שיעור חדש עם AI
- `GET /api/prompts/:userId` - קבלת היסטוריית משתמש
- ועוד...

## בדיקות
```
npm test
```

## פריסה
הפרויקט יכול להיות מופץ ל-Heroku או Vercel עם הגדרות סביבתיות מתאימות.