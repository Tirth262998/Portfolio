# Interactive Multi-Page Portfolio Website using React + Node.js/Express

## Project Overview

This project is an **Interactive Multi-Page Portfolio Website** built with **React 18**, **React Router DOM 6**, **Vite**, **Node.js**, and **Express.js**.

The application was initially developed as an HTML5/CSS3 portfolio in Assignment 1 and was converted and extended into a React-based application in Assignment 2. Assignment 3 further extends the existing React frontend by adding a **Node.js/Express backend** and integrating the frontend with backend APIs.

The application preserves the original visual design, typography, responsiveness, and accessibility while implementing modular functional React components, interactive state management (`useState`), side-effects (`useEffect`), browser persistence (`localStorage`), client-side multi-page routing, backend API integration, server-side validation, JSON-file persistence, CORS, and centralized error handling.

### Assignment 3 Backend

The backend is located inside the `/server` folder of the same repository and provides:

- Backend health check
- Project listing API
- Individual project detail API
- Contact form submission API
- Contact submission retrieval API
- Server-side input validation
- JSON-file based data persistence
- CORS configuration
- Centralized 404 error handling
- Global 500 error handling
- Deliberate error testing endpoint

The React frontend communicates with the Express backend using the native `fetch()` API.

---

# Setup and Run Instructions

Ensure you have **Node.js (v18+)** installed.

The project contains two parts:

- React frontend
- Node.js/Express backend

Both servers should be running during development for full Assignment 3 functionality.

---

## Frontend Setup

### 1. Install Frontend Dependencies

From the project root:

```bash
npm install
```

### 2. Run Frontend Development Server

```bash
npm run dev
```

The React application runs at:

```text
http://localhost:5173/
```

### 3. Build for Production

```bash
npm run build
```

This generates production-ready optimized assets inside the `dist/` directory.

---

# Backend Setup

The backend is located inside the `/server` directory.

### 1. Open the Server Directory

From the project root:

```bash
cd server
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `/server` directory.

Example:

```env
PORT=5000
DATA_FILE_PATH=./data
ALLOWED_ORIGIN=http://localhost:5173
```

A `.env.example` file is also provided in the `/server` directory as a template.

### 4. Start the Backend

```bash
npm start
```

The backend runs at:

```text
http://localhost:5000
```

### 5. Backend Health Check

Open:

```text
http://localhost:5000/
```

Expected response:

```json
{
  "message": "Portfolio backend is running"
}
```

---

# Environment Variables

The backend uses environment variables through `dotenv`.

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port on which the Express server runs | `5000` |
| `DATA_FILE_PATH` | Directory containing JSON data files | `./data` |
| `ALLOWED_ORIGIN` | Allowed frontend origin for CORS | `http://localhost:5173` |

The `.env` file is used for local configuration and should not be committed to the repository.

The repository contains a `.env.example` file showing the required variables.

---

# Project Structure

```text
Portfolio/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ProjectInfo.jsx
│   │   └── ContactForm.jsx
│   │
│   ├── data/
│   │   └── projects.js
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   ├── ProjectDetail.jsx
│   │   └── NotFound.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── server/
│   ├── data/
│   │   ├── projects.json
│   │   └── contacts.json
│   │
│   ├── .env.example
│   ├── .gitignore
│   ├── index.js
│   └── package.json
│
├── images/
├── dist/
├── package.json
└── README.md
```

> **Note:** `src/data/projects.js` is retained from Assignment 2 for the existing project structure, but the Projects and ProjectDetail pages in Assignment 3 obtain project data from the backend API.

---

# Component Tree

```text
App (Theme useState, localStorage useEffect, React Router)
│
├── Navbar (Header gradient, profile image, navigation links, theme toggle button)
│
├── main (Routed Page Content via <Routes>)
│   ├── Home (/Home, loading spinner useEffect)
│   ├── About (/about, bio & skills list)
│   ├── Projects (/projects, fetches project data from backend API)
│   │   └── ProjectCard (independent showDetails useState toggle)
│   │       └── ProjectInfo (2-level prop drilling: receives title & tech)
│   ├── Contact (/contact, page container)
│   │   └── ContactForm (controlled input useState, validation and API submission)
│   ├── ProjectDetail (/projects/:projectId, dynamic route via useParams())
│   └── NotFound (*, catch-all 404 page)
│
└── Footer (Shared footer component)
```

---

# State-Lifting & State Management Decisions

### 1. Theme State (`App.jsx`)

- **Decision:** Lifted to `App.jsx` because theme affects the top-level layout (`document.body`) and must persist across all pages.
- **Sharing:** Passed down to `<Navbar />` via props (`theme`, `onThemeToggle`).
- **Persistence:** Stored in browser `localStorage`.

### 2. Contact Form State (`ContactForm.jsx`)

The contact form maintains its state locally because the form input data and validation errors are relevant only during form interaction.

The component manages:

- Form field values
- Touched state
- Validation errors
- Submission status
- Backend submission error

After a successful backend submission, the form fields are reset.

### 3. ProjectCard State (`ProjectCard.jsx`)

State is kept local to each `ProjectCard` instance through `showDetails`.

Clicking **View Details** on one card expands only that card without affecting the other project cards.

### 4. Projects API State (`Projects.jsx`)

The Projects page maintains:

- `projects` — stores project data received from the backend
- `loading` — tracks API loading state
- `error` — stores API failure information

### 5. Project Detail API State (`ProjectDetail.jsx`)

The ProjectDetail page maintains:

- `project` — stores the selected project received from the backend
- `loading` — tracks API loading state
- `error` — handles invalid project IDs and API failures

---

# useEffect Hooks

### 1. Home Loading Effect (`src/pages/Home.jsx`)

- **Location:** `Home.jsx`
- **Dependency Array:** `[]` (mount only)
- **Purpose:** Displays a temporary "Loading Home..." status indicator for approximately 1 second when Home mounts.
- **Cleanup:** Uses `return () => clearTimeout(timer);` to prevent state updates on an unmounted component.

### 2. Theme Persistence Effect (`src/App.jsx`)

- **Location:** `App.jsx`
- **Dependency Array:** `[theme]`
- **Purpose:** Synchronizes the React `theme` state with browser `localStorage` and updates the `data-theme` attribute on `document.body`.
- **Initialization:** State is initialized synchronously using `useState(() => localStorage.getItem("theme") || "light")` to prevent a flash on reload.

### 3. Projects API Fetch Effect (`src/pages/Projects.jsx`)

- **Location:** `Projects.jsx`
- **Dependency Array:** `[]`
- **Purpose:** Fetches project data from the backend when the Projects page mounts.
- **API:** `GET /api/projects`
- **Behavior:** Updates `projects` state on success and displays an error message if the backend request fails.
- **Loading:** Displays a loading message while the API request is in progress.

### 4. Project Detail API Fetch Effect (`src/pages/ProjectDetail.jsx`)

- **Location:** `ProjectDetail.jsx`
- **Dependency Array:** `[projectId]`
- **Purpose:** Fetches the project corresponding to the ID in the URL.
- **API:** `GET /api/projects/:id`
- **Behavior:** Re-fetches when the `projectId` changes.
- **Invalid ID:** Displays a clear "Project Not Found" state when the backend returns a 404 response.

---

# Routing Architecture

Implemented using `react-router-dom`.

| Route | Description |
|---|---|
| `/` | Redirects to canonical `/Home` route |
| `/Home` | Home page with 1-second loading splash |
| `/about` | About page |
| `/projects` | Projects page fetching project data from backend |
| `/contact` | Contact page with controlled contact form |
| `/projects/:projectId` | Dynamic project detail route using `useParams()` and backend API |
| `*` | Catch-all 404 Not Found page |

### Project Detail Routing

The `/projects/:projectId` route uses `useParams()` to obtain the project ID.

The ID is then used to request:

```text
GET /api/projects/:id
```

The project details are fetched from the backend API.

The route supports direct navigation and browser refresh, allowing URLs such as:

```text
http://localhost:5173/projects/1
```

to load the corresponding project directly.

---

# Backend API

The backend is implemented using **Node.js + Express.js**.

Base URL:

```text
http://localhost:5000
```

## API Endpoint Summary

| ID | Method | Endpoint | Purpose |
|---|---|---|---|
| B1 | GET | `/` | Backend health check |
| B2 | GET | `/api/projects` | Retrieve all projects |
| B3 | GET | `/api/projects/:id` | Retrieve one project |
| B4 | POST | `/api/contact` | Submit contact form |
| B5 | GET | `/api/contact` | Retrieve stored contact submissions |
| B6 | GET/ANY | Undefined route | Test centralized 404 handling |
| B7 | GET | `/api/test-error` | Test centralized 500 error handling |

---

# B1 — Health Check

### Request

```http
GET /
```

### cURL

```bash
curl.exe -i http://localhost:5000/
```

### Success Response

**Status:** `200 OK`

```json
{
  "message": "Portfolio backend is running"
}
```

### Failure / Availability Test

B1 does not require request-body validation.

If the backend server is stopped, the following command demonstrates that the service is unavailable:

```bash
curl.exe -i http://localhost:5000/
```

The request fails because no backend server is listening on port `5000`.

---

# B2 — Get All Projects

### Request

```http
GET /api/projects
```

### cURL

```bash
curl.exe -i http://localhost:5000/api/projects
```

### Success Response

**Status:** `200 OK`

Example:

```json
[
  {
    "id": 1,
    "title": "BackToOwner – Lost & Found Management System",
    "description": "...",
    "techStack": ["MongoDB", "Express.js", "React", "Node.js"],
    "image": "...",
    "link": "#"
  }
]
```

The actual response contains all projects stored in:

```text
server/data/projects.json
```

### Failure Case

An invalid API path verifies the centralized 404 handling:

```bash
curl.exe -i http://localhost:5000/api/project
```

**Expected Status:**

```text
404 Not Found
```

**Expected Response:**

```json
{
  "error": "Route not found"
}
```

---

# B3 — Get Project by ID

### Request

```http
GET /api/projects/:id
```

### cURL — Valid ID

```bash
curl.exe -i http://localhost:5000/api/projects/1
```

### Success Response

**Status:** `200 OK`

The response contains the project whose ID is `1`.

### Failure Case — Invalid Project ID

```bash
curl.exe -i http://localhost:5000/api/projects/999999
```

**Expected Status:**

```text
404 Not Found
```

**Expected Response:**

```json
{
  "error": "Project not found"
}
```

---

# B4 — Submit Contact Form

### Request

```http
POST /api/contact
Content-Type: application/json
```

### cURL — Valid Submission

```bash
curl.exe -i -X POST http://localhost:5000/api/contact -H "Content-Type: application/json" -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"message\":\"Testing Assignment 3 contact API\"}"
```

### Success Response

**Status:** `201 Created`

The valid submission is persisted in:

```text
server/data/contacts.json
```

### Failure Case — Missing Required Field

```bash
curl.exe -i -X POST http://localhost:5000/api/contact -H "Content-Type: application/json" -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"message\":\"\"}"
```

**Expected Status:**

```text
400 Bad Request
```

The server returns a JSON validation error indicating the missing message field.

### Failure Case — Invalid Email

```bash
curl.exe -i -X POST http://localhost:5000/api/contact -H "Content-Type: application/json" -d "{\"name\":\"Test User\",\"email\":\"invalid-email\",\"message\":\"Testing invalid email\"}"
```

**Expected Status:**

```text
400 Bad Request
```

The server rejects the invalid email address.

---

# B5 — Get Contact Submissions

### Request

```http
GET /api/contact
```

### cURL

```bash
curl.exe -i http://localhost:5000/api/contact
```

### Success Response

**Status:** `200 OK`

Example:

```json
[
  {
    "name": "Test User",
    "email": "test@example.com",
    "message": "Testing Assignment 3 contact API"
  }
]
```

The endpoint returns the contact submissions stored in:

```text
server/data/contacts.json
```

### Access

This endpoint is intentionally **open and does not require authentication**, as required by the assignment.

### Failure Case

An invalid API path can be used to verify centralized 404 handling:

```bash
curl.exe -i http://localhost:5000/api/contacts
```

**Expected Status:**

```text
404 Not Found
```

**Expected Response:**

```json
{
  "error": "Route not found"
}
```

---

# B6 — Undefined Route / 404 Error Handling

B6 verifies that undefined routes are handled by centralized 404 middleware.

### cURL

```bash
curl.exe -i http://localhost:5000/api/unknown
```

### Expected Response

**Status:** `404 Not Found`

```json
{
  "error": "Route not found"
}
```

### Additional Test

```bash
curl.exe -i http://localhost:5000/invalid-route
```

Both undefined routes should return the centralized JSON 404 response.

---

# B7 — Deliberate Server Error / 500 Error Handling

The `/api/test-error` endpoint intentionally generates an error to verify the global error-handling middleware.

### cURL

```bash
curl.exe -i http://localhost:5000/api/test-error
```

### Expected Response

**Status:** `500 Internal Server Error`

```json
{
  "error": "Internal Server Error"
}
```

The global error middleware catches the error and returns a JSON response.

### Server Survival Check

After executing the deliberate error request, verify that the server is still running:

```bash
curl.exe -i http://localhost:5000/
```

Expected:

```text
HTTP/1.1 200 OK
```

This confirms that the deliberate error does not crash the server.

---

# API Test Coverage Summary

| ID | Endpoint | Method | Success Test | Failure/Error Test |
|---|---|---|---|---|
| B1 | `/` | GET | Health check → 200 | Server unavailable |
| B2 | `/api/projects` | GET | Project array → 200 | Invalid route → 404 |
| B3 | `/api/projects/:id` | GET | Valid project → 200 | Invalid ID → 404 |
| B4 | `/api/contact` | POST | Valid submission → 201 | Missing field / invalid email → 400 |
| B5 | `/api/contact` | GET | Stored contacts → 200 | Invalid route → 404 |
| B6 | Undefined route | GET/ANY | Centralized error handling | 404 JSON response |
| B7 | `/api/test-error` | GET | Error middleware triggered | 500 JSON response |

The cURL commands above provide coverage for all seven required backend endpoints (B1–B7), including failure/error cases for the validated endpoints.

---

# Backend Data Persistence

The backend uses JSON files for simple persistence.

### Project Data

```text
server/data/projects.json
```

Stores the project information returned by:

```text
GET /api/projects
GET /api/projects/:id
```

### Contact Data

```text
server/data/contacts.json
```

Stores valid contact-form submissions received through:

```text
POST /api/contact
```

and returned through:

```text
GET /api/contact
```

No database or ORM is required for this assignment.

---

# Frontend ↔ Backend Data Flow

## Projects Page

```text
Projects.jsx
     │
     │ fetch()
     ▼
GET /api/projects
     │
     ▼
Express Backend
     │
     ▼
server/data/projects.json
     │
     ▼
JSON Response
     │
     ▼
projects state
     │
     ▼
ProjectCard components
```

The project cards are rendered using data received from the backend API.

---

## Project Detail Page

```text
/projects/:projectId
        │
        ▼
useParams()
        │
        ▼
GET /api/projects/:id
        │
        ▼
Express Backend
        │
        ▼
projects.json
        │
        ▼
Project JSON Response
        │
        ▼
project state
        │
        ▼
ProjectDetail UI
```

This allows project detail pages to work through direct URLs and browser refreshes.

---

## Contact Form

```text
ContactForm
     │
     │ fetch()
     ▼
POST /api/contact
     │
     ▼
Express Validation
     │
     ▼
contacts.json
     │
     ▼
201 Created
     │
     ▼
Success message + form reset
```

If the backend is unavailable or returns an error, the frontend displays an error message to the user.

---

# CORS Configuration

The backend uses the `cors` package to allow requests from the React development server.

The allowed origin is configured using:

```env
ALLOWED_ORIGIN=http://localhost:5173
```

This allows the frontend running on port `5173` to communicate with the Express backend running on port `5000`.

---

# Error Handling

The application implements error handling at both the frontend and backend levels.

## Frontend

The React frontend displays appropriate states for:

- API loading
- API failure
- Invalid project ID
- Contact submission failure
- Backend unavailable

When the backend is stopped, the Projects page displays an appropriate error message instead of silently failing.

## Backend

The Express backend provides:

- JSON 404 response for undefined routes
- JSON 500 response through global error middleware
- Server-side contact-form validation
- Invalid project ID handling
- Deliberate error endpoint for testing

---

# Loading and Error States

The frontend provides visible feedback during asynchronous operations.

### Projects Page

Displays:

```text
Loading projects...
```

while project data is being fetched.

If the backend cannot be reached, an error message is displayed to the user:

```text
Unable to load projects. Please make sure the backend server is running.
```

### Project Detail

Displays:

```text
Loading project...
```

while the selected project is being fetched.

If an invalid project ID is requested, the page displays:

```text
Project Not Found
```

along with a link back to the Projects page.

### Contact Form

After a successful submission:

- A success message is displayed.
- Form fields are reset.

If the backend request fails, the error message is displayed to the user.

---

# Styling & Responsiveness

- **CSS Custom Properties:** `:root` variables `--primary-color`, `--secondary-color`, `--background-color`, and `--text-color` with `[data-theme="dark"]` overrides.
- **Layouts:** Flexbox for single-dimension navigation/header items and CSS Grid for 3-column project cards.
- **Responsive Breakpoints:**
  - Desktop: > 768px (3-column grid)
  - Tablet: ≤ 768px (2-column grid, stacked header)
  - Mobile: ≤ 480px (1-column grid, stacked navigation)

The Assignment 3 backend integration does not change the existing responsive visual design of the Assignment 2 frontend.

---

# Accessibility

The application preserves the accessibility features implemented in Assignment 2, including:

- Semantic HTML elements
- Accessible navigation
- Form labels
- Button elements for interactive actions
- `aria-expanded` for the project details toggle
- `role="alert"` for displayed submission errors
- Keyboard-accessible controls
- Responsive layouts

---

# Testing and Verification

The Assignment 3 implementation was tested for both backend and frontend behavior.

## Backend Tests

The following were verified:

- [x] `GET /` health check returns `200`
- [x] `GET /api/projects` returns project array
- [x] `GET /api/projects/:id` returns a valid project
- [x] Invalid project ID returns `404`
- [x] `POST /api/contact` accepts valid submissions
- [x] Missing contact fields return `400`
- [x] Invalid email returns `400`
- [x] `GET /api/contact` returns stored submissions
- [x] Undefined route returns JSON `404`
- [x] Deliberate error returns JSON `500`
- [x] Server remains running after deliberate error
- [x] CORS configuration verified
- [x] All B1–B7 endpoints covered using cURL commands

## Frontend Regression Tests

The following were verified:

- [x] Home page
- [x] Navbar and routing
- [x] Catch-all 404 page
- [x] Theme switching and persistence
- [x] Projects page API integration
- [x] Project detail API integration
- [x] Direct project-detail URL
- [x] Browser refresh on project-detail page
- [x] Invalid project ID state
- [x] Contact form validation
- [x] Successful contact submission
- [x] Contact form reset after successful submission
- [x] Backend failure state
- [x] Browser console checked for unhandled errors
- [x] Production build using `npm run build`

---
# Known Limitations

- Contact submissions are stored in a local JSON file rather than a production database.
- The contact API is intentionally open and does not use authentication, as required by the assignment.
- External project links may use placeholder anchor references (`#`) where live URLs were not provided.
- The backend is intended for local development and assignment demonstration rather than production deployment.

---

# Assignment 2 Features Preserved

Assignment 3 extends the Assignment 2 implementation without removing its core functionality.

The following Assignment 2 features remain available:

- Functional React components
- React Hooks
- Reusable components
- ProjectCard component
- ProjectInfo component
- Two-level prop drilling
- Theme state management
- Theme persistence using `localStorage`
- React Router navigation
- Dynamic project-detail routing
- Contact form validation
- Responsive design
- Accessibility features
- Catch-all 404 page
- Production build using Vite

Assignment 3 adds backend API integration and server-side functionality on top of these existing features.

---

# Command Summary

## Frontend

From the project root:

```bash
npm install
npm run dev
npm run build
```

Frontend:

```text
http://localhost:5173
```

## Backend

From the project root:

```bash
cd server
npm install
npm start
```

Backend:

```text
http://localhost:5000
```

