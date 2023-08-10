const btnElement = document.getElementById("btn");
const appElement = document.getElementById("app");

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  appElement.insertBefore(noteElement, btnElement);
});

function createNoteElement(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "Empty Note";
  element.value = content;

  element.addEventListener("dblclick", () => {
    const warning = confirm("Do You Want To Delete This Note?");
    if (warning) {
      deleteNote(id, element);
    }
  });

  element.addEventListener("input", () => {
    updateNote(id, element.value);
  });

  return element;
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);
  saveNoteOnLocal(notes);
  appElement.removeChild(element);
}

function updateNote(id, content) {
  let notes = getNotes();
  const target = notes.filter((note) => note.id == id)[0];
  target.content = content;
  saveNoteOnLocal(notes);
}

function addNote() {
  const notes = getNotes();

  const noteObj = {
    id: Math.floor(Math.random() * 10000),
    content: "",
  };

  const noteElement = createNoteElement(noteObj.id, noteObj.content);
  appElement.insertBefore(noteElement, btnElement);
  notes.push(noteObj);

  saveNoteOnLocal(notes);
}

function saveNoteOnLocal(note) {
  localStorage.setItem("note", JSON.stringify(note));
}

function getNotes() {
  return JSON.parse(localStorage.getItem("note")) || [];
}

btnElement.addEventListener("click", addNote);
