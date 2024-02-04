import './App.css';
import { Routes, Route } from "react-router-dom";
import DashboardAdmin from "./views/dashboardAdmin/dashboardAdmin";
// import EditProperty from "./views/editProperty/editProperty";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardAdmin />} />
      {/* <Route path="/edit/:id" element={<EditProperty />} /> */}
    
    </Routes>
  )
}

export default App
