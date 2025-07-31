import { JSX } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import ChangePassword from "./pages/ChangePassword";
import EmailVerification from "./pages/EmailVerification";
import routes from "./routes/routes";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import TodoAppPage from "./pages/TodoAppPage";

function App(): JSX.Element {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.todoapp} element={<TodoAppPage />} />
        <Route path={routes.signin} element={<SignIn />} />
        <Route path={routes.signup} element={<SignUp />} />
        <Route path={routes.changepassword} element={<ChangePassword />} />
        <Route
          path={routes.emailVerification}
          element={<EmailVerification />}
        />
        <Route path={routes.forgotPassword} element={<ForgotPasswordPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
