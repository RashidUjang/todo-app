let deletableItem;
let summaryCountTotal = 1; 
let summaryCountChecked = 0; 

// Get elements to attach listeners
const listEditButton = document.querySelector("#list-edit-button");
const title = document.querySelector("h1 span");
const addButton = document.getElementById("add-item-button");
const listItem = [...document.getElementsByClassName("list-item")];
const deleteButton = [...document.getElementsByClassName("delete-button")];
const deleteButtonModal = document.getElementById("delete-button-modal");
const checkbox = [...document.getElementsByTagName("input")];
const addListButton = document.getElementById("add-list-button");
const addListButtonModal = document.getElementById("add-list-button-modal");
const summary = document.getElementById('summary');
const itemEditButton = [...document.getElementsByClassName('edit-button')];
const itemDescription = [...document.getElementsByClassName('item-description')];

// Set event listeners
// Read and edit mode for list title
listEditButton.addEventListener("click", setEditModeTitle);
title.addEventListener("blur", setReadModeTitle);

// Read and edit Mode for item description
itemEditButton.forEach((val, ind, arr) => {
  val.addEventListener('click', setEditModeItem);
})
itemDescription.forEach((val, ind, arr) => {
  val.addEventListener('blur', setReadModeItem);
})

// Delete button and modal
deleteButton.forEach((val, ind, array) => {
  val.addEventListener("click", deleteModal);
});
deleteButtonModal.addEventListener("click", deleteItem);

// Add new list button and modal
addListButton.addEventListener("click", addListModal);
addListButtonModal.addEventListener("click", addList);

addButton.addEventListener("click", addItem);
checkbox.forEach((val, ind, arr) => {
  val.addEventListener("click", setCheckedBehaviour);
});

listItem.forEach((val, ind, arr) => {
  val.addEventListener("mouseenter", showIcon);
  val.addEventListener("mouseleave", hideIcon);
});

// Callback functions for listeners
function setCheckedBehaviour(e) {
  if (e.target.checked) {
    e.target.nextElementSibling.style.textDecoration = "line-through";
    e.target.nextElementSibling.style.color = "#00000077";
    summaryCountChecked++;
    updateSummary();
  } else {
    e.target.nextElementSibling.style.color = "inherit";
    e.target.nextElementSibling.style.textDecoration = "solid";
    summaryCountChecked--;
    updateSummary();
  }
}

function setEditModeTitle(e) {
  listEditButton.style.visibility = "hidden";
  title.contentEditable = true;
  title.style.borderBottom = "1px solid black";
  title.focus();
}

function setReadModeTitle(e) {
  title.contentEditable = false;
  title.style.borderBottom = "";
  listEditButton.style.visibility = "visible";
}

function addItem(e) {
  let newItem = listItem[0].cloneNode(true);

  // Setting up the object
  newItem.querySelector(".item-description").innerHTML = "";
  newItem.querySelector(".item-description").contentEditable = true;

  // REFACTOR: Adding the EventListener, as the EventListener is not automatically attached. Refactor with the below by using event delegation
  // https://stackoverflow.com/questions/15408394/how-to-copy-a-dom-node-with-event-listeners
  newItem
    .querySelector(".delete-button")
    .addEventListener("click", deleteModal);

  newItem
    .getElementsByTagName("input")[0]
    .addEventListener("click", setCheckedBehaviour);
  newItem.getElementsByTagName("input")[0].checked = false;
  newItem.addEventListener("mouseenter", showIcon);
  newItem.addEventListener("mouseleave", hideIcon);

  // Inserting the element into the DOM
  document
    .getElementsByClassName("list")[0]
    .insertBefore(newItem, document.getElementById("add-item-button"));

  // Placed after the get Elements By Class Name to allow the focusing to happen only after the element has been created
  newItem.querySelector(".item-description").focus();

  summaryCountTotal++;
  updateSummary();
}

function deleteModal(e) {
  $("#modal-delete").modal("toggle");
  // REFACTOR: Find out if it's possible without using a global variable
  deletableItem = e.target.parentElement.parentElement;
}

function deleteItem(e) {
  deletableItem.remove();
  summaryCountTotal--;
  
  if (deletableItem.getElementsByTagName('input')[0].checked) {
    summaryCountChecked--;
  }
  
  updateSummary();
}

function addListModal(e) {
  $("#modal-add-list").modal("toggle");
}

function addList(e) {
  console.log("List added!");
}

function showIcon(e) {
  e.target.querySelector(".icon-container").style.visibility = "visible";
}

function hideIcon(e) {
  e.target.querySelector(".icon-container").style.visibility = "hidden";
}

function setEditModeItem(e) {
  e.target.parentElement.previousElementSibling.lastElementChild.contentEditable = true;
  e.target.parentElement.previousElementSibling.lastElementChild.focus();
}

function setReadModeItem(e) {
  e.target.contentEditable = false;
}

// updateSummary() is a function on its own for any future cleanups that may need to happen when updating the value
function updateSummary() {
  summary.innerHTML = `${summaryCountChecked} / ${summaryCountTotal} Completed`;
}
