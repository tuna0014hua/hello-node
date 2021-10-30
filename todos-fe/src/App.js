import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { TodoList, TodoForm, TodoItem } from "./components/Todo";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import NotAuth from "./components/NotAuth";
import Footer from "./components/Footer";
import "bulma/css/bulma.min.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container pt-6 pb-5">
        <div className="columns mt-5">
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/todos/:currentPage?" exact>
              <TodoList />
            </Route>
            <Route path="/todo/:todoId">
              <TodoItem />
            </Route>
            <Route path="/edit/:todoId">
              <TodoForm />
            </Route>
            <Route path="/add" exact>
              <TodoForm />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/register" exact>
              <Register />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
