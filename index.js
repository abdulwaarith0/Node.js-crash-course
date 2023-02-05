const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const moment = require("moment");
const members = require("./Members")

const app = express();

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}: ${moment().format()}`);
    next();
};

// Handlebars middleware
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// app.set("views", "./views");

// Init middleware
app.use(logger);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get("/", (req, res) => res.render("layouts/index", {
    title: "Member App",
    members
}));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Members API route
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
