import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup'
import Navbar from './components/NavBar/NavBar'
import AdminPanel from './pages/Admin/AdminPanel'

function App() {
  const { user } = useAuthContext();
  const isAdmin = user?.roles.includes(2000);

  return (
    <div className="App">
      <BrowserRouter>
        {user && <Navbar />}
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
            <Route 
              path="/admin" 
              element={isAdmin ? <AdminPanel /> : <Navigate to="/" />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
