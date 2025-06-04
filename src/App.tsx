import { HashRouter, Route, Routes } from "react-router-dom";
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
    <HashRouter>
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<ProjectDetails />} path="/project" />
        <Route element={<Team />} path="/team" />
        <Route element={<VideoRequestForm />} path="/videoRequest" />
        <Route path="pages/:pageId" element={<CreatedPages />} />
        <Route path="posts/:postId" element={<PostDetail />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
