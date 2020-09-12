// Get elements to attach listeners to
const editButton = document.querySelector('#list-edit-button');
const title = document.querySelector('h1 span');
const addButton = document.getElementById('add-item-button');
const listItem = document.getElementsByClassName('list-item')[0];

// Set event listeners
editButton.addEventListener('click', setEditMode);
title.addEventListener('blur', setReadMode);
addButton.addEventListener('click', addItem);

// Callback functions for listeners
function setEditMode(e) {
    title.contentEditable = true;
    title.style.borderBottom = '1px solid black';
}

function setReadMode(e) {
    title.contentEditable = false;
    title.style.borderBottom = '';
}

function addItem(e) {
    document.getElementsByClassName('list')[0].insertBefore(listItem.cloneNode(true), document.getElementById('add-item-button'));
}