// import logo from './logo.svg';
import './App.css';
import LoginTodo from './todo-components/LoginTodo';
import SignUp from './todo-components/SignUp';
import TodoApp from './todo-components/TodoApp';
import {useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  const [todoList, setTodoList] = useState([])
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LoginTodo></LoginTodo>
          </Route>
          <Route path="/signup">
            <SignUp></SignUp>
          </Route> 
          <Route path="/todo">
            <TodoApp></TodoApp>
          </Route> 
        </Switch>
      </div>
    </Router>
  );
}

export default App;
