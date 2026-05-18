
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';


import Home       from './pages/Home';
import Login      from './pages/Login';
import Register   from './pages/Register';
import Profile    from './pages/Profile';
import Dashboard  from './pages/admin/Dashboard';
import ManageBooks from './pages/admin/ManageBooks';
import ManageUsers from './pages/admin/ManageUsers';


import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute     from './routes/AdminRoute';

function App() {
  return (
  
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/"         element={<Home />} />
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

  
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

        
          <Route path="/dashboard" element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          } />

          <Route path="/manage/books" element={
            <AdminRoute>
              <ManageBooks />
            </AdminRoute>
          } />

          <Route path="/manage/users" element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          } />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;