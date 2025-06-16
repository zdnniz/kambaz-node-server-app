import session from 'express-session';
import "dotenv/config";
import express from 'express';
import mongoose from 'mongoose';
import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import cors from 'cors';
import UserRoutes from './Kambaz/Users/routes.js';
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from './Kambaz/Assignments/routes.js';
import EnrollmentRoutes from './Kambaz/Enrollments/routes.js';

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING ||
"mongodb+srv://zdennis076:Jdxccz159357!@cluster0.ectjfxy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(CONNECTION_STRING);

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://jovial-cupcake-25892c.netlify.app"
];

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

/*
app.use(cors({
    credentials: true,
    //origin: process.env.NETLIFY_URL || "http://localhost:5173",
    origin: (origin, callback) => {
      callback(null, true);
    }
}));
*/

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
    //domain: process.env.NODE_SERVER_DOMAIN,
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