import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/landing";
import StudentRegister from "@/pages/student-register";
import ProfessionalRegister from "@/pages/professional-register";
import StudentDashboard from "@/pages/student-dashboard";
import ProfessionalDashboard from "@/pages/professional-dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/student/register" component={StudentRegister} />
      <Route path="/professional/register" component={ProfessionalRegister} />
      <Route path="/student/dashboard/:id" component={StudentDashboard} />
      <Route path="/professional/dashboard/:id" component={ProfessionalDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
