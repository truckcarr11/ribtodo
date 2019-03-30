let RibServer = require('rib-server').default;

let todos= [];
let todoNum = 0;

let myRib = new RibServer();

let myRibClient;

RibServer.setRoute('/', __dirname+'/client/index.html');
RibServer.setClientFolder(__dirname+'/client');

myRib.onConnect((client) => {
    myRibClient = client;
});
function getTodos(){
    return todos;
}

function addTodo(todo) {
    todo.id = todoNum++;
    todos.push(todo);
    myRibClient.appendTodo(todo);
}
addTodo.argTypes = ['object'];

function deleteTodo(id){
    for(let i=0;i<todos.length;i++){
        if(todos[i].id==id) todos.splice(i,1);
    }
    myRibClient.removeTodo(id);
}
deleteTodo.argTypes = ['number'];

function doneTodo(id){
    for(let i=0;i<todos.length;i++){
        if(todos[i].id==id) todos[i].done = true;
    }
    console.log(todos);
}
doneTodo.argTypes = ['number'];

myRib.exposeFunctions([addTodo, getTodos, deleteTodo, doneTodo]);

RibServer.startServer(5000, 'This is much easier to program');