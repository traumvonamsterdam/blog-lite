import express from "express";
import session from "express-session";
import cors from "cors";
import errorHandler from "errorhandler";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import Bundler from "parcel-bundler";

// Import routes and register models
import routes from "./routes";
require("./models/Articles");

const isProduction = process.env.NODE_ENV === "production";

const app = express();

// Add routes
app.use(routes);

// Include parcel as middleware
// const bundler = new Bundler();
// app.use(bundler.middleware());

// Other middleware
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
  "mongodb+srv://jlfly12:wZSYV13*Fm@cluster0-jxjdp.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

mongoose.set("debug", true);

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

app.listen(4000, () => console.log("Server started on http://localhost:4000"));
