window.onload = displayClock();
function displayClock() {
  var display = new Date().toLocaleTimeString();
  document.getElementById("span").innerHTML = display;
  setTimeout(displayClock, 1000);
}
window.onload = displayDate();
function displayDate() {
  let today = new Date().toLocaleDateString();
  document.getElementById("span1").innerHTML = today;
}

// save to database
const saveToDB = () => {
  const textAreaData = document.querySelectorAll("textarea");
  let data = [];
  console.log(textAreaData);
  textAreaData.forEach((item) => {
    data.push(item.value);
  });
  localStorage.setItem("data", JSON.stringify(data));
};

const addButton = document.querySelector("#add_btn");

const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");

  const htmlData = `
      <div class="operation">
        <button class="save"><i class="fa-solid fa-floppy-disk"></i></button>
        <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
      </div>

      <div class="main ${text ? "" : "hidden"}"></div>
      <textarea class="input ${text ? "hidden" : ""}"></textarea> `;

  note.insertAdjacentHTML("afterbegin", htmlData);
  // console.log(note);

  // getting the referance
  const saveButton = note.querySelector(".save");
  const editButton = note.querySelector(".edit");
  const delButton = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  // delete Node
  delButton.addEventListener("click", () => {
    note.remove();
    saveToDB();
  });

  textArea.addEventListener("change", (event) => {
    const value = event.target.value;
    // console.log(value);
    mainDiv.innerHTML = value;
    saveToDB();
  });

  // toggle Button edit
  textArea.value = text;
  mainDiv.innerHTML = text;

  saveButton.addEventListener("click", () => {
    mainDiv.classList.remove("hidden");
    textArea.classList.add("hidden");
  });
  editButton.addEventListener("click", () => {
    mainDiv.classList.add("hidden");
    textArea.classList.remove("hidden");
  });

  document.body.appendChild(note);
  // append child append a node as the last child of a node.
};

addButton.addEventListener("click", () => {
  addNewNote();
});

// get data from db
var getData = JSON.parse(localStorage.getItem("data"));
if (getData) {
  getData.forEach((item) => {
    console.log(item);
    addNewNote(item);
  });
}
