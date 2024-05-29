// Create web server
const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile('index.html'));
app.listen(port, () => console.log(`App listening on port ${port}!`));
// Initialize Firebase
var config = {
    apiKey: "AIzaSyB-4R7L5Mk9xG6pKdY0n5J8G4jKxjR6G4U",
    authDomain: "skills-2b7c6.firebaseapp.com",
    databaseURL: "https://skills-2b7c6.firebaseio.com",
    projectId: "skills-2b7c6",
    storageBucket: "skills-2b7c6.appspot.com",
    messagingSenderId: "104429289469"
};
firebase.initializeApp(config);
// Get elements
const preObject = document.getElementById('object');
const ulList = document.getElementById('list');
// Create references
const dbRefObject = firebase.database().ref().child('object');
const dbRefList = dbRefObject.child('hobbies');
// Sync object changes
dbRefObject.on('value', snap => {
    preObject.innerText = JSON.stringify(snap.val(), null, 3);
});
// Sync list changes
dbRefList.on('child_added', snap => {
    const li = document.createElement('li');
    li.innerText = snap.val();
    li.id = snap.key;
    ulList.appendChild(li);
});
dbRefList.on('child_changed', snap => {
    const liChanged = document.getElementById(snap.key);
    liChanged.innerText = snap.val();
});
dbRefList.on('child_removed', snap => {
    const liToRemove = document.getElementById(snap.key);
    liToRemove.remove();
});
// Push new data
const preHobbies = document.getElementById('hobbies');
const btnAdd = document.getElementById('btnAdd');
const btnRemove = document.getElementById('btnRemove');
btnAdd.addEventListener('click', e => {
    const autoId = dbRefList.push().key;
    dbRefList.child(autoId).set(preHobbies.value);
});
btnRemove.addEventListener('click', e => {
    const autoId = dbRefList.push().key;
    dbRefList.child(autoId).remove();
});

// Path: index.html
// Compare this snippet from member.html:
// <!DOCTYPE html>
// <html>