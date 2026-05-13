# Full Stack Programming Lab - Lab 12 MERN Stack Next Js "Ecommerce Dynamic app"

**Name:** [Your Name]
**Registration Number:** [Your Reg No]
**Class:** BSSE-VI-B & A
**Instructor:** Mr. Sharif Hussain

## 1. Lab Objectives
The objective of this lab is to develop a complete and dynamic eCommerce website using Next.js, Node.js, Express.js, and MongoDB based on a provided mock template.

## 2. Project Architecture and Setup
The project follows a standard MERN stack architecture with Next.js serving as the React frontend framework. The project is split into two main directories:
- `backend`: Node.js, Express.js API, and MongoDB connection.
- `frontend`: Next.js frontend with Tailwind CSS.

### 2.1 Backend Implementation
The backend exposes RESTful APIs to serve product data to the frontend.
- **Dependencies:** `express`, `mongoose`, `cors`, `dotenv`.
- **Database:** Connected to MongoDB using Mongoose. Since MongoDB Compass is a requirement, the connection URL defaults to `mongodb://127.0.0.1:27017/rustikplank`.
- **Models:** A `Product` model is created to store product details (title, price, image, category, type).
- **Seed Script:** A script (`seed.js`) was created to populate the local database with initial dummy data matching the design template so the application has functional content immediately.

### 2.2 Frontend Implementation
The frontend is a responsive Next.js application styled with Tailwind CSS to perfectly match the provided mock design.
- **Dependencies:** Next.js App Router, Tailwind CSS, Lucide React (for icons).
- **Components:** Created reusable components including `Header`, `Hero`, `ProductCard`, `HotDeal`, `LatestUpdates`, and `Footer`.
- **Data Fetching:** The frontend fetches dynamic product data from the Express backend via `fetch` API in Next.js Server Components.
- **Styling:** Tailwind CSS was configured with custom colors and fonts to achieve a premium aesthetic aligned with the design files.

## 3. How to Run the Project
1. **Database:** Open MongoDB Compass and ensure the local MongoDB server is running on port `27017`.
2. **Backend:**
   - Navigate to the `backend` folder.
   - Run `npm install`.
   - Run `npm run seed` to populate the database with mock products.
   - Run `npm run dev` to start the Express API on port 5000.
3. **Frontend:**
   - Navigate to the `frontend` folder.
   - Run `npm install`.
   - Run `npm run dev` to start the Next.js app on port 3000.
   - Open `http://localhost:3000` in the browser.

## 4. Screenshots of the Output
*(Insert screenshots of the frontend application running locally here)*
1. Header & Hero Section
2. Product Tabs (Featured, Special, Popular)
3. Hot Deals & Categories
4. Footer

## 5. GitHub Repository URL
**Repository Link:** [Insert your GitHub URL here]
