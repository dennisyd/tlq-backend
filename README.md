# The Learning Quarters - Backend API

Node.js/Express backend API for The Learning Quarters tutoring platform.

## Technologies

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **CORS** - Cross-origin resource sharing
- **Nodemon** - Development auto-reload

## Installation

```bash
cd backend
npm install
```

## Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

The server will start on `http://localhost:4000`

### Production Mode

```bash
npm start
```

## API Endpoints

### GET `/api/subjects`

Returns a list of tutoring subjects offered.

**Response:**

```json
{
  "subjects": [
    {
      "id": "k12",
      "title": "K-12 Tutoring",
      "description": "Personalized support in math, reading, science, and writing for every grade."
    }
  ]
}
```

### GET `/api/tutors`

Returns a list of available tutors.

**Response:**

```json
{
  "tutors": [
    {
      "id": "maria-holt",
      "name": "Maria Holt",
      "specialty": "Mathematics",
      "credentials": "M.S. Applied Mathematics, 8 years experience",
      "rating": 4.9,
      "avatar": "https://..."
    }
  ]
}
```

### GET `/api/testimonials`

Returns client testimonials.

**Response:**

```json
{
  "testimonials": [
    {
      "id": "t1",
      "quote": "Our son's grades jumped two letter levels...",
      "name": "Jamie L.",
      "role": "Parent of 9th grader"
    }
  ]
}
```

### POST `/api/consultations`

Submit a consultation request.

**Request Body:**

```json
{
  "name": "Jordan Smith",
  "email": "jordan@email.com",
  "phone": "(555) 222-3344",
  "studentGrade": "7th Grade",
  "subject": "Math",
  "message": "Optional message..."
}
```

**Response (Success):**

```json
{
  "success": true,
  "message": "Consultation request received",
  "consultation": { ... }
}
```

**Response (Error):**

```json
{
  "success": false,
  "message": "Missing required fields",
  "fields": ["name", "email"]
}
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=4000
```

## Project Structure

```
backend/
├── server.js       # Main Express server
├── data.js         # Static data (subjects, tutors, testimonials)
├── package.json    # Dependencies and scripts
└── README.md       # This file
```

## CORS Configuration

The server is configured to accept requests from:

- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000`

Update the CORS configuration in `server.js` if deploying to production.

## Future Enhancements

- Connect to a database (MongoDB, PostgreSQL)
- Add authentication/authorization
- Email notifications for consultation requests
- Admin dashboard for managing tutors and subjects
- File uploads for tutor profiles
