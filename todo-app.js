'use strict'
let todos = getSavedToDos();

const filters = {
    searchText:'', 
    hideCompleted: false
}



// initial page setup

renderToDos(todos,filters);

//adding event listeners


document.querySelector('#filter').addEventListener("input", (e)=>{
    filters.searchText = e.target.value;
    renderToDos(todos, filters);
})

document.querySelector('#new-to-do-form').addEventListener("submit", (e)=>{
    e.preventDefault();
    //console.log(e.target.elements.newToDo.value);
    let toDoText = e.target.elements.newToDo.value.trim();
    if (toDoText.length > 0) {
        todos.push(
            {
                id: crypto.randomUUID(),
                text:toDoText,
                completed: false
            }  
        );
        renderToDos(todos, filters);
        saveToDos(todos);
        e.target.elements.newToDo.value = '';
    }
})

document.querySelector('#hide-completed').addEventListener('change', (e)=>{
    filters.hideCompleted = e.target.checked;
    renderToDos(todos,filters);
})