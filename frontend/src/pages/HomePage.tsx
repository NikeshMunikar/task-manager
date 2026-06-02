import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function HomePage() {
  const {isAuthenticated, logout} = useAuth()
  return (
    <>
    <h1>Task Manager</h1>
    {!isAuthenticated?(
      <>
      <Link to="/login">Login</Link>
      <br/>
      <Link to="/register">Register</Link>
      </>
    ):(
      <>
      <Link to ="/tasks">Go to Tasks</Link>
      <br/>
      <button onClick={logout}>Logout</button>
      </>
    )}
    
    </>
  );
};

export default HomePage;
