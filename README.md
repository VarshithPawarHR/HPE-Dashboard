# Storage Forecasting Dashboard – Frontend (Next.js + TypeScript)

## Read This First – Limitations & Scope

This frontend is part of a larger **Proof of Concept (POC)** project for  predicting file storage consumption using machine learning.

**Important:** The ML models powering this dashboard are trained on data specific to our internal storage system. **They are not generic models** that cannot be applied to any system without retraining. Storage usage behavior is unique to each environment, and your system will need its own models.

**The ML models built here are NOT direct to use or sell for systems.** You cannot expect them to work on just any storage setup. Machine Learning models are *context-specific* — they learn patterns from the system they're trained on.


---

## 🧠 What This Project Is

This frontend serves as a user interface for visualizing:

- Real-time storage usage
- Forecast predictions for:
  - 📅 Next Day
  - 📈 Next Week
  - 📆 Next Month
  - 📊 Next 3 Months

Built using **Next.js** and **TypeScript**, the UI is clean, responsive, and fast.

---

## 🌐 Key Features

- Real-time dashboard with auto-refreshing data
- Graphs and stats per directory
- Time-series visualizations of predicted usage
- Responsive design for both desktop and mobile
- Integrated with backend APIs (FastAPI)

---

## 🌐 Backend Overview

The backend is built using *fastapi*  offering:

- Live data ingestion and synthetic data simulation  
- Storage forecasting using hybrid models consisting of *LSTM,GRU,conv1D*  
- API services consumed by the frontend  
- MongoDB database integration

To set up the backend, see the `https://github.com/VarshithPawarHR/HPE-StoragePrediction`.

---


## 🚀 Getting Started

### Requirements

* Node.js **v18**
* A package manager (`npm` or `yarn`)

### 1. Clone the Repository

```bash
git clone https://github.com/VarshithPawarHR/HPE-Dashboard
cd HPE-Dashboard
```

### 2. Set Environment Variables

Create a `.env` file inside the HPE-Dashboard folder (refer `.env.example`):

```bash
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/

```

### 3. Install Dependencies

```bash
npm install
# or
yarn install
```

### 4. Run the Frontend

```bash
npm run dev
# or
yarn dev
```

Dashboard will be available at: `http://localhost:3000`

---

## Summary

* **Backend** runs on `http://127.0.0.1:8000`
* **Frontend** runs on `http://localhost:3000`
* Connected via REST APIs

Once both are running, navigate to the dashboard to view real-time storage forecasts.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
