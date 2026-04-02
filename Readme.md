# Zorvyn FinTech - Finance Data Processing Backend

A robust, scalable backend for a financial dashboard, demonstrating professional API design, Role-Based Access Control (RBAC), and efficient data aggregation. 

## 🚀 Tech Stack
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas, Mongoose ODM
* **Frontend (Bonus):** React, Vite, Tailwind CSS, Recharts

---

## 🧠 Architecture & Design Decisions

### 1. Database Aggregation over Application Logic
To meet the requirement for summary-level analytics, I intentionally avoided fetching all records into the Node.js memory to calculate totals. Instead, I utilized **MongoDB Aggregation Pipelines** (`$match`, `$group`, `$sum`). This ensures the `GET /summary` endpoint remains highly performant and scalable, returning a lightweight JSON payload even if the user has millions of transaction records.

### 2. Role-Based Access Control (RBAC) Middleware
Access control is enforced at the route level using custom Express middleware. 
* **`authenticate`**: Verifies the presence and validity of a user token.
* **`authorizeRoles`**: A factory function that restricts endpoints based on the user's role (Viewer, Analyst, Admin). 
* *Example:* Only an `admin` can `POST /transactions`, while an `analyst` can `GET /summary`.

### 3. Strict Data Validation
The Mongoose schema enforces strict typing, required fields, and ENUM constraints (e.g., `type` must strictly be 'income' or 'expense'). This database-level validation is paired with route-level validation to immediately reject malformed requests with clear `400 Bad Request` messages.

---

## 📌 API Documentation

### Transactions API (`/api/transactions`)

| Method | Endpoint | Allowed Roles | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Viewer, Analyst, Admin | Fetches all transaction records, sorted by newest first. |
| `POST` | `/` | Admin | Creates a new financial record. Requires text, amount, type, and category. |
| `GET` | `/summary` | Analyst, Admin | Returns aggregated dashboard data (Total Income, Total Expense, Net Balance, and Category Breakdown). |

---

## 🤔 Assumptions & Trade-offs

1. **Mock Authentication:** Per the assignment guidelines ("Use mock authentication and local development setup if needed"), I implemented a mock token system in `authMiddleware.js` rather than a full JWT/Bcrypt login flow. This allowed me to focus heavily on the core RBAC logic, route protection, and data aggregation APIs within the given timeframe.
2. **Simplified User Schema:** While a `User` schema exists to define roles and status, the current implementation maps mock tokens directly to user profiles in memory to simulate a decoded session. In a production environment, this would be replaced with an authentication database query.
3. **Frontend Implementation:** While the assignment focuses on the backend, I built a lightweight React frontend to visually prove the backend logic, API consumption, access control, and data visualization (via Recharts) work flawlessly in a real-world scenario.

---

## 💻 How to Run Locally

### Prerequisites
* Node.js (v18+)
* A MongoDB connection URI

### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file and add your MongoDB string: `MONGO_URI=your_connection_string` and `PORT=5000`
    * Copy the `.env.example` file and rename the copy to `.env`.
    * Open your new `.env` file and replace the `MONGO_URI` placeholder with your own MongoDB connection string.
4. Start the server: `npm run start` (or `npm run dev` for nodemon)

### Frontend Setup (Optional)
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the Vite development server: `npm run dev`
4. Open `http://localhost:5173` in your browser.

*(Note: To test RBAC via the UI, the frontend Axios calls are currently hardcoded to pass an `admin` token in the headers).*