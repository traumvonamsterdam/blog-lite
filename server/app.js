import express from "express";
import session from "express-session";
import cors from "cors";
import errorHandler from "errorhandler";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";

import routes from "./routes";
import httpErrorHandling from "./handling/httpErrorHandling";

const isProduction = process.env.NODE_ENV === "production";

const app = express();

// Add routes
app.use(routes);

// Other middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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
} else {
  app.use(express.static(path.join(__dirname, "client/dist")));
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
}

mongoose.connect(
  "mongodb+srv://jlfly12:wZSYV13*Fm@cluster0-jxjdp.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

mongoose.set("debug", true);

httpErrorHandling(app, isProduction);

if (isProduction) {
  app.listen(process.env.PORT);
} else {
  app.listen(4000, () =>
    console.log(`Server started on http://localhost:4000`)
  );
}
