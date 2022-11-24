import '../css/todo.css'
import { Link } from 'react-router-dom'
import { useState} from 'react'
const TodoApp = () => { 
    const [todoItem, setTodoItem] = useState('')
    const [todoList, setTodoList] = useState([])
    const [doingList, setDoingList] = useState([])
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
    const todoDelete = ({id}) => {
        setTodoList(
            todoList.filter((todo) => todo.id !== id)
        )
    }
    const updateDoing = (todo) => {
        setTodoList(
            todoList.map((todoItem) => {
                if (todoItem.id === todo.id){
                    return {...todoItem, doing: !todoItem.doing, todo: !todoItem.todo}
                }
                return todoItem
            })
        )
        setDoingList(
            todoList.map((todoItem) => {
                if (todoItem.id === todo.id){
                    return {...todoItem, doing: !todoItem.doing, todo: !todoItem.todo}
                    
                }
                return todoItem
            })
        )
    }
    // console.log('doingList', doingList)
    const updateUndo = (todo) => {
        setTodoList(
            todoList.map((todoItem) => {
                if (todoItem.id === todo.id){
                    return {...todoItem, doing: !todoItem.doing, todo: !todoItem.todo}
                }
                return todoItem
            })
        )
        // setDoingList(
        //     todoList.filter((todoItem) => todoItem.id !== todo.id)
        //     // todoList.map(todoItem => {
        //     //     if(todoItem.id === todo.id) {
        //     //         return {...todoItem, doing: !todoItem.doing, todo: !todoItem.todo}
        //     //     }    
        //     //     return todoItem            
        //     // })
        // )
    }
    const updateDone = (todo) => {
        setTodoList(
            todoList.map((todoItem) => {
                if(todoItem.id === todo.id){
                    return {...todoItem, doing: !todoItem.doing, done: !todoItem.done}
                }
                return todoItem
            })
        )
    }
    const undoDone = (todo) => {
        setTodoList(
            todoList.map((todoItem) => {
                if(todoItem.id === todo.id) {
                    return {...todoItem, doing: !todoItem.doing, done: !todoItem.done}
                }
                return todoItem
            })
        )
    }

    return ( 
        <div className="todo-app"> 
        <div className="greetings">
            <p >hi, Chioma !</p>
            <Link to="/"><button>logout</button></Link>
        </div>
        <h1>todos</h1>
        <input type="text" name="todo-item" id="todo-item" placeholder="What do you need to do ?" required className="details"  value={todoItem} onChange={(e) => setTodoItem(e.target.value )} onKeyDown={keyDownHandler} />
        <button className="add-todo" onClick={addTodo}>add</button>
        <div className="todo-list">
            <div className="todo">
                <h2>todo</h2>
                {todoList.filter((todo => todo.todo)).map((todo) => (
                        <ul key={todo.id}>
                            { show ? 
                                <li className="not-editing">
                                    <input type="checkbox" name="done" id="done" onClick={() => updateDoing(todo)} />
                                    <p>{todo.text}</p>
                                    <button > Edit
                                    </button>
                                    <button onClick={() => todoDelete(todo)} >Delete</button>
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
                {todoList.filter((todo) => todo.doing).map((todo) => (
                        <ul key={todo.id}>
                            <li className="doing-box">
                                <p>{todo.text}</p>
                                <div>
                                    <button onClick={() => updateUndo(todo)}>Undo</button>
                                    <button onClick={() => updateDone(todo)}>Done</button>
                                </div>
                            </li>
                        </ul>
                    )
                )}
            </div>
            {show ? 
            <div className="todo-done">
                <h2>done</h2>
                {todoList.filter((todo) => todo.done).map((todo) => (
                        <ul key={todo.id}>
                            <li>
                                <input type="checkbox" name="done" id="done" checked={todo.done} onChange={() => undoDone(todo)}/>
                                <p>{todo.text}</p>
                            </li>
                        </ul>
                    )
                )}
            </div> :
            null
            }
            
        </div>
    </div>
     );
}
 
export default TodoApp;