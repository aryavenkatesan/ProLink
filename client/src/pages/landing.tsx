import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Briefcase, Users, Target, TrendingUp, Award, LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";

export default function Landing() {
  const [, setLocation] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [isLoadingStudent, setIsLoadingStudent] = useState(false);
  const [isLoadingProfessional, setIsLoadingProfessional] = useState(false);

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    setLocation("/");
  };

  const handleStudentClick = async () => {
    if (!user) {
      setLocation("/auth");
      return;
    }

    setIsLoadingStudent(true);
    try {
      const res = await apiRequest("GET", "/api/student/check");
      const data = await res.json();
      if (data.completed) {
        setLocation(`/student/dashboard/${data.id}`);
      } else {
        setLocation("/student/register");
      }
    } catch (error) {
      setLocation("/student/register");
    } finally {
      setIsLoadingStudent(false);
    }
  };

  const handleProfessionalClick = async () => {
    if (!user) {
      setLocation("/auth");
      return;
    }

    setIsLoadingProfessional(true);
    try {
      const res = await apiRequest("GET", "/api/professional/check");
      const data = await res.json();
      if (data.completed) {
        setLocation(`/professional/dashboard/${data.id}`);
      } else {
        setLocation("/professional/register");
      }
    } catch (error) {
      setLocation("/professional/register");
    } finally {
      setIsLoadingProfessional(false);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">ProLink</span>
          </div>
          <nav className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">Welcome, {user.username}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  data-testid="button-logout"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {logoutMutation.isPending ? "Logging out..." : "Logout"}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={handleStudentClick}
                  disabled={isLoadingStudent}
                  data-testid="link-student-login"
                >
                  {isLoadingStudent ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Student Portal
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleProfessionalClick}
                  disabled={isLoadingProfessional}
                  data-testid="link-professional-login"
                >
                  {isLoadingProfessional ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Professional Portal
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Connect Students with Industry Professionals
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                ProLink bridges the gap between ambitious students and experienced professionals.
                Find mentorship, internship opportunities, and job shadowing experiences tailored to your career goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto min-h-12 px-8"
                  onClick={handleStudentClick}
                  disabled={isLoadingStudent}
                  data-testid="button-student-cta"
                >
                  {isLoadingStudent ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <GraduationCap className="mr-2 h-5 w-5" />}
                  I'm a Student
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto min-h-12 px-8"
                  onClick={handleProfessionalClick}
                  disabled={isLoadingProfessional}
                  data-testid="button-professional-cta"
                >
                  {isLoadingProfessional ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Briefcase className="mr-2 h-5 w-5" />}
                  I'm a Professional
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl blur-3xl"></div>
                <Card className="relative">
                  <CardContent className="p-12 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">1,200+ Matches Made</p>
                        <p className="text-sm text-muted-foreground">This semester</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">500+ Professionals</p>
                        <p className="text-sm text-muted-foreground">Ready to mentor</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">15 Industries</p>
                        <p className="text-sm text-muted-foreground">Across all sectors</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">Three simple steps to connect with your perfect match</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <CardTitle>Create Your Profile</CardTitle>
                <CardDescription className="text-base">
                  Students upload resumes and specify interests. Professionals share their expertise and availability.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <CardTitle>Get Matched</CardTitle>
                <CardDescription className="text-base">
                  Our algorithm pairs you based on career interests, expertise, and opportunity types.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <CardTitle>Connect Directly</CardTitle>
                <CardDescription className="text-base">
                  Access contact information and reach out directly to begin your professional relationship.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <Card>
              <CardHeader className="space-y-4">
                <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">For Students</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Upload your resume, select your career interests, and choose what type of opportunity you're seeking—whether it's mentorship, an internship, or job shadowing. Our platform will connect you with professionals who match your goals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  onClick={handleStudentClick}
                  disabled={isLoadingStudent}
                  data-testid="button-student-card-cta"
                >
                  {isLoadingStudent ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Get Started as a Student
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="space-y-4">
                <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">For Professionals</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Share your expertise and help shape the next generation. Complete a quick survey about your background and what types of opportunities you can offer. Get matched with motivated students in your field.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  onClick={handleProfessionalClick}
                  disabled={isLoadingProfessional}
                  data-testid="button-professional-card-cta"
                >
                  {isLoadingProfessional ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Get Started as a Professional
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t py-12 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-semibold">ProLink</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting students and professionals since 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
