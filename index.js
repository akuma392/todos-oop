class Todolist{
    constructor(root,list =[]){
            this.todos = list;
            this.root = root;

    }

    add(text){
        let todo = new Todo(text);
        this.todos.push(todo);
        this.createTodosUI();
        return this.todos.length;

    }

  handleDelete(id){
      let index = this.todos.findIndex((todo) => todo.id === id);
      this.todos.splice(index,1);
      this.createTodosUI();
      return this.todos.length;
  }
  createTodosUI(){
      this.root.innerHTML = "";
      this.todos.forEach(todo=>{
        let ui = todo.createUI();
        ui.querySelector("span").addEventListener("click",this.handleDelete.bind(this, todo.id));

          this.root.append(ui);
      })
  }
}

class Todo{
    constructor(text){
        this.text = text;
        this.isDone = false;
        this.id = `id-${Date.now()}`;
    }

    handleCheck(){
        this.isDone = !this.isDone;
        this.createUI();
        // if (this.isDone == true) {
        //     this.text.style.textDecoration = "line-through";
        //   }

    }

createUI(){
    let li = document.createElement("li");
    let input = document.createElement("input");
    input.type = "checkbox";
    input.checked = this.isDone;

    input.addEventListener("click",this.handleCheck.bind(this));

    let p = document.createElement("p");
    p.innerText = this.text;
    if (this.isDone == true) {
        p.classList.add("checked");
      }
    
    let div = document.createElement("div")
    div.style.width = "30px";

    let span = document.createElement("span");

    span.innerText = "X";
    div.append(span);
    li.append(input,p,div);

    return li;
}
}


let input = document.querySelector("input");
let myTodo = new Todolist(document.querySelector("ul"))

input.addEventListener("keyup", (event)=>{
    if(event.keyCode == 13){
        myTodo.add(event.target.value);
        event.target.value = "";
    }
    
})

