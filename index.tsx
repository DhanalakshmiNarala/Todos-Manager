import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface ITodos {
    todos: {
        id: number 
        text: string
        status: boolean
    }[]
    display: string
}

let gID=0;

class Todos extends React.Component<{}, ITodos> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            todos: [],
            display: "all"
        }
    }

    addTodo(e: React.KeyboardEvent<HTMLInputElement>) {
        let target = e.target as any;
        if(e.keyCode==13 && target.value!="") {
            this.setState({
                todos : [
                    {
                        id: gID++,
                        text: target.value,
                        status: true
                    },
                    ...this.state.todos
                ]
            })
            target.value="";
        }
    }

    toggleTodo(todoId: number) {
        this.setState({
            todos: this.state.todos.map((todo)=> {
                return {
                    ...todo,
                    status: todoId==todo.id?(!todo.status):todo.status
                 }
            })
        })
    }

    deleteTodo(todoId: number) {
        this.setState({
           todos: this.state.todos.filter((todo)=> todoId!=todo.id) 
        })
    }

    todoFormat(todo: any) {
        return <div className={"todo "+todo.status} key={todo.id}>
            <div className="text">{todo.text}</div>
            <button className="toggle" onClick={()=> {
                this.toggleTodo(todo.id);
            }}>Toggle</button>
            <button className="delete" onClick={()=> {
                this.deleteTodo(todo.id);
            }}>X</button>
        </div> 
    }
  
    displayTodos() {
        return <div className="displayTodos"> {
            this.state.todos.map((todo)=> {
                switch(this.state.display) {
                    case "active":
                        if(todo.status)
                            return this.todoFormat(todo);
                        break;
                    case "complete":
                        if(!todo.status)
                            return this.todoFormat(todo);
                        break;
                    case "all":
                        return this.todoFormat(todo);
                }
            })
        }</div>
    }

    render() {
        return <div className="todos">
            <div className="header">Todos</div>

            <div className="select">
                <button className="all" onClick={()=> {
                    this.setState({
                        display: "all"
                    })
                }}>All</button>
                <button className="active" onClick={()=> {
                    this.setState({
                        display: "active"
                    })
                }}>Active</button>
                <button className="complete" onClick={()=> {
                    this.setState({
                        display: "complete"
                    })
                }}>Complete</button>
            </div>

            <div className="body">
                <input className="enterTodo" type="text" placeholder="Enter Todo" onKeyDown={(e)=>{
                    this.addTodo(e);
                }}/>
                {this.displayTodos()}
            </div>
        </div>
    }
}

ReactDOM.render(<Todos/>, document.getElementById("app"));