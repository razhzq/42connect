import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login/Login';
import Chatroom from './pages/Chatroom/Chatroom';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route  path="/" element={<Login />} />
        <Route  path="/chatroom" element={<Chatroom />} />
        </Routes>
    </Router>
     
    </>
  )
}

export default App
