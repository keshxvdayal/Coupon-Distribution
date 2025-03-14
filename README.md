# 🎟️ Round-Robin Coupon Distribution with Abuse Prevention

Welcome to the **Round-Robin Coupon Distribution with Abuse Prevention** project! This live web application distributes coupons to guest users in a fair and secure manner, preventing multiple claims via page refresh exploits.

## 🚀 Features

✅ **Round-Robin Distribution**: Coupons are distributed evenly among users.
✅ **IP Tracking**: Restricts users from claiming multiple coupons using the same IP within a specific time frame.
✅ **Cookie-Based Tracking**: Ensures users can't claim multiple coupons by refreshing the browser.
✅ **Real-Time Updates**: Users get instant feedback on coupon claims and eligibility.
✅ **User Feedback**: Clear messages are displayed for claim success, failure, or cooldown time remaining.
✅ **Secure System**: Implements multiple abuse-prevention techniques to maintain fairness.

---

## 🏗️ Project Structure

```
📦 Project Root
│
├── 📂 backend
│   ├── server.js  # Backend server (Express, Node.js)
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── database.js  # Database connection (MongoDB)
│
├── 📂 frontend
│   ├── 📂 public
│   ├── 📂 src
│   │   ├── 📂 app
│   │   │   ├── favicon.ico
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   ├── 📂 components
│   │   │   ├── 📂 ui
│   │   │   │   ├── ClaimButton.tsx
│   │   │   ├── CouponList.tsx
│   │   │   ├── available-coupons.tsx
│   │   │   ├── claimed-coupons.tsx
│   ├── 📂 hooks
│   ├── 📂 lib
│   ├── 📄 README.md
│   ├── 📄 eslint.config.mjs
```

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (React, TypeScript, Tailwind CSS)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: React Context API
- **Security**: IP tracking, cookie-based tracking

## 🎯 Functionality

1. **Coupon Distribution:** Coupons are given out in a round-robin manner.
2. **User Restrictions:**
   - **IP Tracking**: Prevents multiple claims from the same IP within a time window.
   - **Cookie Tracking**: Ensures that users don’t claim multiple coupons from the same browser.
3. **User Experience**
   - Users receive clear messages regarding their coupon claim status.
   - Cooldown notifications inform users of the remaining time before they can claim another coupon.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), TypeScript, Tailwind CSS
- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Deployment**: [Vercel](https://vercel.com/) (Frontend) + [Railway](https://railway.app/) or [Render](https://render.com/) for Backend
- **Security**: IP tracking, Cookie-based session tracking
- **Tools & Libraries**: ESLint, Prettier, Sanity CMS, GROQ

---

## 🏗️ Installation Guide

### 1️⃣ Clone the Repository
```bash
https://github.com/your-github-username/round-robin-coupons.git
cd round-robin-coupon-distribution
```

### 2️⃣ Setup Backend
```bash
cd backend
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file inside the `backend` folder and add the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
COOKIE_MAX_AGE=3600000 # (1 hour in milliseconds)
```

### 4️⃣ Start Backend Server
```bash
cd backend
npm install
npm start
```

---

## 🌐 Frontend Setup

### 5️⃣ Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 6️⃣ Start Frontend Server
```bash
npm run dev
```
The frontend should be running on `http://localhost:3000`

---

## 🚀 Deployment Guide

### 📌 Deploy Backend to Render or Vercel
1. Create an account on [Render](https://render.com/) or [Vercel](https://vercel.com/).
2. Connect your GitHub repository.
3. Select `backend` folder for deployment.
4. Set the environment variables as defined in `.env`.
5. Choose the build command:
   ```bash
   npm install && node server.js
   ```
6. Deploy the backend and note down the deployed API URL.

### 📌 Deploy Frontend to Vercel
1. Create an account on [Vercel](https://vercel.com/) and link your GitHub repository.
2. In your project settings, set the **root directory** to `frontend`.
3. Add your environment variables in Vercel under **Settings → Environment Variables**.
4. Deploy your project.

#### 🎯 **Make sure your frontend .env file contains the deployed backend URL:**
```env
NEXT_PUBLIC_API_URL=your_backend_url
```

---

## 🚀 Project Workflow

1️⃣ **User visits the website** and is assigned a temporary guest session.
2️⃣ The system **distributes coupons in a round-robin manner** to users.
3️⃣ Mechanisms are in place to **prevent abuse**, such as IP tracking and session-based restrictions.
4️⃣ The user receives **feedback** on their coupon claim status.
5️⃣ If the user is **ineligible** (due to refreshing the page too many times), they are informed how long they must wait to claim another coupon.
6️⃣ The project is **deployed on Vercel** for the frontend and **Render/Vercel** for the backend.

---

## 🚀 Deployment on Vercel

### 1️⃣ Deploy Frontend (Next.js on Vercel)
1. Go to [Vercel](https://vercel.com/) and log in with GitHub.
2. Click **New Project** and select your repository.
3. Set the root directory to `/frontend`.
4. Set environment variables if required (e.g., API endpoints).
5. Click **Deploy**.

### 2️⃣ Deploy Backend (Node.js on Vercel/Render)
- **On Vercel**:
  1. Create a new project in Vercel.
 2. Set your root directory to `/backend`.
 3. Configure environment variables (same as `.env` file).
 4. Deploy the project.

### 2️⃣ Deploy Backend (Render - Alternative)
1. Create an account on [Render](https://render.com/).
2. Click on `New Web Service` and connect your GitHub repo.
3. Set the root directory to `/backend`.
4. Set the **Start Command** to:
   ```bash
   node server.js
   ```
5. Add the same environment variables from `.env`.
6. Deploy the backend and get the live API URL.

### 2️⃣ Connect Frontend to Backend
1. In your **Vercel Project Settings**, navigate to `Environment Variables`.
2. Add `NEXT_PUBLIC_API_BASE_URL` with the value of your deployed backend URL.
3. Redeploy your frontend.

---

## 🚀 How It Works
1. User visits the site and registers.
2. The system assigns a **random coupon in a round-robin manner**.
3. The backend tracks the **user’s IP address and session** to prevent abuse.
4. The user receives a notification about their successful claim or the waiting time left.

---

## 📜 Tech Stack
- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Hosting**:
  - Frontend: **Vercel**
  - Backend: [Render](https://render.com/) or Vercel

---

## 🚀 Local Development
### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Vercel CLI](https://vercel.com/docs/cli)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2️⃣ Install Dependencies
#### Install backend dependencies:
```bash
cd backend
npm install
```

#### Install frontend dependencies
```bash
cd ../frontend
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the backend directory and add:
```
PORT=5000
DATABASE_URL=your_database_url
SESSION_SECRET=your_secret_key
``` 

### 4️⃣ Run Backend
Navigate to the `backend` directory and run:
```bash
cd backend
node server.js
```

### 5️⃣ Deploying on Vercel
1. **Sign in** to [Vercel](https://vercel.com/) and click **New Project**.
2. Select your **GitHub repository**.
3. Set your frontend folder as the **root directory** (`frontend`).
4. Go to **Environment Variables** and add the backend API URL (`NEXT_PUBLIC_BACKEND_URL`).
5. Click **Deploy** and wait for the process to complete.

### 4️⃣ Deploy Backend to Vercel (Alternative: Render)
1. Go to [Vercel](https://vercel.com/) or [Render](https://render.com/).
2. Select your repository and set the **root directory** as `backend`.
3. In **Environment Variables**, add the same variables from `.env`.
4. Deploy and get the **Backend API URL**.

---

## 🚀 Features
✅ **Round-Robin Coupon Distribution**: Ensures fair allocation of coupons.
✅ **Anti-Exploit Measures**: Prevent users from claiming multiple coupons by refreshing.
✅ **User Authentication**: Simple signup and login system.
✅ **Responsive Design**: Works on desktop and mobile devices.
✅ **User Feedback**: Users get real-time notifications on their claim status.

---

## 🚀 Technologies Used
- **Frontend**: Next.js, TypeScript, Tailwind CSS, Zustand (for state management)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Hosting**: Vercel (Frontend) & Render (Backend)
- **Authentication**: Cookie-based session management
- **Real-time Features**: WebSockets for real-time updates
- **Security**: IP Tracking & Cookie-based Session Handling

---

## 🛠 Deployment Steps (Vercel)

### 🖥️ **1. Deploy Backend on Vercel**

1️⃣ Go to **[Vercel](https://vercel.com/)** and log in.
2️⃣ Click on **New Project** and select your GitHub repository.
3️⃣ Choose `backend` as the **root directory**.
4️⃣ Go to **Settings > Environment Variables** and add the following:
   ```plaintext
   PORT=5000
   COOKIE_MAX_AGE=3600000
   # Add other necessary backend environment variables
   ```
5️⃣ Click **Deploy** and copy the generated API URL.

---

### 🌐 **2. Deploy Frontend on Vercel**

1️⃣ Go to **Vercel** and create another **New Project**.
2️⃣ Select your repository and set the **root directory** to `frontend`.
3️⃣ Add an environment variable for the backend URL obtained in step 1:
   ```
   NEXT_PUBLIC_API_URL=your_backend_vercel_url
   ```
4️⃣ Click **Deploy** and wait for Vercel to deploy your frontend.

---

## 🎮 **How It Works**

1️⃣ Users visit the platform and click **Claim Coupon** to receive a coupon.
2️⃣ The system assigns a coupon in a **round-robin manner**.
3️⃣ **Anti-exploit Mechanisms:**
   - Users cannot claim multiple coupons by refreshing the page.
   - The system tracks users via their **IP address** and **browser session cookies**.
4️⃣ If a user tries to claim another coupon too soon, they receive a message with a cooldown timer.
5️⃣ The app provides **real-time feedback** after a claim (success/failure message with remaining wait time).

---

### 📂 **Project Structure**
```
📦 project-root
│
├── 📂 backend   # Express.js server
│   ├── server.js  # Main backend file (Express.js)
│
├── 📂 frontend  # Next.js frontend
│   ├── 📂 public   # Static assets (e.g., favicon, images)
│   ├── 📂 src
│   │   ├── 📂 app         # Main application folder
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   ├── 📂 components
│   │   ├── ui
│   │   ├── ClaimButton.tsx
│   │   ├── CouponList.tsx
│   │   ├── available-coupons.tsx
│   │   ├── claimed-coupons.tsx
│   │   ├── coupon-detail.tsx
│   ├── 📂 hooks
│   ├── 📄 eslint.config.mjs
│   ├── 📄 README.md
```

---

## ⚙️ **How to Run Locally**

### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2️⃣ **Backend Setup**
```bash
cd backend
npm install
