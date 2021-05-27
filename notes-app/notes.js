const fs = require("fs");
const chalk = require("chalk");
const { title } = require("process");
const getNotes = () => {
  return "Your notes...";
};
////add
const addNote = (title, body) => {
  const notes = loadNotes();
  // const duplicateNotes = notes.filter((note) => note.title === title);
  const duplicateNote = notes.find((note) => note.title === title);

  debugger;

  // const duplicateNotes = notes.filter(function (note) {
  //   return note.title === title;
  // });
  console.log(duplicateNote);
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green("New note added!"));
  } else {
    console.log(chalk.red("Note title taken!"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};
//////remove
const removeNote = (title) => {
  const remov = loadNotes1();
  const duplicateRemov = remov.filter((note) => note.title !== title);

  // const duplicateRemov = remov.filter(function (note) {
  //   return note.title !== title;
  // });
  removNotes(duplicateRemov);
  if (remov.length > duplicateRemov.length) {
    console.log(chalk.green.inverse(" note found!"));
    removNotes(duplicateRemov);
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};
const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.inverse("Your notes"));

  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse("Note not found"));
  }
};

const removNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes1 = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
