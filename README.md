# 📚 Book Store - Full-Stack Web Application

A modern, full-stack Book Store management system built as part of a Web Development Assessment Task. The application features a secure authentication system, a responsive user interface, and complete CRUD operations to manage book data.

---

## 🚀 Technologies Used

### Frontend
* **React.js** - Component-based UI library.
* **MUI (Material UI)** - Professional UI components and layout styling.
* **React Router** - Single Page Application (SPA) routing and route protection.
* **Axios** - HTTP client for backend API communication.

### Backend & Database
* **Node.js & Express.js** - RESTful API development environment and framework.
* ** MongoDB** - Database layer for scalable and structured data storage.
* **JWT (JSON Web Tokens)** - Secure, stateless user authentication.
* **Bcrypt.js** - Password hashing for secure user registration.

---

## ✨ Features

### 🔐 Authentication Pages
* **Login & Register:** Fully validated forms with clear error handling, password confirmation, and loading states.
* **Protected Routes:** Unauthorized users are restricted from accessing management pages.

### 🏠 Home Page
* **Responsive Layout:** Adaptive design tailored seamlessly for Desktop, Tablet, and Mobile devices.
* **Navigation:** Built with a clean Navbar, Toggle Sidebar/Drawer, and a persistent Footer.
* **Data Fetching:** Dynamically displays available books (Image, Title, Description, and details) directly from the backend API.

### 🛠️ Manage Data Page (CRUD Operations)
* **Create:** Add new books using a validated entry form.
* **Read:** View a clean table or card list of all existing book records.
* **Update:** Modify current book details safely through inline or modal forms.
* **Delete:** Safe removal of entries backed by a mandatory confirmation dialog modal to prevent accidental data loss.


## 📂 Project Directory Structure

```text
Product-System/
├── backend/
│   ├── config/          # Database configuration and environment settings
│   ├── controllers/     # API logic handling CRUD and Authentication
│   ├── middleware/      # Auth protection and validation guards
│   ├── models/          # Database schemas/tables definitions
│   ├── routes/          # REST API endpoints mapping
│   ├── uploads/         # Directory for local stored static files/images
│   └── server.js        # Main entry point for the Express server
└── frontend/
    ├── public/          # Static public assets
    └── src/             # React application source code
        ├── components/  # Reusable UI components (Navbar, Sidebar, Footer, Custom Inputs)
        ├── context/     # Global state management (Authentication and Global states)
        ├── pages/       # Application main views (Login, Register, Home, ManageData)
        ├── routes/      # Routing definitions and protected route setups
        ├── utils/       # Helper functions and Axios API instance configurations
        ├── App.jsx      # Main application component wrapped with routers and providers
        └── index.js     # Rendering entry point for the React DOM
