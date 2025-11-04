import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, Briefcase, GraduationCap } from "lucide-react";

interface MatchCardProps {
  name: string;
  title?: string;
  company?: string;
  email: string;
  phone: string;
  tags: string[];
  matchScore: number;
  onViewContact: () => void;
  type: "student" | "professional";
}

export function MatchCard({
  name,
  title,
  company,
  email,
  phone,
  tags,
  matchScore,
  onViewContact,
  type,
}: MatchCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const matchColor = 
    matchScore >= 80 ? "text-green-600 dark:text-green-400" :
    matchScore >= 60 ? "text-blue-600 dark:text-blue-400" :
    "text-amber-600 dark:text-amber-400";

  return (
    <Card className="hover-elevate transition-all" data-testid={`card-match-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate" data-testid={`text-name-${name.toLowerCase().replace(/\s+/g, '-')}`}>
              {name}
            </h3>
            {title && company && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Briefcase className="h-3 w-3" />
                <span className="truncate">
                  {title} at {company}
                </span>
              </div>
            )}
          </div>
          <div className="text-right flex-shrink-0">
            <div className={`text-2xl font-bold ${matchColor}`} data-testid={`text-match-score-${name.toLowerCase().replace(/\s+/g, '-')}`}>
              {matchScore}%
            </div>
            <div className="text-xs text-muted-foreground">Match</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 4).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs" data-testid={`badge-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}>
              {tag}
            </Badge>
          ))}
          {tags.length > 4 && (
            <Badge variant="secondary" className="text-xs">
              +{tags.length - 4} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          onClick={onViewContact} 
          className="w-full" 
          data-testid={`button-view-contact-${name.toLowerCase().replace(/\s+/g, '-')}`}
        >
          View Contact Information
        </Button>
      </CardFooter>
    </Card>
  );
}
