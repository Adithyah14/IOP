import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MeasureIOP from "./pages/MeasureIOP";
import ViewPatients from "./pages/ViewPatients";
import AddPatient from "./pages/AddPatient";
import PatientReport from "./pages/PatientReport";
import PatientDashboard from "./pages/PatientDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/measure-iop" element={<MeasureIOP />} />
            <Route path="/view-patients" element={<ViewPatients />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/patient-report/:id" element={<PatientReport />} />
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
