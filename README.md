# Mood Journal

A full‑stack mood journaling application. Users can register/login, log their moods, and view insights such as weekly averages, top moods, and mood shifts. The project is a monorepo with a React (Vite) frontend and a Spring Boot backend backed by MongoDB.


## Repository structure

```text path=null start=null
D:/journal
├─ backend/           # Spring Boot (Java 17) API server
├─ frontend2.0/       # React + Vite + Tailwind UI
└─ insights/          # (placeholder)
```


## Tech stack
- Backend: Spring Boot 3, Java 17, Maven, Spring Data MongoDB, Spring Security (open for dev), Lombok
- Database: MongoDB (local default: mongodb://localhost:27017, DB: mood_journal)
- Frontend: React 19, Vite, Tailwind CSS, Radix UI, react-router-dom, axios


## Prerequisites
- Java 17+
- Maven (or use the included Maven Wrapper)
- Node.js 18+ and npm
- MongoDB running locally on port 27017


## Quick start

1) Start MongoDB (ensure it’s running on localhost:27017)

2) Start the backend API (port 8080)
- Using Maven Wrapper on Windows:
```bash path=null start=null
D:\journal\backend\mvnw.cmd spring-boot:run
```
- Or with Maven installed:
```bash path=null start=null
mvn -f D:\journal\backend\pom.xml spring-boot:run
```

3) Start the frontend (port 5173)
```bash path=null start=null
cd D:\journal\frontend2.0
npm install
npm run dev
```
Open http://localhost:5173 in your browser.


## Configuration

Backend
- Port: 8080 (configured in backend/src/main/resources/application.properties)
- MongoDB: hardcoded in code for now
  - URI: mongodb://localhost:27017
  - DB: mood_journal
  - Location: backend/src/main/java/com/mood/journal/util/MongoUtil.java
- CORS: allows http://localhost:5173 by default for local development
  - Location: backend/src/main/java/com/mood/journal/config/SecurityConfig.java
  - Update allowed origins if your frontend runs on a different host/port

Frontend
- Dev server: Vite on http://localhost:5173
- API base URL: by default, call the backend on http://localhost:8080 (update your API client code if you change ports)


## Project architecture

High‑level
```text path=null start=null
React (Vite) UI  ──>  REST API (Spring Boot)  ──>  MongoDB
```

Backend layering
- Controller: HTTP endpoints (/user, /mood, /insights)
- Service: business logic (e.g., registration, insights calculations)
- DAO: MongoDB access (via MongoTemplate)
- Model/Request/Response: domain entities and DTOs

Key packages
- com.mood.journal.controller: UserController, MoodController, InsightsController
- com.mood.journal.service: UserService, InsightsService
- com.mood.journal.dao(+impl): UserDao, MoodDao, WeeklyInsightsDao
- com.mood.journal.model: User, Mood, WeeklyInsights
- com.mood.journal.config: SecurityConfig (CORS, CSRF disabled for dev)
- com.mood.journal.util: MongoUtil (MongoTemplate setup)


## API overview (dev defaults)
Base URL: http://localhost:8080

User
- POST /user/register
```json path=null start=null
{
  "userName": "Alice",
  "email": "alice@example.com",
  "password": "secret"
}
```
- POST /user/login
```json path=null start=null
{
  "email": "alice@example.com",
  "password": "secret"
}
```
- POST /user/getUserDetails
```json path=null start=null
{ "userId": "<USER_ID>" }
```
- POST /user/changePassword
```json path=null start=null
{
  "userId": "<USER_ID>",
  "password": "oldPass",
  "newPass": "newPass",
  "confirmPass": "newPass"
}
```
- POST /user/changeUserName
```json path=null start=null
{
  "userId": "<USER_ID>",
  "userName": "New Name"
}
```

Mood
- POST /mood/saveCurrentMood
```json path=null start=null
{
  "userId": "<USER_ID>",
  "mood": "HAPPY"  // example label
}
```
- POST /mood/mostRecentTodayMood
```json path=null start=null
{ "userId": "<USER_ID>" }
```
- POST /mood/mostRecentMoods
```json path=null start=null
{ "userId": "<USER_ID>" }
```

Insights
- POST /insights/getWeeklyAverage
- POST /insights/getTopMoods
- POST /insights/getMoodShifts
All accept:
```json path=null start=null
{ "userId": "<USER_ID>" }
```

Example curl
```bash path=null start=null
curl -X POST http://localhost:8080/user/register \
  -H "Content-Type: application/json" \
  -d '{"userName": "Alice", "email": "alice@example.com", "password": "secret"}'
```


## Build and production

Backend (fat JAR)
```bash path=null start=null
mvn -f D:\journal\backend\pom.xml -DskipTests package
java -jar D:\journal\backend\target\journal-0.0.1-SNAPSHOT.jar
```

Frontend (static build)
```bash path=null start=null
cd D:\journal\frontend2.0
npm run build
# Output in frontend2.0/dist
```
Serve the frontend via a static host (e.g., Nginx, Vercel) and point it at your backend’s URL. Alternatively, you can proxy through the frontend dev server during development.


## Development tips
- If you change the frontend origin/port, update the allowed origins in SecurityConfig.
- If your MongoDB is not local or uses auth, update the URI/DB in MongoUtil.
- Consider externalizing DB config to application.properties for production.


## Troubleshooting
- 401/403 from browser: verify CORS origin in SecurityConfig and that CSRF is disabled for your dev flows.
- Connection refused to MongoDB: ensure the server is running and the URI in MongoUtil matches your environment.
- Frontend can’t reach API: confirm backend is on port 8080 and the frontend is calling the correct base URL.


## License
Add your chosen license here.
