import routes from "./routes";

import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import TodoApp from "../pages/TodoApp";
import ChangePassword from "../pages/ChangePassword";
import ForgotPassword from "../pages/ForgotPasswordPage";
import EmailVerification from "../pages/EmailVerification";

const publicRouter = [
  { path: routes.home, component: Home },
  { path: routes.signin, component: SignIn },
  { path: routes.signup, component: SignUp },
  { path: routes.todoapp, component: TodoApp },
  { path: routes.changepassword, component: ChangePassword },
  { path: routes.emailVerification, component: EmailVerification },
  { path: routes.forgotPassword, component: ForgotPassword },
];

const privateRouter = [];

export { publicRouter, privateRouter };
