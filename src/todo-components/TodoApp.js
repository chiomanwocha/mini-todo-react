import '../css/todo.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
const TodoApp = () => { 
    let userDetails = localStorage.getItem('userDetails')
    let parsedDetails = JSON.parse(userDetails)
    const [todoItem, setTodoItem] = useState('')
    const [todoList, setTodoList] = useState(() =>{
        const savedTodos = localStorage.getItem("todoList");
        if (savedTodos) {
          return JSON.parse(savedTodos);
        } else {
          return [];
        }
      })
    const [doingList, setDoingList] = useState(() => {
        const savedDoing = localStorage.getItem("doingList");
        if (savedDoing) {
          return JSON.parse(savedDoing);
        } else {
          return [];
        }
      })
    const [doneList, setDoneList] = useState(() => {
        const savedDone = localStorage.getItem("doneList");
        if (savedDone) {
          return JSON.parse(savedDone);
        } else {
          return [];
        }
      })
    const [currentTodo, setCurrentTodo] = useState({});

    const addTodo = () => {
        if(todoItem.trim() !== ''){
             setTodoList([...todoList, {
                id: Math.floor(Math.random() * 1000000000),
                text: todoItem,
                done: false,
                doing: false,
                todo: true,
                isEditing: false
            }])
            setTodoItem('')
        }
        else{
            alert('Your todo item can not be empty')
        }
    }
    const keyDownHandler = (e) =>{
        if(e.key === 'Enter'){
            addTodo()
        }
    }
    const deleteTodo = ({id}) => {
        setTodoList(
            todoList.filter((todo) => todo.id !== id)
        )
    }
    const updateTodoArray = ({id}) => {
        setTodoList(
            todoList.filter((todo) => todo.id !== id)
        )
    }
    const addDoing = (id) => {
        setDoingList([...doingList,{
                id: todoList[id].id,
                text: todoList[id].text,
                done: false,
                doing: !todoList[id].doing,
                todo: !todoList[id].todo
        }])
    }
    const revertDoing = (id) => {
        setTodoList(
            [...todoList,{
                id: doingList[id].id,
                text: doingList[id].text,
                done: false,
                doing: !doingList[id].doing,
                todo: !doingList[id].todo
            }]
        )
    }
    const updateDoingArray = ({id}) => {
        setDoingList(
            doingList.filter((todoItem) => todoItem.id !== id)
        )
    }
    const addDone = (id) => {
        setDoneList([...doneList, {
                id: doingList[id].id,
                text: doingList[id].text,
                done: true,
                doing: !doingList[id].doing,
                todo: false
        }])
    }
    const revertDone = (id) => {
        setDoingList([...doingList, {
            id: doneList[id].id,
            text: doneList[id].text,
            done: false,
            doing: !doneList[id].doing,
            todo: !doneList[id].todo
        }]
        )
    }
    const updateDoneArray = ({id}) => {
        setDoneList(
            doneList.filter(todoItem => todoItem.id !== id)
        )
    }
    const editItem = (todo, index) => {
        todoList[index].isEditing = true
        setCurrentTodo({...todo});
    }
    const save = (id, updatedTodo, index) => {
        const updatedItem = todoList.map((todo) => {
            return todo.id === id ? updatedTodo : todo;
          });
        todoList[index].isEditing = false
        setTodoList(updatedItem)
    }
    const handleEditInput = (e, index) => {
        setCurrentTodo({...todoList[index], text: e.target.value});
    }

    localStorage.setItem('todoList', JSON.stringify(todoList))
    localStorage.setItem('doingList', JSON.stringify(doingList))
    localStorage.setItem('doneList', JSON.stringify(doneList))
    return ( 
        <div className="todo-app"> 
        <div className="greetings">
            <p >hi, {parsedDetails?.firstName} !</p>
            <Link to="/"><button>logout</button></Link>
        </div>
        <h1>todos</h1>
        <input type="text" name="todo-item" id="todo-item" placeholder="What do you need to do ?" required className="details"  value={todoItem} onChange={(e) => setTodoItem(e.target.value )} onKeyDown={keyDownHandler} />
        <button className="add-todo" onClick={addTodo}>add</button>
        <div className="todo-list">
            <div className="todo">
                <h2>todo</h2>
                {todoList.map((todo, index) => (
                        <ul >
                            { !todo.isEditing ? 
                                <li className="not-editing" key={todo.id}>
                                    <input type="checkbox" name="done" id="done" onClick={() => [updateTodoArray(todo), addDoing(index)]}/>
                                    <p>{todo.text}</p>
                                    <button onClick={() => [editItem(todo, index)]}> Edit
                                    </button>
                                    <button onClick={() => deleteTodo(todo)} >Delete</button>
                                </li>
                                :
                                <li className="editing" key={todo.id}>
                                    <input type="text" name="editItem" id="editItem" className="edit-item" value={currentTodo.text} onChange={(e) => handleEditInput(e, index)} />
                                    <button onClick={() => save(todo.id, currentTodo, index)}>Save</button>
                                </li>
                            }
                            
                        </ul>
                    )
                )}
            </div>
            <div className="doing">
                <h2>doing</h2>
                {doingList.map((todo, index) => (
                        <ul>
                            <li className="doing-box" key={todo.id}>
                                <p>{todo.text}</p>
                                <div>
                                    <button onClick={() => [revertDoing(index), updateDoingArray(todo)]}>Undo</button>
                                    <button onClick={() => [addDone(index), updateDoingArray(todo)]}>Done</button>
                                </div>
                            </li>
                        </ul>
                    )
                )}
            </div>
            <div className="todo-done">
                <h2>done</h2>
                {doneList.map((todo, index) => (
                        <ul>
                            <li key={todo.id}>
                                <input type="checkbox" name="done" id="done" checked={todo.done} onChange={() => [revertDone(index), updateDoneArray(todo)]}/>
                                <p>{todo.text}</p>
                            </li>
                        </ul>
                    )
                )}
            </div> 
        </div>
    </div>
    );
}
 
export default TodoApp;