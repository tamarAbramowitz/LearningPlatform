# AI-Driven Learning Platform - Backend

##  תיאור הפרויקט
פלטפורמת למידה מבוססת בינה מלאכותית (AI) המאפשרת למשתמשים ליצור תוכן למידה מותאם אישית. המערכת מקבלת קטגוריות ונושאים, ומשתמשת ב-OpenAI API כדי להפיק שיעורים, הסברים ומשימות תרגול בזמן אמת.

##  נקודות חוזק וארכיטקטורה (Architectural Strengths)
- **מבנה מודולרי:** הפרדה ברורה בין Routes, Controllers, Services ו-Models לפי הסטנדרטים המובילים בתעשייה.
- **Type Safety:** שימוש מלא ב-**TypeScript** לאורך כל הפרויקט להבטחת קוד בטוח וקריא.
- **תיעוד API:** אינטגרציה מלאה עם **Swagger** המאפשרת צפייה ובדיקה נוחה של כל ה-Endpoints.
- **בדיקות אוטומטיות:** תשתית **Jest** עם כיסוי בדיקות (Test Coverage) מורחב עבור Controllers ו-Services.
- **ניהול סביבה:** שימוש ב-Docker Compose לניהול מסד הנתונים וניהול משתני סביבה מאובטח באמצעות קבצי `.env`.

## 🛠 טכנולוגיות
- **Runtime:** Node.js (TypeScript)
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose
- **AI Integration:** OpenAI API (GPT-3.5-turbo)
- **Authentication:** JWT (JSON Web Tokens)
- **Documentation:** Swagger UI
- **Testing:** Jest & Supertest
- **Infrastructure:** Docker & Docker Compose

##  התקנה והגדרה
1. **שכפול המאגר:**
   ```bash
   git clone <repository-url>
   cd backend
התקנת תלויות:

Bash

npm install
הגדרת משתני סביבה: יש ליצור קובץ .env בתיקיית השורש של ה-backend על בסיס קובץ הדוגמה שצורף:

Bash

cp .env.example .env
יש לעדכן את המפתחות OPENAI_API_KEY ו-JWT_SECRET בתוך הקובץ החדש.

הרמת בסיס הנתונים (Docker):

Bash

docker-compose up -d
 הרצה
להרצת השרת במצב פיתוח:

Bash

npm run dev
השרת ירוץ כברירת מחדל בכתובת: http://localhost:5000

 תיעוד API (Swagger)
ניתן לגשת לתיעוד ה-API המלא ולבצע בדיקות בכתובת: http://localhost:5000/api-docs

 בדיקות (Testing)
הפרויקט כולל בדיקות יחידה ואינטגרציה. להרצת כל הבדיקות:

Bash

npm test
 מבנה התיקיות
src/controllers/ - לוגיקת הטיפול בבקשות HTTP וניהול תגובות.

src/services/ - לוגיקה עסקית, אינטגרציה עם OpenAI וניהול שירותים.

src/models/ - הגדרת Schemas עבור MongoDB באמצעות Mongoose.

src/routes/ - ניתוב ה-API וחשיפתם לתיעוד ה-Swagger.

src/middleware/ - טיפול בשגיאות גלובלי, אימות JWT והרשאות.

src/types/ - הגדרות טיפוסים (Type Definitions) והרחבות ל-Express.

פותח על ידי תמר אברמוביץ