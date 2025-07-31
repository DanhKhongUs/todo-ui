import Header from "../Layouts/Header";
import Main from "../Layouts/Main";
import { useAuth } from "../contexts/auth/AuthContext";
import TodoAppPage from "./TodoAppPage";

function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <>
      <Header />
      <div>{isAuthenticated ? <TodoAppPage /> : <Main />}</div>
    </>
  );
}

export default Home;
