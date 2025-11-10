import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap, Users, TrendingUp } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema, type InsertUser } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { user, isLoading, loginMutation, registerMutation } = useAuth();
  const [, setLocation] = useLocation();

  const form = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  if (user) {
    return <Redirect to="/" />;
  }

  const onSubmit = async (data: InsertUser) => {
    if (isLogin) {
      await loginMutation.mutateAsync(data);
      setLocation("/");
    } else {
      await registerMutation.mutateAsync(data);
      setLocation("/");
    }
  };

  const isPending = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              ProLink
            </h1>
            <p className="text-muted-foreground">
              Connecting students with industry professionals
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {isLogin ? "Welcome back" : "Create account"}
              </CardTitle>
              <CardDescription>
                {isLogin
                  ? "Sign in to access your matches and opportunities"
                  : "Join ProLink to start connecting with professionals"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="your.email@example.com"
                            disabled={isPending}
                            data-testid="input-username"
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Enter your password"
                            disabled={isPending}
                            data-testid="input-password"
                            className="h-11"
                          />
                        </FormControl>
                        {!isLogin && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Password should be at least 8 characters long
                          </p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full h-12"
                    disabled={isPending}
                    data-testid="button-submit"
                  >
                    {isPending
                      ? "Please wait..."
                      : isLogin
                        ? "Sign in"
                        : "Create account"}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  form.reset();
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-toggle-mode"
              >
                {isLogin ? (
                  <>
                    Don't have an account?{" "}
                    <span className="text-primary font-medium">Sign up</span>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <span className="text-primary font-medium">Sign in</span>
                  </>
                )}
              </button>
            </CardFooter>
          </Card>

          <div className="mt-8 text-center text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/10 via-blue-500/10 to-purple-500/10 items-center justify-center p-12">
        <div className="max-w-lg space-y-8">
          <div>
            <h2 className="text-4xl font-bold mb-4">
              Bridge the gap between education and industry
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              ProLink uses intelligent matching to connect students with professionals
              who can help them achieve their career goals through mentoring, internships,
              and job shadowing opportunities.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Smart Matching</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered algorithm matches students with the most relevant professionals
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Real Opportunities</h3>
              <p className="text-sm text-muted-foreground">
                Access to mentoring, internships, and job shadowing from industry leaders
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Career Growth</h3>
              <p className="text-sm text-muted-foreground">
                Build meaningful connections that accelerate your professional development
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Track Progress</h3>
              <p className="text-sm text-muted-foreground">
                Monitor your connections and opportunities from a unified dashboard
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">1,200+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">800+</div>
                <div className="text-sm text-muted-foreground">Professionals</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">5,400+</div>
                <div className="text-sm text-muted-foreground">Connections</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
