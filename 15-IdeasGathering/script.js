const newButton = document.querySelector('[data-newButton]');
const createNote = document.querySelector('[data-createNoteContainer]');
const noteTitle = document.querySelector('[data-noteTitle]');
const noteText = document.querySelector('[data-noteText]');
const saveButton = document.querySelector('[data-saveButton]');
const allNotes = document.querySelector('[data-allNotes]');
const deleteButton = document.querySelector('[data-deleteButton]');


function saveNote(){
    //if there is title or body present then save it to local storage
    //and create a li element with the title in the allNotes ul container
    //also add event listener to the li element showing the note 

    //if there is no title or body then do nothing
    let title = noteTitle.value;
    let text = noteText.value;

    if(title || text){
     localStorage.setItem(title,text);


       noteTitle.value = '';
       noteText.value = '';
     
       displayNotes();
    }
    else{
        return;
    }
}

function displayNotes(){
    allNotes.innerHTML = '';

    for(let i=0;i<localStorage.length;i++){
      const title = localStorage.key(i);
      const  singleNote = document.createElement('li');
        singleNote.innerText = title;
        allNotes.appendChild(singleNote);

        //adding event listentr 
        singleNote.addEventListener('click',()=>{
            showNoteOnUi(title);
        })
    }
}

function showNoteOnUi(title){
    const text = localStorage.getItem(title);
    noteTitle.value = title;
    noteText.value = text;
}

function newNote(){
    noteTitle.value = '';
    noteText.value = '';
}

newButton.addEventListener('click',()=>{
    saveNote();
    newNote();
});

saveButton.addEventListener('click',()=>{
    saveNote();
});

deleteButton.addEventListener('click',()=>{

    const title = noteTitle.value;
    const text = noteText.value;

    if(!title && !text){
        alert('No note to delete');
        return;
    }

    localStorage.removeItem(title,text);
    displayNotes();
    newNote();
})

displayNotes();