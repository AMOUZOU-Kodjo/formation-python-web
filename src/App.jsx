import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import Home from './pages/Home'
import Curriculum from './pages/Curriculum'
import ModulePage from './pages/Module'
import Exercise from './pages/Exercise'
import QuizPage from './pages/QuizPage'
import Progress from './pages/Progress'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminStudents from './pages/admin/AdminStudents'
import AdminCourses from './pages/admin/AdminCourses'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/module/:moduleId" element={<ProtectedRoute><ModulePage /></ProtectedRoute>} />
            <Route path="/exercise/:moduleId" element={<ProtectedRoute><Exercise /></ProtectedRoute>} />
            <Route path="/quiz/:moduleId" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
            <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/students" element={<AdminRoute><AdminStudents /></AdminRoute>} />
            <Route path="/admin/courses" element={<AdminRoute><AdminCourses /></AdminRoute>} />
            <Route path="*" element={
              <div className="text-center py-20">
                <h1 className="text-6xl font-bold text-primary">404</h1>
                <p className="text-base-content/60 mt-2">Page introuvable</p>
                <a href="/" className="btn btn-primary btn-sm mt-4">Retour à l'accueil</a>
              </div>
            } />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  )
}
