import express from "express";
import session from "express-session";
import cors from "cors";
import errorHandler from "errorhandler";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import "dotenv/config";

import routes from "./routes";
import httpErrorHandling from "./handling/httpErrorHandling";

const isProduction = process.env.NODE_ENV === "production";

const app = express();

// Add middleware
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

// Add routes (must be done AFTER cors is applied)
app.use(routes);

if (!isProduction) {
  app.use(errorHandler());
}
app.use(express.static(path.join(__dirname, "client/dist")));
app.get("/", (req, res) => {
  res.render("index", {
    title: "Homepage"
  });
});

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${
    process.env.MONGODB_PASSWORD
  }@cluster0-jxjdp.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

mongoose.set("debug", true);

httpErrorHandling(app, isProduction);

if (isProduction) {
  app.listen(process.env.PORT);
} else {
  app.listen(4000, () => console.log("Server running on PORT 4000"));
}
