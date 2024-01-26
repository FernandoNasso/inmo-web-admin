import './App.css';
import { Routes, Route } from "react-router-dom";
import DashboardAdmin from "./views/dashboardAdmin/dashboardAdmin";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardAdmin />} />
    
    </Routes>
  )
}

export default App
