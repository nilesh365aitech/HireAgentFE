import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUp from "./pages/Signup";
import Login from "./pages/login";
import Home from "./pages/Home";
import Buyer from "./pages/Buyer";
import Seller from "./pages/Sellerrs";
import Product from "./pages/Product";
import Dashboard from "./pages/Dashboard";
import ActualProduct from "./pages/ActualProduct";
import LeadsList from "./pages/LeadList";
import LeadDetails from "./pages/LeadDetails";
import AssistantsManagement from "./pages/AssistantManagement";
import EditAssistantModal from "./pages/AssistantManagement";
import BuyerDashboard from "./pages/BuyerDashboard";
import CustomerOverview from "./pages/CustomerOverview";
import SellerDashboard from "./pages/SellerDashboard";
import BotOverview from "./pages/MyBots";
import RazorPay from "./pages/Razorpay";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/buyers" element={<Buyer />} />
        <Route path="/sellers" element={<Seller />} />
        {/* <Route path="/product" element={<Product />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/product/:id" element={<ActualProduct />} /> */}
        <Route path="/assistantmanagement" element={<AssistantsManagement />} />
        <Route path="/lead" element={<LeadsList />} />
        <Route path="/lead/:id" element={<LeadDetails />} />
        <Route path="/buyerdashboard" element={<BuyerDashboard/>} />
        <Route path="/customeroverview" element={<CustomerOverview/>} />
        <Route path="/sellerdashboard" element={<SellerDashboard/>} />
        <Route path="/botoverview" element={<BotOverview/>} />
        {/* <Route path="/razorpay" element={<RazorPay/>} /> */}
        <Route path="/*" element={<Home/>} />
      </Routes>
    </Router>
  );
};

export default App;








