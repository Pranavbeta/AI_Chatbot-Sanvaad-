# 🚀 AI Chatbot Application  

A full-stack AI chatbot application leveraging **React (Vite), Node.js (Express, TypeScript)** with AI-powered conversational abilities through **Google Gemini** and **OpenRouter.ai (OpenAI)**. Secure authentication, responsive design, and cloud deployment on **Render** make this app seamless to use and scale.

## ✨ Features  

- 🔒 **User Authentication** – Secure user registration, login, and session management.  
- 🌍 **Google OAuth Login** – Easy authentication via Google.  
- 🧠 **AI-Powered Chat** – Dynamic conversations powered by **Google Gemini** (primary) & **OpenRouter.ai/OpenAI** (fallback).  
- 📱 **Responsive UI** – Optimized for mobile and desktop screens.  
- 📦 **Containerized Deployment** – Frontend (Nginx) & Backend Dockerized for consistent deployment.  
- ☁️ **Cloud Hosting** – Deployed on **Render** for scalability and performance.  

---

## 🛠️ Technologies Used  

### **Frontend**  
- ⚛️ **React** – Powerful UI library.  
- ⚡ **Vite** – Lightning-fast development environment.  
- 🎨 **Material-UI (MUI)** – Elegant UI components.  
- 🚏 **React Router DOM** – Smooth navigation within the app.  
- 🔗 **Axios** – Simplified API requests.  
- 🎭 **React Icons** – Modern icons.  
- 🔑 **@react-oauth/google** – Google OAuth integration.  

### **Backend**  
- 🚀 **Node.js** – Efficient JavaScript runtime.  
- ⚡ **Express.js** – Lightweight and flexible web framework.  
- 📝 **TypeScript** – Strongly-typed JavaScript.  
- 📂 **MongoDB** – NoSQL database.  
- 🛡️ **Mongoose** – Simplified MongoDB operations.  
- 🔑 **bcrypt** – Secure password hashing.  
- 🔒 **jsonwebtoken (JWT)** – Authentication via secure tokens.  
- 🍪 **cookie-parser** – HTTP cookie parsing middleware.  
- 📊 **morgan** – Request logging.  
- 📢 **googleapis** – Google API integration.  
- 🤖 **@google/generative-ai** – Google Gemini AI SDK.  

### **AI Models**  
- 🧠 **Google Gemini** – Primary AI model for chat responses.  
- 🔄 **OpenRouter.ai/OpenAI API** – Fallback AI model for chat.  

### **Deployment**  
- 🐳 **Docker** – Containerization of both frontend & backend services.  
- 🚀 **Render** – Cloud hosting & scalability.  
- 🔐 **Cloudflare (Optional)** – Custom domains, CDN, security.  

---

## 🔧 Getting Started  

Follow these instructions to **run the project** locally.

### **Prerequisites**  
Make sure you have the following installed:  
✅ Node.js (v20+)  
✅ npm (v10+)  
✅ MongoDB (local/cloud e.g., MongoDB Atlas)  
✅ Docker (Optional, for containerized local development)  
✅ Git  

### **1️⃣ Clone the Repository**  

```bash
git clone <your-repository-url>
cd AI-chatbot # Or your project directory
```

### **2️⃣ Backend Setup**  

Navigate to the `Backend` directory:  
```bash
cd Backend
```
Install dependencies:  
```bash
npm install
```
Create a `.env` file and add the following variables:  
```env
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret>
COOKIE_SECRET=<Your Cookie Secret>
OPEN_AI_SECRET=<Your OpenAI API Key>
GOOGLE_GEMINI_API_KEY=<Your Google Gemini API Key>
GOOGLE_CLIENT_ID=<Your Google OAuth Client ID>
GOOGLE_CLIENT_SECRET=<Your Google OAuth Client Secret>
FRONTEND_URL=http://localhost:5173
PORT=5005
```
Build and start the backend server:  
```bash
npm run build
npm start
```
Backend runs on: **http://localhost:5005**  

### **3️⃣ Frontend Setup**  

Navigate to the `Frontend` directory:  
```bash
cd Frontend
```
Install dependencies:  
```bash
npm install
```
Create a `.env` file with:  
```env
VITE_APP_BACKEND_URL=http://localhost:5005
```
Start the frontend development server:  
```bash
npm run dev
```
Frontend runs on: **http://localhost:5173**  

### **4️⃣ Running with Docker (Optional)**  

Navigate to the project root directory (where `docker-compose.yml` is located).  
```bash
docker-compose up --build
```
This will spin up **Frontend + Backend** in Docker containers.  

---

## 🚀 Deployment on Render  

### **Backend Deployment**  
- **Deploy as**: Web Service  
- **Root Directory**: `Backend/`  
- **Runtime**: Docker  
- **Port**: `5005`  
- **Build Command**: *(Handled by Dockerfile)*  
- **Set Environment Variables**: As per `.env`  

### **Frontend Deployment**  
- **Deploy as**: Static Site  
- **Root Directory**: `Frontend/`  
- **Build Command**: `npm run build`  
- **Publish Directory**: `dist`  
- **Set Environment Variables**: `VITE_APP_BACKEND_URL` (Point to Backend service URL)  
- **Add Rewrite Rule:**  
  - **Source Path**: `/*`  
  - **Destination Path**: `/index.html`  
  - **Action**: `Rewrite`  
  - **Status Code**: `200`

Project runs on render : https://sanvaad-frontend.onrender.com


## 🤝 Contributing  

Pull requests are welcome! For major changes, please open an issue first.  

---

## 📜 License  

This project is licensed under the **MIT License** – see `LICENSE.md` for details.  
 
