import '../css/todo.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
const TodoApp = () => { 
    let userDetails = localStorage.getItem('userDetails')
    let parsedDetails = JSON.parse(userDetails)
    const [todoItem, setTodoItem] = useState('')
    const [todoList, setTodoList] = useState([])
    const [doingList, setDoingList] = useState([])
    const [doneList, setDoneList] = useState([])
    const [show, setShow] = useState(true);

    const addTodo = () => {
        if(todoItem.trim() !== ''){
             setTodoList([...todoList, {
                id: Math.floor(Math.random() * 1000000000),
                text: todoItem,
                done: false,
                doing: false,
                todo: true
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
            // todoList.map((todoItem) => {
            //     if (todoItem.id === todo.id){
            //         return {...todoItem, doing: !todoItem.doing, todo: !todoItem.todo}
            //     }
            //     return todoItem
            // })
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
            // todoList.map((todoItem) => {
            //     if (todoItem.id === todo.id){
            //         return {...todoItem, doing: !todoItem.doing, todo: !todoItem.todo}
            //     }
            //     return todoItem
            // })
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
                        <ul key={todo.id}>
                            { show ? 
                                <li className="not-editing">
                                    <input type="checkbox" name="done" id="done" onClick={() => [updateTodoArray(todo), addDoing(index)]} />
                                    <p>{todo.text}</p>
                                    <button onClick={() => [setShow(!show)]}> Edit
                                    </button>
                                    <button onClick={() => deleteTodo(todo)} >Delete</button>
                                </li>
                                :
                                <li className="editing">
                                    <input type="text" name="editItem" id="editItem" className="edit-item" value={todo.text}/>
                                    <button onClick={() => setShow(!show)}>Save</button>
                                </li>
                            }
                            
                        </ul>
                    )
                )}
            </div>
            <div className="doing">
                <h2>doing</h2>
                {doingList.map((todo, index) => (
                        <ul key={todo.id}>
                            <li className="doing-box">
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
                        <ul key={todo.id}>
                            <li>
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