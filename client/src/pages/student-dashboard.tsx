import { useParams, Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MatchCard } from "@/components/match-card";
import { ContactModal } from "@/components/contact-modal";
import { ArrowLeft, GraduationCap, Loader2, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import type { Student, Professional, Match } from "@shared/schema";

interface MatchWithProfessional extends Match {
  professional: Professional;
}

interface SelectedContact {
  name: string;
  email: string;
  phone: string;
  title: string;
  company: string;
  bio: string;
  tags: string[];
}

export default function StudentDashboard() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const [selectedContact, setSelectedContact] = useState<SelectedContact | null>(null);
  const { logoutMutation } = useAuth();

  const { data: student, isLoading: studentLoading } = useQuery<Student>({
    queryKey: ["/api/students", id],
  });

  const { data: matches, isLoading: matchesLoading } = useQuery<MatchWithProfessional[]>({
    queryKey: ["/api/students", id, "matches"],
    enabled: !!id,
    refetchOnMount: 'always',
  });

  const isLoading = studentLoading || matchesLoading;

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
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="font-semibold">Student Portal</span>
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
                Welcome, {student?.name}!
              </h1>
              <p className="text-lg text-muted-foreground">
                Here are your professional matches based on your interests and career goals.
              </p>
            </div>

            {student && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>Your preferences and interests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Contact</p>
                    <p className="text-sm">{student.email} • {student.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Fields of Interest</p>
                    <div className="flex flex-wrap gap-2">
                      {student.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Looking For</p>
                    <div className="flex flex-wrap gap-2">
                      {student.opportunityTypes.map((type, index) => (
                        <span
                          key={index}
                          className="text-xs px-3 py-1 rounded-full bg-accent/50 text-accent-foreground font-medium"
                        >
                          {type}
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
                      No matches found yet. Check back soon as more professionals join the platform!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matches.map((match) => (
                    <MatchCard
                      key={match.id}
                      name={match.professional.name}
                      title={match.professional.title}
                      company={match.professional.company}
                      email={match.professional.email}
                      phone={match.professional.phone}
                      tags={[...match.professional.expertise, ...match.professional.availableOpportunities]}
                      matchScore={parseInt(match.score)}
                      onViewContact={() =>
                        setSelectedContact({
                          name: match.professional.name,
                          email: match.professional.email,
                          phone: match.professional.phone,
                          title: match.professional.title,
                          company: match.professional.company,
                          bio: match.professional.bio,
                          tags: match.professional.expertise,
                        })
                      }
                      type="professional"
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
          title={selectedContact.title}
          company={selectedContact.company}
          bio={selectedContact.bio}
          tags={selectedContact.tags}
        />
      )}
    </div>
  );
}
