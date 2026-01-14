# API Testing Guide for LeetTrack

## Prerequisites
- Server must be running: `npm run dev`
- MongoDB must be connected
- Use Postman, Thunder Client (VS Code), or curl

---

## 1️⃣ Register a New User

**Endpoint:** `POST http://localhost:5000/api/auth/register`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "leetcodeUsername": "kamyu104"
}
```

**Expected Response (201):**
```json
{
  "_id": "65abc123...",
  "name": "John Doe",
  "email": "john@example.com",
  "leetcodeUsername": "kamyu104",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Save the token for next requests!**

---

## 2️⃣ Login User

**Endpoint:** `POST http://localhost:5000/api/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response (200):**
```json
{
  "_id": "65abc123...",
  "name": "John Doe",
  "email": "john@example.com",
  "leetcodeUsername": "kamyu104",
  "leetcodeData": { ... },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 3️⃣ Get User Profile (Protected)

**Endpoint:** `GET http://localhost:5000/api/auth/profile`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response (200):**
```json
{
  "_id": "65abc123...",
  "name": "John Doe",
  "email": "john@example.com",
  "leetcodeUsername": "kamyu104",
  "leetcodeData": { ... },
  "createdAt": "2024-01-11T...",
  "updatedAt": "2024-01-11T..."
}
```

---

## 4️⃣ Update LeetCode Username (Protected)

**Endpoint:** `PUT http://localhost:5000/api/auth/leetcode-username`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "leetcodeUsername": "newusername"
}
```

**Expected Response (200):**
```json
{
  "_id": "65abc123...",
  "name": "John Doe",
  "email": "john@example.com",
  "leetcodeUsername": "newusername",
  ...
}
```

---

## 5️⃣ Get LeetCode User Stats (Public)

**Endpoint:** `GET http://localhost:5000/api/leetcode/user/kamyu104`

**No headers required**

**Expected Response (200):**
```json
{
  "username": "kamyu104",
  "profile": {
    "realName": "Kamyu Coding",
    "userAvatar": "https://...",
    "ranking": 12345,
    "reputation": 500,
    "aboutMe": "...",
    "countryName": "Taiwan"
  },
  "submitStats": {
    "acSubmissionNum": [...],
    "totalSubmissionNum": [...]
  },
  "solvedProblems": {
    "easy": 500,
    "medium": 1200,
    "hard": 300,
    "total": 2000
  },
  "badges": [...]
}
```

---

## 6️⃣ Sync LeetCode Data (Protected)

**Endpoint:** `POST http://localhost:5000/api/leetcode/sync`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response (200):**
```json
{
  "message": "LeetCode data synced successfully",
  "leetcodeData": {
    "profile": {
      "ranking": 12345,
      "reputation": 500,
      "avatar": "https://..."
    },
    "solvedProblems": {
      "easy": 500,
      "medium": 1200,
      "hard": 300,
      "total": 2000
    },
    "submitStats": { ... },
    "lastSynced": "2024-01-11T..."
  }
}
```

---

## 7️⃣ Get Top Problems

**Endpoint:** `GET http://localhost:5000/api/leetcode/top`

**No headers required**

---

## 8️⃣ Get Post by ID

**Endpoint:** `GET http://localhost:5000/api/leetcode/post/2796025`

**No headers required**

---

## Using cURL (Command Line)

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"password\":\"password123\",\"leetcodeUsername\":\"kamyu104\"}"
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"john@example.com\",\"password\":\"password123\"}"
```

### Get Profile
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Sync LeetCode Data
```bash
curl -X POST http://localhost:5000/api/leetcode/sync \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get LeetCode User Stats
```bash
curl http://localhost:5000/api/leetcode/user/kamyu104
```

---

## Using PowerShell

### Register
```powershell
$body = @{
    name = "John Doe"
    email = "john@example.com"
    password = "password123"
    leetcodeUsername = "kamyu104"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/auth/register" `
    -ContentType "application/json" -Body $body
```

### Login
```powershell
$body = @{
    email = "john@example.com"
    password = "password123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/auth/login" `
    -ContentType "application/json" -Body $body

# Save token
$token = $response.token
```

### Get Profile
```powershell
Invoke-RestMethod -Method Get -Uri "http://localhost:5000/api/auth/profile" `
    -Headers @{ Authorization = "Bearer $token" }
```

### Sync LeetCode Data
```powershell
Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/leetcode/sync" `
    -Headers @{ Authorization = "Bearer $token" }
```

### Get LeetCode User Stats
```powershell
Invoke-RestMethod -Method Get -Uri "http://localhost:5000/api/leetcode/user/kamyu104"
```

---

## Common Test Scenarios

### Scenario 1: New User Journey
1. Register user → Get token
2. Login → Verify credentials
3. Get profile → Check user data
4. Sync LeetCode data → Fetch stats
5. Get profile again → Verify synced data

### Scenario 2: Existing User
1. Login → Get token
2. Update LeetCode username
3. Sync data
4. View updated profile

### Scenario 3: Public LeetCode Stats
1. Get any user's stats by username
2. No authentication needed

---

## Expected Error Responses

### 400 Bad Request
```json
{
  "message": "Please fill all fields"
}
```

### 401 Unauthorized
```json
{
  "message": "Not authorized, no token"
}
```

### 404 Not Found
```json
{
  "message": "LeetCode user not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error",
  "error": "Error details..."
}
```

---

## Popular LeetCode Usernames to Test With

- `kamyu104` - Very active user
- `leetcode` - Official account
- `awice` - Top contributor
- `votrubac` - Popular contributor

---

## Tips

1. **Save your token** after login/register
2. **Use environment variables** for the token in Postman
3. **Test error cases** (wrong password, missing fields, etc.)
4. **Check MongoDB** to see stored data
5. **Monitor server logs** for debugging
