import '../css/todo.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const TodoApp = () => {
    let parsedDetails = JSON.parse(localStorage.getItem('userDetails'))
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
    const newTodoList = [...todoList]
    const [newTodoItem, setNewTodoItem] = useState('')

    const addTodo = (e) => {
        e.preventDefault();
        if(todoItem.trim() !== ''){
             setTodoList([...todoList, {
                id: Math.floor(Math.random() * 100),
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

    const deleteTodo = (index) => {
        newTodoList.splice(index, 1)
        setTodoList(newTodoList)
    }

    const editItem = (index) => {
        newTodoList[index].isEditing = true
        setTodoList(newTodoList)
    }

    const save = (e, index) => {
        e.preventDefault();
        todoList[index].isEditing = false
        if(newTodoItem.length !== 0){
            newTodoList[index].text = newTodoItem 
            setTodoList(newTodoList)
            setNewTodoItem('')
        } else {
            setTodoList(newTodoList)
        }
        
    }

    //additional functionalities
    const addDoing = (id) => {
        setDoingList([...doingList,{
                id: todoList[id].id,
                text: todoList[id].text,
                done: false,
                doing: !todoList[id].doing,
                todo: !todoList[id].todo
        }])
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
    const updateTodoArray = ({id}) => {
        setTodoList(
            todoList.filter((todo) => todo.id !== id)
        )
    }
    const updateDoingArray = ({id}) => {
        setDoingList(
            doingList.filter((todoItem) => todoItem.id !== id)
        )
    }
    const updateDoneArray = ({id}) => {
        setDoneList(
            doneList.filter(todoItem => todoItem.id !== id)
        )
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
            <form onSubmit={(e) => addTodo(e)}>
                <input type="text" name="todo-item" id="todo-item" placeholder="What do you need to do ?" required className="details"  value={todoItem} onChange={(e) => setTodoItem(e.target.value )} />
                <button className="add-todo">add</button>
            </form>
            <div className="todo-list">
                <div className="todo">
                    <h2>todo</h2>
                    {todoList.map((todo, index) => (
                        <ul key={todo.id}>
                            {!todo.isEditing ?
                                <li className="not-editing">
                                    <input type="checkbox" name="done" id="done" onClick={() => [updateTodoArray(todo), addDoing(index)]}/>
                                    <p>{todo.text}</p>
                                    <button onClick={() => editItem(index)}> Edit
                                    </button>
                                    <button onClick={() => deleteTodo(index)}>Delete</button>
                                </li>
                                :
                                <li className="editing">
                                    <form onSubmit={(e) => save(e, index)}>
                                        <input type="text" name="editItem" id="editItem" className="edit-item" defaultValue={todoList[index].text}  onChange={(e) => setNewTodoItem(e.target.value)}/>
                                            <button type='submit'>Save</button>
                                        </form>
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
                                    <li className="doing-box" key={index}>
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