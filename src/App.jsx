import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUp from "./pages/Signup";
import Login from "./pages/login"
import Home from "./pages/Home";
import Buyer from "./pages/Buyer";
import Seller from "./pages/Sellerrs";
import Product from "./pages/Product";
import Dashboard from "./pages/Dashboard";
import ActualProduct from "./pages/ActualProduct";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/buyers" element={<Buyer />} />
        <Route path="/sellers" element={<Seller />} />
        <Route path="/product" element={<Product />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:id" element={<ActualProduct />} />
        
      </Routes>
    </Router>
  )
}

export default App