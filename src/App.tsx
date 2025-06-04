import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "@/pages/index";
import ProjectDetails from "./pages/HomeContent/ProjectDetails";
import AdminLogin from "./components/AdminDashboard/AdminLogin";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatedPages from "./pages/CreatedPages";
import Team from "./pages/team";
import PostDetail from "./pages/PostDetails";
import VideoRequestForm from "./pages/HomeContent/VideoRequest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/project" element={<ProjectDetails />} />
        <Route path="/team" element={<Team />} />
        <Route path="/videoRequest" element={<VideoRequestForm />} />
        <Route path="/pages/:pageId" element={<CreatedPages />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        {/* Geçersiz URL’ler için fallback */}
        <Route path="*" element={<IndexPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
