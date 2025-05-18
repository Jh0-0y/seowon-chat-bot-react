import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChatPage from '@/pages/main/ChatPage'
import LoginPage from '@/pages/auth/login/LoginPage'
import RegisterPage from '@/pages/auth/register/RegisterPage'


const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ChatPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
    </Routes>
  </BrowserRouter>
)

export default AppRoutes