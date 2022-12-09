// import logo from './logo.svg';
import './App.css';
import LoginTodo from './todo-components/LoginTodo';
import SignUp from './todo-components/SignUp';
import TodoApp from './todo-components/TodoApp';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
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
          <Route path="/:id">
            <TodoApp></TodoApp>
          </Route> 
        </Switch>
      </div>
    </Router>
  );
}

export default App;
