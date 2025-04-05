import { AppKitProvider } from "./components/WalletConnect";
import Home from "./pages/Home/page";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Onboard from "./pages/Onboard/page";
import ProtectedRoute from "./components/ProtectedRoute";
import Help from "./pages/(app)/Help";
import Services from "./pages/(app)/Services";
import MyCampaign from "./pages/(app)/MyCampaign";
import CampaignDetail from "./pages/(app)/CampaignDetail";

const App = () => {
  return (
    <AppKitProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboard" element={<Onboard />} />
          <Route path="" element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<MyCampaign />} />
            <Route path="/dashboard/:id" element={<CampaignDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/help" element={<Help />} />
          </Route>
        </Routes>
      </Router>
    </AppKitProvider>
  );
};

export default App;
