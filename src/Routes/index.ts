import routes from "./routes";

import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ChangePassword from "../pages/ChangePassword";
import ForgotPassword from "../pages/ForgotPasswordPage";
import EmailVerification from "../pages/EmailVerification";
import TodoAppPage from "../pages/TodoAppPage";

const publicRouter = [
  { path: routes.home, component: Home },
  { path: routes.signin, component: SignIn },
  { path: routes.signup, component: SignUp },
  { path: routes.todoapp, component: TodoAppPage },
  { path: routes.changepassword, component: ChangePassword },
  { path: routes.emailVerification, component: EmailVerification },
  { path: routes.forgotPassword, component: ForgotPassword },
];

const privateRouter = [];

export { publicRouter, privateRouter };
