import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  GraduationCap,
  Briefcase,
  Users,
  Target,
  TrendingUp,
  Award,
  LogOut,
  Loader2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
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
  // --- End: Integrated Logic ---

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 cursor-pointer select-none group">
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              ProLink
            </span>
          </Link>

          <nav className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  Welcome, {user.username}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  data-testid="button-logout"
                >
                  {logoutMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <LogOut className="mr-2 h-4 w-4" />
                  )}
                  {logoutMutation.isPending ? "Logging out..." : "Logout"}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleStudentClick}
                  disabled={isLoadingStudent}
                  className="transition-smooth"
                  data-testid="link-student-login"
                >
                  {isLoadingStudent && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Student
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleProfessionalClick}
                  disabled={isLoadingProfessional}
                  className="transition-smooth"
                  data-testid="link-professional-login"
                >
                  {isLoadingProfessional && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Professional
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-primary/10 text-sm font-medium text-primary mb-4">
                <CheckCircle2 className="h-4 w-4" />
                Trusted by 500+ professionals
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight">
                Connect with
                <span className="block bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent mt-2">
                  Industry Leaders
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                ProLink bridges ambitious students with experienced professionals.
                Discover mentorship, internships, and career opportunities designed for your success.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-8 h-12 text-base font-semibold shadow-elegant hover:shadow-hover transition-smooth group"
                  onClick={handleStudentClick}
                  disabled={isLoadingStudent}
                  data-testid="button-student-cta"
                >
                  {isLoadingStudent ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <GraduationCap className="mr-2 h-5 w-5" />
                  )}
                  I'm a Student
                  {!isLoadingStudent && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto px-8 h-12 text-base font-semibold border-2 hover:bg-accent hover:border-primary transition-smooth group"
                  onClick={handleProfessionalClick}
                  disabled={isLoadingProfessional}
                  data-testid="button-professional-cta"
                >
                  {isLoadingProfessional ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Briefcase className="mr-2 h-5 w-5" />
                  )}
                  I'm a Professional
                  {!isLoadingProfessional && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                </Button>
              </div>
            </div>
            {/* The rest of the JSX remains the same as your provided version... */}
            {/* ... but I'll update the audience cards to use the correct loading state */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-primary-glow/10 to-accent/20 rounded-3xl blur-3xl opacity-50" />
              <Card className="relative backdrop-blur-sm border-2 shadow-elegant hover:shadow-hover transition-smooth">
                <CardContent className="p-8 space-y-6">
                  {[
                    { icon: Target, title: "1,200+ Connections", subtitle: "Made this semester", color: "from-blue-500 to-blue-600" },
                    { icon: TrendingUp, title: "500+ Professionals", subtitle: "Ready to mentor", color: "from-emerald-500 to-emerald-600" },
                    { icon: Award, title: "15 Industries", subtitle: "Across all sectors", color: "from-amber-500 to-amber-600" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-xl hover:bg-accent/50 transition-smooth group">
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      {/* HOW IT WORKS */}
      <section className="py-20 md:py-28 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">How It Works</h2>
            <p className="text-muted-foreground text-lg">Three simple steps to unlock your professional network</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {[
              { step: "1", title: "Create Your Profile", desc: "Share your goals and expertise. Students showcase aspirations, professionals highlight experience." },
              { step: "2", title: "Get Matched", desc: "Our intelligent algorithm connects you with the perfect mentor or mentee based on goals and expertise." },
              { step: "3", title: "Start Connecting", desc: "Exchange contact details and begin your collaboration. Build relationships that accelerate careers." },
            ].map((s, idx) => (
              <Card key={s.step} className="relative group hover:shadow-hover transition-smooth border-2 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="text-center pb-6">
                  <div className="relative mb-6">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mx-auto shadow-elegant group-hover:shadow-hover group-hover:scale-110 transition-smooth">
                      <span className="text-3xl font-bold text-primary-foreground">{s.step}</span>
                    </div>
                    {idx < 2 && <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />}
                  </div>
                  <CardTitle className="text-xl mb-3">{s.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{s.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCE SECTIONS */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">Who We Serve</h2>
            <p className="text-muted-foreground text-lg">Empowering both students and professionals to grow together</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {[
              { icon: GraduationCap, title: "For Students", desc: "Upload your resume, define career goals, and connect with mentors who accelerate your journey to success. Access exclusive opportunities and industry insights.", click: handleStudentClick, button: "Get Started as Student", gradient: "from-blue-500 to-blue-600", benefits: ["One-on-one mentorship", "Industry connections", "Career guidance"], loading: isLoadingStudent, testId: "button-student-card-cta" },
              { icon: Briefcase, title: "For Professionals", desc: "Share your experience, guide the next generation, and make a lasting impact by mentoring motivated students. Give back while expanding your network.", click: handleProfessionalClick, button: "Get Started as Professional", gradient: "from-emerald-500 to-emerald-600", benefits: ["Give back to community", "Expand your network", "Develop leadership"], loading: isLoadingProfessional, testId: "button-professional-card-cta" },
            ].map((card, index) => (
              <Card key={index} className="group hover:shadow-hover transition-smooth border-2 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full" />
                <CardHeader className="space-y-6 pb-6">
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-elegant group-hover:shadow-hover group-hover:scale-110 transition-smooth`}>
                    <card.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-3">{card.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{card.desc}</CardDescription>
                  </div>
                  <div className="space-y-2 pt-2">
                    {card.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    className="w-full h-12 text-base font-semibold shadow-elegant hover:shadow-hover transition-smooth group/btn"
                    onClick={card.click}
                    disabled={card.loading} // Added disabled prop
                    data-testid={card.testId}
                  >
                    {card.loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                      <>
                        {card.button}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-card mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Users className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">ProLink</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} ProLink — Empowering futures through meaningful connections
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}