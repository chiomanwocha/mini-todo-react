import '../css/todo.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Loader from './Loader'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import Cookies from 'js-cookie'
import apiInstance from '../service/apiInstance'

const TodoApp = () => {
    const queryClient = useQueryClient();
    const [user, setUser] = useState(Cookies.get("username"))
    const [alert, setAlert] = useState('')
    const [id, setId] = useState(null)
    const [newTodoItem, setNewTodoItem] = useState('');
    const [todoItem, setTodoItem] = useState('')
    const [updating, setUpdating] = useState(false)

    const {status, data} = useQuery(['get_todo'], () => {
        return apiInstance.get('todo') 
    })

    const add = (todo) => {
        return apiInstance.post('todo', todo)
    }

    const {mutate: addItem, error, isLoading} = useMutation(add, {
        onSuccess: () => {
            queryClient.invalidateQueries('get_todo');
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
        setTodoItem('')
    }

    const edit = (item) => {
        return apiInstance.patch(`todo/${id}`, item)
    }

    const {mutate: saveItem, error: saveError, isLoading: savingItem} = useMutation(edit, {
        onSuccess: () => {
            queryClient.invalidateQueries('get_todo');
            setId(null);
        }
    });

    const saveTodo = (e) => {
        e.preventDefault();
        saveItem({ title: newTodoItem });
    }

    const deleteItem = (id) => {
        return apiInstance.delete(`todo/${id}`)
    }

    const {mutate: deleteTodo, error: deleteError, isLoading: isDeleting} = useMutation(deleteItem, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('get_todo');
            setAlert(data.data.message);
        }
    })

    const deleteTodoItem = (id) => {
        deleteTodo(id);
    };

    const addDoing = (id) => {
        const isDoing = { status: 'doing' };
        setUpdating(true);
        try {
            apiInstance.patch(`todo/${id}`, isDoing)
            .then((res) => { queryClient.invalidateQueries('get_todo'); return res})
            .finally((res) => {setUpdating(false); return res})
            .catch((err) => console.log(err))
        } catch (error) {
            console.log(error);
        }
    }

    const addDone = (id) => {
        const isDone = { status: "done" };
        setUpdating(true);
        try {
            apiInstance.patch(`todo/${id}`, isDone)
            .then((res) => { queryClient.invalidateQueries('get_todo'); return res})
            .finally((res) => {setUpdating(false); return res})
            .catch((err) => console.log(err))
        } catch (error) {
            console.log(error);
        }
    }
    const revertDoing = (id) => {
            const isTodo = { status: 'todo' };
            setUpdating(true);
            try {
                apiInstance.patch(`todo/${id}`, isTodo)
                .then((res) => { queryClient.invalidateQueries('get_todo'); return res})
                .finally((res) => {setUpdating(false); return res})
                .catch((err) => console.log(err))
            } catch (error) {
                console.log(error);
            }
    }

    return (  
        <div>
            {status === 'loading' ?
                <div className='todo-loader'>
                    <Loader className='todo-loader'></Loader>
                </div>
            :
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
                {(isLoading || updating) && <p style={{ margin: '10px 0' }}>Updating todos...</p>}
                {isDeleting ? 
                    <p className='alert'>Deleting... kindly hold on</p>
                    : null
                }
                <div className="todo-list">
                    <div className="todo">
                        <h2>todo</h2>
                        <>
                            {saveError && <p className='error'>{saveError?.response.data.message}</p>}
                            {data?.data?.data?.filter((data) => data.status === "todo").map((todo) => (
                                <ul key={todo?.id}>
                                            <li className="not-editing">
                                                {id !== todo.id ? 
                                                <div className='not-editing'>
                                                    <input type="checkbox" name="done" id="done" onClick={() => addDoing(todo.id)}/>
                                                    <p>{todo.title}</p> 
                                                    <button onClick={() => setId(todo.id)}> Edit
                                                    </button>
                                                    <button onClick={() => deleteTodoItem(todo.id)}>Delete</button>
                                                </div>
                                                :
                                                       <form onSubmit={saveTodo} className="editing">
                                                       <input type="text" name="editItem" id="editItem" defaultValue={todo?.title} className="edit-item" onChange={(e) => setNewTodoItem(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))} autoFocus />
                                                           <button type='submit'>
                                                            {savingItem ? 'Saving...' : 'Save'}
                                                           </button>
                                                       </form>
                                                }
                                            </li>
                                </ul>
                                )
                            )}
                        </>
                    </div>
                    <div className="doing">
                        <h2>doing</h2>
                            {data?.data?.data?.filter((data) => data.status === "doing").map((todo) => (
                                    <ul key={todo.id}>
                                        <li className="doing-box" key={todo.id}>
                                            <p>{todo.title}</p>
                                            <div>
                                                <button onClick={() => revertDoing(todo.id)}>Undo</button>
                                                <button onClick={() => addDone(todo.id)}>Done</button>
                                            </div>
                                        </li>
                                    </ul>
                                )
                            )}
                    </div>
                    <div className="todo-done">
                        <h2>done</h2>
                        {data?.data?.data?.filter((data) => data.status === "done").map((todo) => (
                                <ul key={todo.id}>
                                     <li className="done-box">
                                        <input type="checkbox" name="done" id="done" checked={todo.status === "done"} onChange={() => addDoing(todo.id)}/>
                                        <p>{todo.title}</p>
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