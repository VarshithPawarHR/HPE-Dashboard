# 🖥️ Storage Forecasting Dashboard – Frontend (Next.js + TypeScript)

## ⚠️ Read This First – Limitations & Scope

This frontend is part of a larger **Proof of Concept (POC)** project for predicting file storage consumption using machine learning.

**Important:** The ML models powering this dashboard are trained on data specific to our internal storage system. **They are not generic models** that can be applied to any system without retraining. Storage usage behavior is unique to each environment, and your system will need its own models.

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

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js: **v18.x**
- Package Manager: **npm** or **yarn**

### 📦 Install Dependencies

```bash
npm install
# or
yarn install


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

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
