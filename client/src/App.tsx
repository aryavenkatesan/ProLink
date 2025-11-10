import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import Landing from "@/pages/landing";
import StudentRegister from "@/pages/student-register";
import ProfessionalRegister from "@/pages/professional-register";
import StudentDashboard from "@/pages/student-dashboard";
import ProfessionalDashboard from "@/pages/professional-dashboard";
import AuthPage from "@/pages/auth-page";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={Landing} />
      <ProtectedRoute path="/student/register" component={StudentRegister} />
      <ProtectedRoute path="/professional/register" component={ProfessionalRegister} />
      <ProtectedRoute path="/student/dashboard/:id" component={StudentDashboard} />
      <ProtectedRoute path="/professional/dashboard/:id" component={ProfessionalDashboard} />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
