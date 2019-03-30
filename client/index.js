let myRib = new RibClient('66.42.93.224:5000');
 
let todoul = document.getElementById('todos');

myRib.onConnect(async () => {
    let todos = await myRib.getTodos();
    for(todo in todos){
        appendTodo(todos[todo]);
    }
});

function addTodo(){
    let newTodo = {
        id: 0,
        text: document.getElementById('todoInput').value,
        done: false
    }
    myRib.addTodo(newTodo);
    document.getElementById('todoInput').value = "";
}

function appendTodo(todo){
    let newli = document.createElement('li');
    newli.id = todo.id;
    newli.className = 'list-group-item d-flex justify-content-between align-items-center';
    if(todo.done) newli.style = 'padding: 5px; text-decoration: line-through';
    else newli.style = 'padding: 5px;'
    newli.innerHTML = todo.text +`<div id="`+todo.id+`"><button onClick="finishTodo(this.parentElement.id)" style="margin-right: 5px;" class="btn btn-success">
			<i class="fa fa-check"></i>
		</button><button class="btn btn-danger" onClick="deleteTodo(this.parentElement.id)">
			<i class="fa fa-trash-alt"></i>
		</button></div>`;
    todoul.append(newli);
}

function deleteTodo(id){
    myRib.deleteTodo(parseInt(id));
}

function removeTodo(id){
    var elem = document.getElementById(id);
    elem.remove();
}

function finishTodo(id){
    var elem = document.getElementById(id);
    elem.style = 'padding: 5px; text-decoration: line-through';
    myRib.doneTodo(parseInt(id));
}

myRib.exposeFunctions([appendTodo, removeTodo])