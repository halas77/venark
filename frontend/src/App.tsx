import { AppKitProvider } from "./components/WalletConnect";
import Home from "./pages/Home/page";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Onboard from "./pages/Onboard/page";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/(app)/Dashboard";
import Help from "./pages/(app)/Help";
import Services from "./pages/(app)/Services";
import MyCampaign from "./pages/(app)/MyCampaign";

const App = () => {
  return (
    <AppKitProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboard" element={<Onboard />} />

          <Route path="" element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/campaigns" element={<MyCampaign />} />
            <Route path="/services" element={<Services />} />
            <Route path="/help" element={<Help />} />
          </Route>
        </Routes>
      </Router>
    </AppKitProvider>
  );
};

export default App;
