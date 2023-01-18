import '../css/todo.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from './Loader'
import { useQuery, useMutation } from 'react-query'
import Cookies from 'js-cookie'
import apiInstance from '../service/apiInstance'

const TodoApp = () => {
    const params = useParams()
    const [user, setUser] = useState(Cookies.get("username"))
    const [alert, setAlert] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [id, setId] = useState(0)
    const [todoItem, setTodoItem] = useState('')
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
    const [newTodoItem, setNewTodoItem] = useState('');
    const newTodoList = [...todoList]

    const {status} = useQuery('todo', () => {
        return apiInstance.get('todo') 
    }, {
        onSuccess: data => {
            setTodoList(data.data.data)
            setDoingList(data.data.data.filter((todo => todo.status === "doing")))
        }
    })

    const add = (todo) => {
        return apiInstance.post('todo', todo)
    }

    const {mutate: addItem, error} = useMutation(add, {
        onSuccess: (data) => {
            setShowAlert(true)
            setAlert(data.data.message)
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
    })

    const addTodo = (e) => {
        e.preventDefault();
        if (todoItem.trim() !== ''){
            const item = {
                title: todoItem
            }
            addItem(item)
        }
        setTodoList([...todoList, {
            id: Math.floor(Math.random() * 100),
            title: todoItem,
            done: false,
            doing: false,  
            todo: true,
            isEditing: false
        }])
        setTodoItem('')
    }
    const edit = (item) => {
        return apiInstance.patch(`todo/${id}`, item)
    }

    const {mutate: saveItem, error: saveError} = useMutation(edit, {
        onSuccess: (data) => {
            setShowAlert(true)
            setAlert(data.data.message)
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
    })
    
    const editItem = (index) => {
        newTodoList[index].isEditing = true
        setTodoList(newTodoList)
    }

    const save = (e, index, todo) => {
        e.preventDefault();
        newTodoList[index].isEditing = false
        setId(todo.id)
        if(newTodoItem.length !== 0){
            newTodoList[index].title = newTodoItem 
            setTodoList(newTodoList)
            const item = {
                title: newTodoItem
            }
            // console.log(id)
            saveItem(item)
        } else {
            setTodoList(newTodoList)
        }
    }

    const deleteItem = (id) => {
        return apiInstance.delete(`todo/${id}`)
    }

    const {mutate: deleteTodo, error: deleteError} = useMutation(deleteItem, {
        onSuccess: (data) => {
            setShowAlert(true)
            setAlert(data.data.message)
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
    })

    const deleteTodoItem = (index, id) => {
        newTodoList.splice(index, 1)
        setTodoList(newTodoList)
        deleteTodo(id)
    }

    const doing = (id, item) => {
        return apiInstance.patch(`todo/${id}`, item)
    }

    const {mutate: moveDoing, error: doingError} = useMutation(doing, {
        onSuccess: (data) => {
            setShowAlert(true)
            setAlert(data.data.message)
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
    })

    const addDoing = (todo) => {
        setDoingList([...doingList, {
            title: todo.title,
            id: todo.id,
            status: todo.status
        }])
        setTodoList(
            todoList.filter((item) => item.id !== todo.id)
        )
        // console.log('doing', doingList)
        doing(todo.id, {
            status: "doing"
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
            setAlert(error)
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
                setAlert(error)
            })
        axios
            .delete(`https://6391a596b750c8d178c8e2e7.mockapi.io/users/${params.id}/doing/${todo.id}`)
            .catch((error) => {
                setAlert(error)
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

    localStorage.setItem('doneList', JSON.stringify(doneList))

    return (  
        <div>
            {status === 'loading' && 
                <div className='todo-loader'>
                    <Loader></Loader>
                </div>
            }
            { status !== 'loading' && 
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
                {}
                {showAlert && <p className='alert'>{alert}</p>}
                {error && <p className='error'>{error?.response.data.message}</p>}
                <div className="todo-list">
                    <div className="todo">
                        <h2>todo</h2>
                        {saveError && <p className='error'>{saveError?.response.data.message}</p>}
                        {deleteError && <p className='error'>{deleteError?.response.data.message}</p>}
                        {todoList.map((todo, index) => (
                            <ul key={todo.id}>
                                {!todo.isEditing ?
                                        <li className="not-editing">
                                            <input type="checkbox" name="done" id="done" onClick={() => [addDoing(todo)]}/>
                                            <p>{todo.title}</p>
                                            <button onClick={() => editItem(index)}> Edit
                                            </button>
                                            <button onClick={() => deleteTodoItem(index, todo.id)}>Delete</button>
                                        </li>
                                        :
                                    <li>
                                        <form onSubmit={(e) => save(e, index, todo)} className="editing">
                                            <input type="text" name="editItem" id="editItem" className="edit-item" defaultValue={todoList[index].title}  onChange={(e) => setNewTodoItem(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))} autoFocus />
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
                                            <p>{todo.title}</p>
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
                                     <li className="done-box">
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