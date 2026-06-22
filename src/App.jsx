import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Curriculum from './pages/Curriculum'
import ModulePage from './pages/Module'
import Exercise from './pages/Exercise'
import QuizPage from './pages/QuizPage'
import Progress from './pages/Progress'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/module/:moduleId" element={<ModulePage />} />
            <Route path="/exercise/:moduleId" element={<Exercise />} />
            <Route path="/quiz/:moduleId" element={<QuizPage />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
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
