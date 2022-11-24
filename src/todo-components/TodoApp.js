import '../css/todo.css'
import { Link } from 'react-router-dom'
import { useState} from 'react'
const TodoApp = () => { 
    const [todoItem, setTodoItem] = useState('')

    const [todoList, setTodoList] = useState([])
    const [doingList, setDoingList] = useState([])
    const [doneList, setDoneList] = useState([])

    const [taskTodo, setTaskTodo] = useState(true)
    const [taskDoing, setTaskDoing] = useState(false)
    const [taskDone, setTaskDone] = useState(false)
    const [show, setShow] = useState(true);


    const [checkbox, setCheckbox] = useState(false);

    // console.log(taskTodo);

    // setCheckbox(!taskDoing !== taskDone)


    const addTodo = () => {
        if(todoItem.trim() !== ''){
             setTodoList([...todoList, {
                id: Math.floor(Math.random() * 1000000000),
                text: todoItem,
                done: taskDone,
                doing: taskDoing,
                todo: taskTodo
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

    const updateTodoItem = (id) => {
         console.log(todoList)
    }
    console.log(show)
    // const updateDoing = (id) => {
    //     let updatedTodoList = todoList.map((todoItem) => {
    //         console.log(todoItem.id, id)
    //         if(todoItem.id == id) {
    //             todoItem.doing = !todoItem.doing
    //             todoItem.todo = !todoItem.todo
    //         }
    //         return
    //     })
    //     setTodoList(updatedTodoList)
    //     console.log(todoList)
    // }

    console.log(todoList)
    return ( 
        <div className="todo-app"> 
        <div className="greetings">
            <p >hi, Chioma !</p>
            <Link to="/"><button>logout</button></Link>
        </div>
        <h1>todos</h1>

        {taskDoing}
        {/* {todoList} */}
        <input type="text" name="todo-item" id="todo-item" placeholder="What do you need to do ?" required className="details"  value={todoItem} onChange={(e) => setTodoItem(e.target.value )} onKeyDown={keyDownHandler} />
        <button className="add-todo" onClick={addTodo}>add</button>
        <div className="todo-list">
            <div className="todo">
                {/* onClick={() => {setTaskDoing(!taskDoing); setTaskTodo(!taskTodo)}} */}
                <h2>todo</h2>
                {todoList?.map((todoItem) => (
                        <ul key={todoItem?.id}>
                            { show ? 
                                <li className="not-editing">
                                    <input type="checkbox" name="done" id="done"  />
                                    {/* onChange={() => updateDoing(todoItem?.id)} */}
                                    <p>{todoItem?.text}</p>
                                    <button onClick={() => updateTodoItem(todoItem.id)}> Edit
                                    </button>
                                    <button >Delete</button>
                                </li>
                                :
                                <li className="editing">
                                    <input type="text" name="editItem" id="editItem" className="edit-item" value={todoItem?.text}/>
                                    <button onClick={() => setShow(!show)}>Save</button>
                                </li>
                            }
                            
                        </ul>
                    )
                )}
            </div>
            <div className="doing">
                <h2>doing</h2>
                {todoList.filter((todoItem) => !todoItem.todo && !todoItem.done).map((todoItem) => (
                        <ul key={todoItem.id}>
                            <li className="doing-box">
                                {/* <input type="checkbox" name="done" id="done" value={taskDoing} onChange={(e) => setTaskDoing(e.target.checked)}/> */}
                                <p>{todoItem.text}</p>
                                <div>
                                    <button>Undo</button>
                                    <button>Done</button>
                                </div>
                            </li>
                        </ul>
                    )
                )}
            </div>
            {show ? 
            <div className="todo-done">
                <h2>done</h2>
                <ul>
                    <li>
                        <input type="checkbox" name="done" id="done" />
                        <p>DONE ITEM</p>
                    </li>
                </ul>
            </div> :
            null
            }
            
        </div>
    </div>
     );
}
 
export default TodoApp;