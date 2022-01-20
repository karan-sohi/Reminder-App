const Database = require("../database");
let database = require("../database");

let convertTimeFormat = (date) => {
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  dateArray = date.split('T')[0].split('-')
  convertedDate = dateArray[2];
  convertedMonth = parseInt(dateArray[1]);
  time = date.split('T')[1];
  hour = parseInt(time.split(':')[0]);
  return convertedTime = (hour > 12) ? `${months[convertedMonth]} ${convertedDate} ${hour-12}:${time.split(':')[1]} PM`: `${months[convertedMonth]} ${convertedDate} ${time} AM` 
}

let remindersController = {

  // Show a list of reminders
  list: (req, res) => {
    res.locals.item = "listAll";
    res.render('reminder/index', { reminders: database.cindy.reminders })
  },

  // Show a Create Reminder Page
  new: (req, res) => {
    res.locals.item = "create";
    res.render('reminder/create')
  },

  // Show the details of a Single Reminder
  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    })
    if (searchResult != undefined) {
      res.render('reminder/single-reminder', { reminderItem: searchResult })
    } else {
      res.render('reminder/index', { reminders: database.cindy.reminders })
    }
  },
  
  // Create a reminder
  // ⚠️ TODO: Currently hardcoded to always create a reminder for Cindy only. You need to make this dynamic. 
  create: (req, res) => {     
    let inputTags = req.body.tag.split(",");
    
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      tags: inputTags,
      formattedDate: convertTimeFormat(req.body.date),
      date: req.body.date,
      completed: false
    }
    console.log(reminder)
    database.cindy.reminders.push(reminder);
    res.redirect('/reminders');
  },
  
  // Show the Edit Reminder Page
  edit: (req, res) => {
    // ⭐️ your implementation here ⭐️
    let reminderToEdit = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToEdit;
    })
    res.render('reminder/edit', {reminderItem: searchResult})
  },
  
  // Edit the Reminder
  update: (req, res) => {
    // ⭐️ your implementation here ⭐️
    let inputTags = req.body.tag.split(",");
    let reminderToUpdate = req.params.id;
    let reminder = {
      id: reminderToUpdate,
      title: req.body.title,
      description: req.body.description,
      tags: inputTags,
      formattedDate: convertTimeFormat(req.body.date),
      date: req.body.date,
      completed: false
    }
    if (req.body.completed == 'true') {
      reminder.completed = true
    }
    Database.cindy.reminders[reminderToUpdate-1] = reminder;
    res.redirect('/reminders')

  },

  // Delete the Reminder
  delete: (req, res) => {
    // ⭐️ your implementation here ⭐️
    let reminderToDelete = req.params.id;
    Database.cindy.reminders.splice(reminderToDelete - 1, 1)
    res.redirect("/reminders")
  }
}

module.exports = remindersController;
