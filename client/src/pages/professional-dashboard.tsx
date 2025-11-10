import { useParams, Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MatchCard } from "@/components/match-card";
import { ContactModal } from "@/components/contact-modal";
import { ArrowLeft, Briefcase, Loader2, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import type { Student, Professional, Match } from "@shared/schema";

interface MatchWithStudent extends Match {
  student: Student;
}

interface SelectedContact {
  name: string;
  email: string;
  phone: string;
  resumeUrl: string;
  tags: string[];
}

export default function ProfessionalDashboard() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const [selectedContact, setSelectedContact] = useState<SelectedContact | null>(null);
  const { logoutMutation } = useAuth();

  const { data: professional, isLoading: professionalLoading } = useQuery<Professional>({
    queryKey: ["/api/professionals", id],
  });

  const { data: matches, isLoading: matchesLoading } = useQuery<MatchWithStudent[]>({
    queryKey: ["/api/professionals", id, "matches"],
    enabled: !!id,
    refetchOnMount: 'always',
  });

  const isLoading = professionalLoading || matchesLoading;

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" data-testid="button-back">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <span className="font-semibold">Professional Portal</span>
          </div>
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
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-2" data-testid="text-welcome">
                Welcome, {professional?.name}!
              </h1>
              <p className="text-lg text-muted-foreground">
                Here are students matched with your expertise and availability.
              </p>
            </div>

            {professional && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>Your professional information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Position</p>
                    <p className="text-sm font-semibold">
                      {professional.title} at {professional.company}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Contact</p>
                    <p className="text-sm">{professional.email} • {professional.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Bio</p>
                    <p className="text-sm text-muted-foreground">{professional.bio}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Areas of Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      {professional.expertise.map((exp, index) => (
                        <span
                          key={index}
                          className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Available Opportunities</p>
                    <div className="flex flex-wrap gap-2">
                      {professional.availableOpportunities.map((opp, index) => (
                        <span
                          key={index}
                          className="text-xs px-3 py-1 rounded-full bg-accent/50 text-accent-foreground font-medium"
                        >
                          {opp}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div>
              <h2 className="text-2xl font-bold mb-6">
                Your Matches ({matches?.length || 0})
              </h2>

              {!matches || matches.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground mb-4">
                      No matches found yet. Check back soon as more students join the platform!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matches.map((match) => (
                    <MatchCard
                      key={match.id}
                      name={match.student.name}
                      email={match.student.email}
                      phone={match.student.phone}
                      tags={[...match.student.interests, ...match.student.opportunityTypes]}
                      matchScore={parseInt(match.score)}
                      onViewContact={() =>
                        setSelectedContact({
                          name: match.student.name,
                          email: match.student.email,
                          phone: match.student.phone,
                          resumeUrl: match.student.resumeUrl,
                          tags: match.student.interests,
                        })
                      }
                      type="student"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {selectedContact && (
        <ContactModal
          open={!!selectedContact}
          onOpenChange={(open) => !open && setSelectedContact(null)}
          name={selectedContact.name}
          email={selectedContact.email}
          phone={selectedContact.phone}
          resumeUrl={selectedContact.resumeUrl}
          tags={selectedContact.tags}
        />
      )}
    </div>
  );
}
