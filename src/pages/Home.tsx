import Header from "../Layouts/Header";
import Main from "../Layouts/Main";
import TodoApp from "./TodoApp";
import { useAuth } from "../contexts/auth/AuthContext";

function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <>
      <Header />
      <div>{isAuthenticated ? <TodoApp /> : <Main />}</div>
    </>
  );
}

export default Home;
