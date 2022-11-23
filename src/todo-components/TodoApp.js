import '../css/todo.css'
import { Link } from 'react-router-dom'
const TodoApp = () => {
    return ( 
        <div className="todo-app">
        <div className="greetings">
            <p >hi, Chioma !</p>
            <Link to="/"><button>logout</button></Link>
        </div>
        <h1>todos</h1>
        <input type="text" name="todo-item" id="todo-item" placeholder="What do you need to do ?" required />
        <button className="add-todo">add</button>
        <div className="todo-list">
            <div className="todo">
                <h2>todo</h2>
                <ul>
                    <li className="not-editing">
                        <input type="checkbox" name="done" id="done" />
                        {/* {{todoItem.item}} */}
                        <p>ITEM HERE</p>
                        <button >Edit</button>
                        <button>Delete</button>
                    </li>
                    <li className="editing">
                        <input type="text" name="editItem" id="editItem" />
                        <button>Save</button>
                    </li>
                </ul>
            </div>
            <div className="doing">
                <h2>doing</h2>
                <ul>
                    <li className="doing-box">
                       <p>DOING ITEM</p>
                        <div>
                            <button>Undo</button>
                            <button>Done</button>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="todo-done">
                <h2>done</h2>
                <ul>
                    <li>
                        <input type="checkbox" name="done" id="done" />
                        <p>DONE ITEM</p>
                    </li>
                </ul>
            </div>
            
        </div>
    </div>
     );
}
 
export default TodoApp;