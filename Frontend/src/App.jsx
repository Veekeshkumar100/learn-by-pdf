import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/resigster";
import ProfilePage from "./pages/ProfilePage/Profilepage";
import QuizzerTakePage from "./pages/quizzers/quizzerTakPage";
import QuizzerResultPage from "./pages/quizzers/quizzerResultPage";
import FlashCardListPage from "./pages/flashcard/fllashCardListPage";
import FlashCardsPage from "./pages/flashcard/flashCArsPage";
import DocumentListPage from "./pages/document/documentListPage";
import DaskboardPage from "./pages/flashcard/DaskboardPage.jsx";
import ProtectedRoute from "./component/protectedRout/ProtectedRout";
import { useAuth } from "./context/AuthContext";
import Applayout from "./component/layout/Applayout.jsx";
import DocumentsDetailPage from "./pages/document/documentsDetailPage.jsx";

function App() {
  const {isAuthenticat,lodding} =useAuth();
  console.log(isAuthenticat);
  if (lodding) {
    return (
      <div className=" flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <Routes>
   
       <Route
  path="/"
  element={
    isAuthenticat ? (
      <Navigate to="/dashboard" replace />
    ) : (
      <Navigate to="/login" replace />
    )
  }
/>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Applayout/>}/>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DaskboardPage/>}/>
        <Route path="/documents" element={<DocumentListPage />} />
        <Route path="/documents/:id" element={<DocumentsDetailPage />} />
        <Route path="/documents/:id/flashcards" element={<FlashCardsPage />} />
        <Route path="/flashCard" element={<FlashCardListPage />} />
        <Route
          path="/quizzerresult/:quizeId/result"
          element={<QuizzerResultPage />}
        />
        <Route path="/quizzes/:quizId" element={<QuizzerTakePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
