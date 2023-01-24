import "./App.css";
import LoginTodo from "./todo-components/LoginTodo";
import SignUp from "./todo-components/SignUp";
import TodoApp from "./todo-components/TodoApp";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
