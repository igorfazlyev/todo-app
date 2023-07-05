const getSavedToDos = function() {
    const savedToDos = localStorage.getItem('todos');
    if (savedToDos !== null){
      return JSON.parse(savedToDos);
    }else{
        return [];
    }
}

const saveToDos = function(todos){
    localStorage.setItem('todos', JSON.stringify(todos));
}

const removeToDo = function(todoId) {
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
const generateTodoDOM = function(todo){
    const newToDoDomElement = document.createElement('div');
    newToDoDomElement.style.marginBottom ='1%';

    const todoCheck = document.createElement('input');
    todoCheck.setAttribute('type', 'checkbox');
    todoCheck.checked = todo.completed;
    todoCheck.addEventListener('change', (e)=>{
        //console.log(e.target.checked);
        //toggleToDo(todo);
        todo.completed = e.target.checked;
        saveToDos(todos);
        renderToDos(todos,filters);
    });

    const todoText = document.createElement('span');
    todoText.textContent = todo.text;
    if (todo.completed){
        todoText.style.color = "blue";
    }else{
        todoText.style.fontWeight = "bold";
        todoText.style.color="red";
    };

    const deleteButton = document.createElement('button');
    deleteButton.style.marginLeft = '1%';
    deleteButton.textContent = 'x';
    deleteButton.addEventListener('click', ()=>{
        removeToDo(todo.id);
        saveToDos(todos);
        renderToDos(todos, filters);
    })

    newToDoDomElement.appendChild(todoCheck);
    newToDoDomElement.appendChild(todoText);
    newToDoDomElement.appendChild(deleteButton);
    return newToDoDomElement;
}

const generateSummaryDOM = function(filteredTodos){
    const filteredToDosLeft = filteredTodos.filter((todo)=>!todo.completed).length;
    const toDosLeftElement = document.createElement('h2');
    toDosLeftElement.textContent = `You have ${filteredToDosLeft} items left to complete:`;
    return toDosLeftElement;
}

const renderToDos = function(todos, filters){
   
    const filteredTodos = todos.filter(function(todo){
        const includesSearchText = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompleted = (!filters.hideCompleted || !todo.completed);
        //debugger
        return includesSearchText && hideCompleted;
    });
   
    
    document.querySelector('#todos').innerHTML = '';

    document.querySelector('#todos').appendChild(generateSummaryDOM(filteredTodos));

    //
    filteredTodos.forEach((todo)=>{
        
        document.querySelector("#todos").appendChild(generateTodoDOM(todo));
    });
}