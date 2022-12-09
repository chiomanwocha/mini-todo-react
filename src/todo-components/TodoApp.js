import '../css/todo.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from './Loader'

const TodoApp = () => {
    const params = useParams()
    const [user, setUser] = useState('')
    const [todoItem, setTodoItem] = useState('')
    const [loader, setLoader] = useState(false)
    const [todoList, setTodoList] = useState([])
    const [doingList, setDoingList] = useState([])
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
        (todoItem.trim() !== '') &&
            axios
            .post(`https://6391a596b750c8d178c8e2e7.mockapi.io/users/${params.id}/todo`,{
                    id: Math.floor(Math.random() * 100),
                    text: todoItem,
                    done: false,
                    doing: false,
                    todo: true,
                    isEditing: false
                })
            .catch((error) => {
                alert(error)
            })
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

    const deleteTodo = (index, todo) => {
        newTodoList.splice(index, 1)
        setTodoList(newTodoList)
        axios.delete(`https://6391a596b750c8d178c8e2e7.mockapi.io/users/${params.id}/todo/${todo.id}`)
        .catch((error) => {
            alert(error)
        })
    }

    const editItem = (index) => {
        newTodoList[index].isEditing = true
        setTodoList(newTodoList)
    }

    const save = (e, index, todo) => {
        e.preventDefault();
        todoList[index].isEditing = false
        if(newTodoItem.length !== 0){
            newTodoList[index].text = newTodoItem 
            setTodoList(newTodoList)
            axios.put(`https://6391a596b750c8d178c8e2e7.mockapi.io/users/${params.id}/todo/${todo.id}`, {
                text: newTodoItem
            })
            .catch((error) => {
                alert(error)
            })
            setNewTodoItem('')
        } else {
            setTodoList(newTodoList)
        }
    }
    //additional functionalities
    const addDoing = (todo) => {
        setTodoList(
            todoList.filter((item) => item.id !== todo.id)
        )
        setDoingList([...doingList,{
            id: todo.id,
            text: todo.text,
            done: false,
            doing: !todo.doing,
            todo: !todo.todo
        }])
        const addDoing = axios.post(`https://6391a596b750c8d178c8e2e7.mockapi.io/users/${params.id}/doing`,{
            id: Math.floor(Math.random() * 100),
            text: todo.text,
            done: false,
            doing: !todo.doing,
            todo: !todo.todo
        })
        const deleteTodo = axios.delete(`https://6391a596b750c8d178c8e2e7.mockapi.io/users/${params.id}/todo/${todo.id}`)
        axios.all([addDoing, deleteTodo])
        .then((axios.spread((...response) => {
            return(response[0] && response[1])
        })))
        .catch((error) => {
            alert(error)
        })
    }
    const addDone = (id, todo) => {
        setDoneList([...doneList, {
                id: doingList[id].id,
                text: doingList[id].text,
                done: true,
                doing: !doingList[id].doing,
                todo: false
        }])
        setDoingList(
            doingList.filter((todoItem) => todoItem.id !== todo.id)
        )
        axios
        .delete(`https://6391a596b750c8d178c8e2e7.mockapi.io/users/${params.id}/doing/${todo.id}`)
        .catch((error) => {
            alert(error)
        })
    }
    const updateDoneArray = ({id}) => {
        setDoneList(
            doneList.filter(todoItem => todoItem.id !== id)
        )
    }
    const revertDoing = (id,todo) => {
        axios
            .post(`https://6391a596b750c8d178c8e2e7.mockapi.io/users/${params.id}/todo`,{
                    id: todo.id,
                    text: doingList[id].text,
                    done: false,
                    doing: !doingList[id].doing,
                    todo: !doingList[id].todo
                })
            .catch((error) => {
                alert(error)
            })
        axios
            .delete(`https://6391a596b750c8d178c8e2e7.mockapi.io/users/${params.id}/doing/${todo.id}`)
            .catch((error) => {
                alert(error)
            })
        setTodoList(
            [...todoList,{
                id: doingList[id].id,
                text: doingList[id].text,
                done: false,
                doing: !doingList[id].doing,
                todo: !doingList[id].todo
            }]
        )
        setDoingList(
            doingList.filter((todoItem) => todoItem.id !== todo.id)
        )
    }
    const revertDone = (id, todo) => {
        setDoingList([...doingList, {
            id: doneList[id].id,
            text: doneList[id].text,
            done: false,
            doing: !doneList[id].doing,
            todo: !doneList[id].todo
        }]
        )
        axios.post(`https://6391a596b750c8d178c8e2e7.mockapi.io/users/${params.id}/doing`,{
            id: Math.floor(Math.random() * 100),
            text: todo.text,
            done: false,
            doing: !todo.doing,
            todo: !todo.todo
        })
    }
    
    
    useEffect(() => {  
        setLoader(true)
        const getUser = axios.get(`https://6391a596b750c8d178c8e2e7.mockapi.io/users/${params.id}`)
        const getTodo = axios.get(`https://6391a596b750c8d178c8e2e7.mockapi.io/users/${params.id}/todo`)
        const getDoing = axios.get(`https://6391a596b750c8d178c8e2e7.mockapi.io/users/${params.id}/doing`)

        axios.all([getUser, getTodo, getDoing])
        .then(axios.spread((...responses) => {
            const user = responses[0]
            setUser(user.data.firstName)
            const todo = responses[1]
            setTodoList(todo.data)
            const doing = responses[2]
            setDoingList(doing.data)
            setLoader(false)
        }
        ))
        .catch((error) => {
            alert(error)
        })
    }, [])

    localStorage.setItem('doneList', JSON.stringify(doneList))

    return (  
        <div>
            {loader? 
            <div className='todo-loader'>
                <Loader></Loader>
            </div>:
            <div className="todo-app">
                <div className="greetings">
                    <p >hi, {user} !</p>
                    <Link to="/"><button>logout</button></Link>
                </div>
                <h1>todos</h1>
                <form onSubmit={(e) => addTodo(e)}>
                    <input type="text" name="todo-item" id="todo-item" placeholder="What do you need to do ?" required className="details"  value={todoItem} onChange={(e) => setTodoItem(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))} autoFocus/>
                    <button className="add-todo">add</button>
                </form>
                <div className="todo-list">
                    <div className="todo">
                        <h2>todo</h2>
                        {todoList.map((todo, index) => (
                            <ul key={todo.id}>
                                {!todo.isEditing ?
                                    <li className="not-editing">
                                        <input type="checkbox" name="done" id="done" onClick={() => [addDoing(todo)]}/>
                                        <p>{todo.text}</p>
                                        <button onClick={() => editItem(index)}> Edit
                                        </button>
                                        <button onClick={() => deleteTodo(index, todo)}>Delete</button>
                                    </li>
                                    :
                                    <li className="editing">
                                        <form onSubmit={(e) => save(e, index, todo)}>
                                            <input type="text" name="editItem" id="editItem" className="edit-item" defaultValue={todoList[index].text}  onChange={(e) => setNewTodoItem(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))} autoFocus />
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
                                        <li className="doing-box" key={todo.id}>
                                            <p>{todo.text}</p>
                                            <div>
                                                <button onClick={() => [revertDoing(index, todo)]}>Undo</button>
                                                <button onClick={() => [addDone(index, todo)]}>Done</button>
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
                                        <input type="checkbox" name="done" id="done" checked={todo.done} onChange={() => [revertDone(index, todo), updateDoneArray(todo)]}/>
                                        <p>{todo.text}</p>
                                    </li>
                                </ul>
                            )
                        )}
                    </div> 
                </div>
            </div>
            }
        </div>
    );
}
 
export default TodoApp;