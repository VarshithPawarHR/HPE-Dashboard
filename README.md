# Storage Forecasting Dashboard 


## 🚀 Getting started with frontend set up

### Requirements

* Node.js 
* A package manager (`npm` or `yarn`)

---

### 🛠️ How to Install Node.js and NPM
#### Windows

1. **Download the Installer**
   
   - Visit [nodejs.org](https://nodejs.org/)  
   - Download the **Windows LTS** version 
2. **Run the Installer**
   
   - Launch the downloaded `.msi` file  
   - Accept the license, use default settings  
   - Ensure **“Add to PATH”** is checked  
   - Click **Install**, then **Finish**  
3. **Verify Installation**
   
   ```bash
   node -v  
   npm -v    

#### Linux
1. **Update your system package list**
   
   ```bash
   sudo apt update
   sudo apt install -y nodejs npm
2.  **Verify Installation**
   
     ```bash
     node -v  
     npm -v 

### 1. Clone the Repository (IDE Terminal e.g., VS Code terminal)

```bash
git clone https://github.com/VarshithPawarHR/HPE-Dashboard
cd HPE-Dashboard
```

### 2. Set Environment Variables

Create a `.env` file inside the HPE-Dashboard folder (refer `.env.example`):

```bash
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/

```

### 3. Install Dependencies (IDE Terminal e.g., VS Code terminal)

```bash
npm install
# or
yarn install
```

### 4. Run the Frontend (IDE Terminal e.g., VS Code terminal)

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

