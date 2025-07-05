import routes from "./routes";

import Home from "../Components/Home";
import SignIn from "../Components/SignIn";
import SignUp from "../Components/SignUp";
import TodoApp from "../Components/TodoApp";

const publicRouter = [
  { path: routes.home, component: Home },
  { path: routes.signin, component: SignIn },
  { path: routes.signup, component: SignUp },
  { path: routes.todoapp, component: TodoApp },
];

const privateRouter = [];

export { publicRouter, privateRouter };
