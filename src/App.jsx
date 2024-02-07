
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from './components/utils/protected/ProtectedRoute.jsx';
import Login from "./components/pages/login/Login.jsx";
import Signup from "./components/pages/signup/Signup.jsx";
import Dashboard from "./components/pages/dashboard/Dashboard.jsx";
function App() {


  return (
    <>
      <Routes>
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={
          <ProtectedRoute>

            <Dashboard />


          </ProtectedRoute>
        } />









      </Routes>


      {/* 
      <Layout>
         <ImportContact />
         <Dashboard/>
         <ImportContact /> 
         <ImportContact /> 
        <ImportContact /> 
      </Layout> */}

    </>
  )
}

export default App
