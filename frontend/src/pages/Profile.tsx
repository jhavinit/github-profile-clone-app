import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileContent from "@/components/profile/ProfileContent";
import { APP_CONFIG } from "@/config/appConfig";
import { fetchUserDataAPI } from "@/services/apiService";
import SiteFooter from "./SiteFooter";

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  email: string;
  blog: string;
  twitter_username: string;
  public_repos: number;
  followers: number;
  following: number;
  company: string;
  linkedin: string;
}

const Profile = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";

  useEffect(() => {
    const fetchUserData = async () => {
      const userData: GitHubUser | null = await fetchUserDataAPI(APP_CONFIG.USERNAME);

      // Mock email as email is not provided
      userData.email = 'kushwaha.shreeram@gmail.com';
      userData.linkedin = 'in/shreeramkushwaha';

      setUser(userData);
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-destructive">Failed to load profile</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ProfileHeader user={user} activeTab={activeTab} />
      {/* <div className="container mx-auto px-4 py-8"> */}
      <div className="max-w-7xl mx-auto px-8 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <ProfileSidebar user={user} />
          </div>
          <div className="lg:col-span-9">
            <ProfileContent activeTab={activeTab} username={user.login} />
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
};

export default Profile;
