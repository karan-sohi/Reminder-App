const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller")

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

app.set("view engine", "ejs");

// Site Routes start here

// Get a Register User Page
// app.get("/register", reminderController.registerNew)
app.get("/register", authController.registerNew)
app.post("/register", authController.register)


//Get a Login page user
app.get("/login", authController.loginNew)
app.post("/login", authController.login)

// Get a list of all reminders
app.get("/reminders", reminderController.list)

// Create a Reminder
app.get("/reminder/new", reminderController.new)
app.post("/reminder/", reminderController.create)

// Show one single reminder
app.get("/reminder/:id", reminderController.listOne)

// Edit a reminder
app.get("/reminder/:id/edit", reminderController.edit) // Show the page to edit a reminder
app.post("/reminder/update/:id", reminderController.update) // Edit the reminder

// Delete a reminder
app.post("/reminder/delete/:id", reminderController.delete)


app.listen(3000, function () {
  console.log("Server running. Visit: localhost:3000/reminders in your browser 🚀");
});
