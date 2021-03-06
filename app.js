// Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filter = document.querySelector('.filter-todos')

// Event Listeners

todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filter.addEventListener('click', filterTodos)
document.addEventListener('DOMContentLoaded', getTodos)

// Functions

function addTodo(event) {
    event.preventDefault()
    // Create ToDo Div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo-div')
    // Creat <li>
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)
    // ADD TO LOCAL STORAGE
    saveTodos(todoInput.value)
    // Checked
    const checkedButton = document.createElement('button')
    checkedButton.classList.add('checked')
    checkedButton.innerHTML = '<i class="fas fa-check"></i>'
    todoDiv.appendChild(checkedButton)
    // Delete
    const deleteButton = document.createElement('button')
    deleteButton.classList.add('delete')
    deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>'
    todoDiv.appendChild(deleteButton)
    // Append to list
    todoList.appendChild(todoDiv)
    todoInput.value = "";
}

// DELETECHECK

function deleteCheck(event) {
    const item = event.target;
    // Delete
    if (item.classList[0] === 'delete') {
        const todo = item.parentElement // O sea que todo va a ser todo el div
        todo.classList.add('deleted')
        todo.addEventListener('transitionend', function(){
            todo.remove()})
        removeLocalTodo(todo)
    } else if (item.classList[0] === "checked") {
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }
}

// FILTER TODOS

function filterTodos (event) {
    const allTodos = todoList.childNodes
    allTodos.forEach(function(todo) {
        switch(event.target.value){ // Me va a decir si es All/Completed/Uncompleted
        case "all":
            todo.style.display = 'flex'
            break;
        case "completed":
            if(todo.classList.contains('completed')){
                todo.style.display = 'flex';
            }else{
                todo.style.display = 'none'
            }
            break;
        case "uncompleted":
            if(!todo.classList.contains('completed')){
                todo.style.display = 'flex'
            }else{
                todo.style.display = 'none';
            }
            break;
    }
    })
}

// SAVE LOCAL TODOS


function saveTodos (todo) {
    //CHECK
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))

}
// KEEP THE TODOS WHEN REFRESHING

function getTodos () {
    let todos;
        //CHECK
    if(localStorage.getItem('todos') === null) {
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo-div')
    // Creat <li>
    const newTodo = document.createElement('li')
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)
    // Checked
    const checkedButton = document.createElement('button')
    checkedButton.classList.add('checked')
    checkedButton.innerHTML = '<i class="fas fa-check"></i>'
    todoDiv.appendChild(checkedButton)
    // Delete
    const deleteButton = document.createElement('button')
    deleteButton.classList.add('delete')
    deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>'
    todoDiv.appendChild(deleteButton)
    // Append to list
    todoList.appendChild(todoDiv)
    })
}

// REMOVE COMPLETED TODOS FROM LOCALSTORAGE

function removeLocalTodo(todo) {
            //CHECK
    if(localStorage.getItem('todos') === null) {
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }   
    const todoIndex = todo.children[0].innerText // children[0] porque ese es el <li></li> del todo, cuyo texto es el todo que queremos remover
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem("todos", JSON.stringify(todos))
}
