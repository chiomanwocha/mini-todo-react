import '../css/todo.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Loader from './Loader'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import Cookies from 'js-cookie'
import apiInstance from '../service/apiInstance'
import { Icon } from '@iconify/react';

const TodoApp = () => {
    const queryClient = useQueryClient();
    const [user, setUser] = useState(Cookies.get("username"))
    const [alert, setAlert] = useState('')
    const [id, setId] = useState(null)
    const [newTodoItem, setNewTodoItem] = useState('');
    const [todoItem, setTodoItem] = useState('')
    const [doingItem, setDoingItem] = useState('')
    const [doneItem, setDoneItem] = useState('')
    const [updating, setUpdating] = useState(false)
    const [showCardTodo, setShowCardTodo] = useState(false)
    const [showCardDoing, setShowCardDoing] = useState(false)
    const [showCardDone, setShowCardDone] = useState(false)

    const {status, data} = useQuery(['get_todo'], () => {
        return apiInstance.get('todo') 
    })

    const add = (todo) => {
        return apiInstance.post('todo', todo)
    }

    const {mutate: addItem, error: todoError, isLoading: todoLoading} = useMutation(add, {
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

    const {mutate: addDoingItem, error:doingError , isLoading: doingLoading} = useMutation(add, {
        onSuccess: () => {
            queryClient.invalidateQueries('get_todo');
        }
    })

    const doingAdd = (e) => {
        e.preventDefault();
        if (doingItem.trim() !== ''){
            const item = {
                title: doingItem,
                status: "doing"
            }
            addDoingItem(item)
        }
        setDoingItem('')
    }
    const {mutate: addDoneItem, error:doneError , isLoading: doneLoading} = useMutation(add, {
        onSuccess: () => {
            queryClient.invalidateQueries('get_todo');
        }
    })

    const doneAdd = (e) => {
        e.preventDefault();
        if (doneItem.trim() !== ''){
            const item = {
                title: doneItem,
                status: "done"
            }
            addDoneItem(item)
        }
        setDoneItem('')
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
                {todoError && <p className='error'>{todoError?.response.data.message}</p>}
                {doingError && <p className='error'>{doingError?.response.data.message}</p>}
                {(todoLoading || doingLoading || doneLoading || updating) && <p className='alert'>Updating todos...</p>}
                            {isDeleting ? 
                                <p className='error'>Deleting... kindly hold on</p>
                                : null
                            }

                <div className="todo-list">
                    <div>
                        <h2>todo</h2>
                            {saveError && <p className='error'>{saveError?.response.data.message}</p>}
                        <>
                            <ul className="todo">
                                {data?.data?.data?.filter((data) => data.status === "todo").map((todo) => (
                                            <li className="not-editing" key={todo?.id}>
                                                {id !== todo.id ? 
                                                <div className='not-editing'>
                                                    <input type="checkbox" name="done" id="done" onClick={() => addDoing(todo.id)}/>
                                                    <p>{todo.title}</p> 
                                                    <div className='todo-buttons'>
                                                        <button onClick={() => setId(todo.id)}> Edit
                                                        </button>
                                                        <button onClick={() => deleteTodoItem(todo.id)}>Delete</button>
                                                    </div>
                                                </div>
                                                :
                                                       <form onSubmit={saveTodo} className="editing">
                                                       <input type="text" name="editItem" id="editItem" defaultValue={todo?.title} className="edit-item" onChange={(e) => setNewTodoItem(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))} autoFocus />
                                                           <button type='submit'>
                                                            {savingItem ? 'Saving..' : 'Save'}
                                                           </button>
                                                       </form>
                                                }
                                </li>
                                )
                                )}
                                </ul>
                                {showCardTodo ?
                                    <form onSubmit={(e) => addTodo(e)}>
                                        <div></div>
                                        <input type="text" name="todo-item" id="todo-item" placeholder="enter title for this card" required className="details"  value={todoItem} onChange={(e) => setTodoItem(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))} autoFocus/>
                                        <button className='add-card'>add a card</button>
                                        <button className='close-button' onClick={() => setShowCardTodo(false)} >X</button>
                                    </form>
                                :
                                <div className='add-button' onClick={() => setShowCardTodo(true)}>
                                    <Icon icon="material-symbols:add" />
                                    <p>add a card</p>
                                </div>
                                }
                        </>
                    </div>
                    <div>
                        <h2>doing</h2>
                        <ul className="doing">
                            {data?.data?.data?.filter((data) => data.status === "doing").map((todo) => (
                                        <li className="doing-box" key={todo.id}>
                                            <p>{todo.title}</p>
                                            <div className='doing-button'>
                                                <button onClick={() => revertDoing(todo.id)}>Undo</button>
                                                <button onClick={() => addDone(todo.id)}>Done</button>
                                            </div>
                                        </li>
                                )
                                )}
                        </ul>
                        {showCardDoing ?
                                    <form onSubmit={(e) => doingAdd(e)}>
                                        <input type="text" name="todo-item" id="todo-item" placeholder="enter title for this card" required className="details"  value={doingItem} onChange={(e) => setDoingItem(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))} autoFocus/>
                                        <button className='add-card'>add a card</button>
                                        <button className='close-button' onClick={() => setShowCardDoing(false)} >X</button>
                                    </form>
                                :
                                <div className='add-button' onClick={() => setShowCardDoing(true)}>
                                    <Icon icon="material-symbols:add" />
                                    <p>add a card</p>
                                </div>
                                }
                    </div>
                    <div>
                        <h2>done</h2>
                        <ul className="todo-done">
                        {data?.data?.data?.filter((data) => data.status === "done").map((todo) => (
                                     <li className="done-box" key={todo.id}>
                                        <input type="checkbox" name="done" id="done" checked={todo.status === "done"} onChange={() => addDoing(todo.id)}/>
                                        <p>{todo.title}</p>
                                        </li>
                            )
                            )}
                            </ul>
                            {showCardDone ?
                                    <form onSubmit={(e) => doneAdd(e)}>
                                        <input type="text" name="todo-item" id="todo-item" placeholder="enter title for this card" required className="details"  value={doneItem} onChange={(e) => setDoneItem(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))} autoFocus/>
                                        <button className='add-card'>add a card</button>
                                        <button className='close-button' onClick={() => setShowCardDone(false)} >X</button>
                                    </form>
                                :
                                <div className='add-button' onClick={() => setShowCardDone(true)}>
                                    <Icon icon="material-symbols:add" />
                                    <p>add a card</p>
                                </div>
                                }
                    </div> 
                </div>
            </div>
            
            }
        </div>
    );
}

export default TodoApp;