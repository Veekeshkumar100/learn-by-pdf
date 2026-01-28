import { LogIn } from "lucide-react"
import React  from "react"
import {Router,Route,Routes,Navigate} from "react-router-dom"
import Login from "./pages/Auth/login"
import Register from "./pages/Auth/resigster"
import ProfilePage from "./pages/ProfilePage/Profilepage"
import QuizzerTakePage from "./pages/quizzers/quizzerTakPage"
import QuizzerResultPage from "./pages/quizzers/quizzerResultPage"
import FlashCardListPage from "./pages/flashcard/fllashCardListPage"
import FlashCardsPage from "./pages/flashcard/flashCArsPage"
import DocumentDetailPage from "./pages/document/documentDetailPage"
import DocumentListPage from "./pages/document/documentListPage"
import DaskboardPage from "./pages/daskboard/daskboardPage"
import ProtectedRoute from "./component/protectedRout/ProtectedRout"
function App() {
 isAuthenticated = false
  loding=false
  
  if(isAuthenticated){
    return (
      <div className=" flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<h1>Home Page</h1>} />
        <Route path="/dashboard" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />

        <Route element={<ProtectedRoute/>}>
          <Route path="/dashboard" element={<DaskboardPage/>} />
          <Route path="/documents" element={<DocumentListPage/>} />
          <Route path="/documents/:id" element={<DocumentDetailPage/>} />
          <Route path="/documents/:id/flashcards" element={<FlashCardsPage/>} />
          <Route path="/flashCard" element={<FlashCardListPage />} />
          <Route path="/quizzerresult/:quizeId/result" element={<QuizzerResultPage/>} />
          <Route path="/quizzes/:quizId" element={<QuizzerTakePage/>} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
