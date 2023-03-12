// ? Bütün elementləri seçmək

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

todos = [];


runEvents()

function runEvents(){
    form.addEventListener("submit",addTodo);
    // səhifə yüləndiyində 
    document.addEventListener("DOMContentLoaded", pageLoaded);
    secondCardBody.addEventListener("click",removeTodoToUI);
    clearButton.addEventListener("click",allTodosEveryWhere);
    filterInput.addEventListener("keyup",filter); 
}

function pageLoaded(){
    checkTodoFromStorage();
    todos.forEach(function (todo){
        addTodoToUi(todo);
    });
}


function filter(e){
    const filterValue = e.target.value.toLowerCase().trim();
    const todoList =   document.querySelectorAll(".list-group-item");
    todoList.forEach

    if(todoList.length>0){
        todoList.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                todo.setAttribute("style","display:block");
            }else{
                todo.setAttribute("style","display:none !important");

            }
        })
    }else{
        showAlert("warrning","axtarış üçün ən az 1 qeyd olmalıdır")
    }
}

function allTodosEveryWhere(){
    const todoList = document.querySelectorAll(".list-group-item");
   //! ekrandan silmək üçün
    if(todoList.length > 0){
        todoList.forEach(function (todo) {
            todo.remove
        });
    //! storage-dən silmək
    todos=[];
    localStorage.setItem("todos",JSON.stringify(todos));
    showAlert("success","Bütün qeydlər uğurlu şəkildə silindi");
    }else{
        showAlert("warrnig","Silmək üçün heç bir qeydiniz yoxdur")
    }
}

function removeTodoToUI(e){
    if(e.target.className==="fa fa-remove"){
        console.log("x")

        const todo = e.target.parentElement.parentElement;
        //! Ekrandan silmək üçün
        todo.remove()
        //! Storage dən silmək üçün
        removeTodoToStorage(todo.textContent);
        showAlert("success","Silindi :)")
    }
}

function removeTodoToStorage(removeTodo){
    checkTodoFromStorage();
    todos.forEach(function(todo,index){
    if(removeTodo===todo){
        todos.splice(index,1);
    }
    });
    localStorage.setItem("todos",JSON.stringify(todos)); 

}
function addTodo(e){
//! (trimlənmiş şəkildə) sağda solda olan boşluqları təmizlənmiş şəkildə mənə gətir 
const inputText=addInput.value.trim();
if(inputText==null || inputText==""){
    showAlert("danger","Xaiş olunur ki boş qeyd etməyin.");

}else{
    addTodoToUi(inputText);
    addTodoToStorage(inputText);
    showAlert("success","Todo qeyd edildi.");
}




console.log("(Todo yazın) submit eventi işlədi");
//! yuxarıda ki submit fərqli səhifəyə yönləndirdiyi üçün preventDeafault yazanda default olsun
//! storage qeyd edir  
 e.preventDefault();

}

function addTodoToUi(newTodo){
    
// <li class="list-group-item d-flex justify-content-between"> Todo 1 </li>
const li = document.createElement("li");
li.className = "list-group-item d-flex justify-content-between";
li.textContent = newTodo;


// <a href="#" class="delete-item">  </a>
const a = document.createElement("a");
a.href = "#"
a.className ="delete-item"


// <i class="fa fa-remove"></i>
const i = document.createElement("i");
i.className = "fa fa-remove"


a.appendChild(i);
li.appendChild(a);
todoList.appendChild(li);
}

//!localStorage-e göndərmək
function addTodoToStorage(newTodo){
    checkTodoFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function checkTodoFromStorage(){
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{

        //? array chevrilmish halda mene ver
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type,message){

    /*
    bootstrapdan alertlər
    
    <div class="alert alert-warning" role="alert">
        This is a warning alert—check it out!
    </div>
    */

 const div = document.createElement("div");
//  div.className = "alert alert-"+type;
 div.className = `alert alert-${type}`; //!literal
 div.textContent = message;
 
 firstCardBody.appendChild(div);
  setTimeout(() => {
    div.remove()
  }, 2500);
}