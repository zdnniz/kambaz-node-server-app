import session from 'express-session';
import "dotenv/config";
import express from 'express';
import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import cors from 'cors';
import UserRoutes from './Kambaz/Users/routes.js';
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from './Kambaz/Assignments/routes.js';
import EnrollmentRoutes from './Kambaz/Enrollments/routes.js';

const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:5173",
}));


const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'lax',
    secure: false
  }
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}

/*
const isDev = process.env.NODE_ENV === "development";

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "lax",
    secure: false, 
  },
};

if (!isDev) {
  sessionOptions.proxy = true;
  sessionOptions.cookie.domain = process.env.NODE_SERVER_DOMAIN;
}*/

app.set("trust proxy", 1);
app.use(session(sessionOptions));

app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
EnrollmentRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app)
Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000);