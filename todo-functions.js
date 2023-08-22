'use strict'
const getSavedToDos = () => {
    const savedToDos = localStorage.getItem('todos');
    try {
        return savedToDos ? JSON.parse(savedToDos) : [];
    } catch (e) {
        console.log(e);
        return [];
    }
    
}

const saveToDos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
}

const removeToDo = (todoId) => {
    const indexToRemove = todos.findIndex((todo)=>todo.id===todoId);
    if (indexToRemove > -1){
        todos.splice(indexToRemove, 1);
    }
}
//toggle to do on check
// const toggleToDo = function(todo){
//     todo.completed = !todo.completed;
//     saveToDos(todos);
//     renderToDos(todos,filters);
// }
//
const generateTodoDOM = (todo)=>{
    const newToDoDomElement = document.createElement('label');
    const containerElement = document.createElement('div');
    const todoCheck = document.createElement('input');
    const todoText = document.createElement('span');
    const deleteButton = document.createElement('button');

    //newToDoDomElement.style.marginBottom ='1%';

    
    todoCheck.setAttribute('type', 'checkbox');
    todoCheck.checked = todo.completed;
    todoCheck.addEventListener('change', (e)=>{
        //console.log(e.target.checked);
        //toggleToDo(todo);
        todo.completed = e.target.checked;
        saveToDos(todos);
        renderToDos(todos,filters);
    });
    containerElement.appendChild(todoCheck);
    
    todoText.textContent = todo.text;
    containerElement.appendChild(todoText);

    
    //deleteButton.style.marginLeft = '1%';
    deleteButton.textContent = 'remove';
    deleteButton.classList.add('button', 'button--text');

    deleteButton.addEventListener('click', ()=>{
        removeToDo(todo.id);
        saveToDos(todos);
        renderToDos(todos, filters);
    })
    newToDoDomElement.appendChild(deleteButton);
   
    //setting up some classes
    newToDoDomElement.classList.add('list-item');
    containerElement.classList.add('list-item__container');

    newToDoDomElement.appendChild(containerElement);
    newToDoDomElement.appendChild(deleteButton);
    return newToDoDomElement;
}

const generateSummaryDOM = (filteredTodos)=>{
    const filteredToDosLeft = filteredTodos.filter((todo)=>!todo.completed).length;
    const toDosLeftElement = document.createElement('h2');
    toDosLeftElement.classList.add('list-title');
    let leftItemsWord = filteredToDosLeft === 1 ? 'item': 'items';
   
    toDosLeftElement.textContent = `You have ${filteredToDosLeft} ${leftItemsWord} left to complete:`;
    return toDosLeftElement;
}

const renderToDos = (todos, filters)=>{
   
    const filteredTodos = todos.filter(function(todo){
        const includesSearchText = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompleted = (!filters.hideCompleted || !todo.completed);
        //debugger
        return includesSearchText && hideCompleted;
    });
   
    const  toDosElement = document.querySelector('#todos');
    toDosElement.innerHTML = '';

    toDosElement.appendChild(generateSummaryDOM(filteredTodos));

    //
    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo)=>{
        
            toDosElement.appendChild(generateTodoDOM(todo));
        });
    }else{
        const nothingToShowMessage = document.createElement('p');
        nothingToShowMessage.classList.add('empty-message');
        nothingToShowMessage.textContent = 'No to-dos to show';
        toDosElement.appendChild(nothingToShowMessage);
    }
    
}