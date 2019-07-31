import express from "express";
import session from "express-session";
import cors from "cors";
import errorHandler from "errorhandler";
import mongoose from "mongoose";
import morgan from "morgan";
import Bundler from 'par'

import Articles from './models/Articles'

const isProduction = process.env.NODE_ENV === "production";

const app = express();

// Include parcel as middleware
const bundler = new Bundler()
app.use(bundler.middleware());

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "LightBlog",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

if (!isProduction) {
  app.use(errorHandler());
}

mongoose.connect(
  "mongodb+srv://jlfly12:wZSYV13*Fm@cluster0-jxjdp.mongodb.net/test?retryWrites=true&w=majority"
);
mongoose.set("debug", true);

// Add models


// Add routes
app.use(require("./routes"));

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

const server = app.listen(4000, () =>
  console.log("Server started on http://localhost:4000")
);
