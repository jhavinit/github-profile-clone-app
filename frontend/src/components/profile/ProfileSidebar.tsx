import { MapPin, Mail, Link as LinkIcon, Users, Linkedin, LinkedinIcon, LucideLinkedin, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ProfileSidebarProps {
  user: {
    login: string;
    name: string;
    avatar_url: string;
    bio: string;
    location: string;
    email: string;
    blog: string;
    twitter_username: string;
    linkedin: string;
    followers: number;
    following: number;
    company: string;
  };
}

const ProfileSidebar = ({ user }: ProfileSidebarProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 lg:flex-col lg:items-start">

        <Avatar className="h-32 w-32 sm:h-40 sm:w-40 md:h-64 md:w-64 mb-4 sm:mb-0">
          <AvatarImage src={user.avatar_url} alt={user.name} />
          <AvatarFallback>
            {user.name?.charAt(0) || user.login.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="text-center sm:text-left w-full">
          <h1 className="text-2xl font-semibold text-foreground">{user.name}</h1>
          <p className="text-xl text-muted-foreground">{user.login}</p>
        </div>

      </div>

      {user.bio && (
        <p className="text-foreground text-center sm:text-left">{user.bio}</p>
      )}

      <Button className="w-full" variant="secondary">
        Follow
      </Button>

      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Users className="h-4 w-4" />
        <span className="text-foreground font-semibold">{user.followers}</span>
        <span>followers</span>
        <span>·</span>
        <span className="text-foreground font-semibold">{user.following}</span>
        <span>following</span>
      </div>

      <div className="space-y-3 text-sm border-b pb-4">
        {user.company && (
          <div className="flex items-center gap-2 text-foreground">
            <Building className="h-4 w-4" />
            <span>{user.company}</span>
          </div>
        )}

        {user.location && (
          <div className="flex items-center gap-2 text-foreground">
            <MapPin className="h-4 w-4" />
            <span>{user.location}</span>
          </div>
        )}

        {user.email && (
          <div className="flex items-center gap-2 text-foreground">
            <Mail className="h-4 w-4" />
            <a href={`mailto:${user.email}`} className="hover:underline hover:text-primary">
              {user.email}
            </a>
          </div>
        )}

        {user.blog && (
          <div className="flex items-center gap-2 text-foreground">
            <LinkIcon className="h-4 w-4" />
            <a href={user.blog} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-primary">
              {user.blog}
            </a>
          </div>
        )}

        {user.linkedin && (
          <div className="flex items-center gap-2 text-foreground">
            <Linkedin className="h-4 w-4" />
            <a
              href={user.linkedin.startsWith("http") ? user.linkedin : `https://${user.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-primary truncate"
            >
              {user.linkedin}
            </a>
          </div>
        )}

        {user.twitter_username && (
          <div className="flex items-center gap-2 text-foreground">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
            <a
              href={`https://twitter.com/${user.twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-primary"
            >
              @{user.twitter_username}
            </a>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-base font-semibold text-foreground mb-3">Achievements</h2>
        <div className="flex gap-2">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
            <span className="text-2xl">🏆</span>
          </div>
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
            <span className="text-2xl">⭐</span>
          </div>
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
            <span className="text-2xl">🎯</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button id="dialog-show-dialog-437ef0eb-5afb-4b68-b228-a30472b9324a" data-show-dialog-id="dialog-437ef0eb-5afb-4b68-b228-a30472b9324a" type="button" data-view-component="true">
            <span>
              <span className="Button-label">Block or Report</span>
            </span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProfileSidebar;
