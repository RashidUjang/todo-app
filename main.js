// Get elements to attach listeners to
const editButton = document.querySelector('#list-edit-button');
const title = document.querySelector('h1 span');
const addButton = document.getElementById('add-item-button');
const listItem = document.getElementsByClassName('list-item')[0];
const deleteButton = [...document.getElementsByClassName('delete-button')];

// Set event listeners
editButton.addEventListener('click', setEditMode);
title.addEventListener('blur', setReadMode);
addButton.addEventListener('click', addItem);
deleteButton.forEach((val, ind, array) => {
    console.log(val);
    val.addEventListener('click', deleteItem);
});

// Callback functions for listeners
function setEditMode(e) {
    title.contentEditable = true;
    title.style.borderBottom = '1px solid black';
    title.focus();
}

function setReadMode(e) {
    title.contentEditable = false;
    title.style.borderBottom = '';
}

function addItem(e) {
    let newItem = listItem.cloneNode(true);

    newItem.querySelector('.item-description').innerHTML = '';
    newItem.querySelector('.item-description').contentEditable = true;

    // Adding the EventListener, as the EventListener is not automatically attached. Refactor with the below by using event delegation
    // https://stackoverflow.com/questions/15408394/how-to-copy-a-dom-node-with-event-listeners
    newItem.querySelector('.delete-button').addEventListener('click', deleteItem);
    document.getElementsByClassName('list')[0].insertBefore(newItem, document.getElementById('add-item-button'));
    
    // Placed after the get Elements By Class Name to allow the focusing to happen after
    newItem.querySelector('.item-description').focus();
}

function deleteItem(e) {
    e.target.parentElement.parentElement.remove();
}