let deletableItem;

// Get elements to attach listeners to
const editButton = document.querySelector("#list-edit-button");
const title = document.querySelector("h1 span");
const addButton = document.getElementById("add-item-button");
const listItem = document.getElementsByClassName("list-item")[0];
const deleteButton = [...document.getElementsByClassName("delete-button")];
const deleteButtonModal = document.getElementById("delete-button-modal");
const checkbox = [...document.getElementsByTagName("input")];
const addListButton = document.getElementById('add-list-button');

// Set event listeners
editButton.addEventListener("click", setEditMode);
title.addEventListener("blur", setReadMode);
addButton.addEventListener("click", addItem);
deleteButton.forEach((val, ind, array) => {
  val.addEventListener("click", deleteModal);
});
deleteButtonModal.addEventListener("click", deleteItem);
checkbox.forEach((val, ind, arr) => {
  val.addEventListener("click", setCheckedBehaviour);
});
addListButton.addEventListener('click', addListModal);

// Callback functions for listeners
function setCheckedBehaviour(e) {
  if (e.target.checked) {
    e.target.nextElementSibling.style.textDecoration = "line-through";
    e.target.nextElementSibling.style.color = "#00000077";
  } else {
    e.target.nextElementSibling.style.color = "inherit";
    e.target.nextElementSibling.style.textDecoration = "solid";
  }
}

function setEditMode(e) {
  editButton.style.visibility = "hidden";
  title.contentEditable = true;
  title.style.borderBottom = "1px solid black";
  title.focus();
}

function setReadMode(e) {
  title.contentEditable = false;
  title.style.borderBottom = "";
  editButton.style.visibility = "visible";
}

function addItem(e) {
  let newItem = listItem.cloneNode(true);

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

  // Inserting the element into the DOM
  document
    .getElementsByClassName("list")[0]
    .insertBefore(newItem, document.getElementById("add-item-button"));

  // Placed after the get Elements By Class Name to allow the focusing to happen only after the element has been created
  newItem.querySelector(".item-description").focus();
}

function deleteModal(e) {
  $("#modal-delete").modal("toggle");
  // REFACTOR: Find out if it's possible without using a global variable
  deletableItem = e.target.parentElement.parentElement;
}

function deleteItem(e) {
  deletableItem.remove();
}

function addListModal(e) {
  $("#modal-add-list").modal("toggle");
}