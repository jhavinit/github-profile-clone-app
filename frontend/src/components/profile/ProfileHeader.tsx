import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Bell,
  Plus,
  Search,
  Home,
  BookOpen,
  Box,
  Star,
  Layers,
  LucideBookMarked,
  Circle,
  GitPullRequest,
  CircleDot,
} from "lucide-react";

import {
  fetchUserDataAPI,
  fetchStarsCountAPI,
} from "@/services/apiService";

interface ProfileTab {
  id: string;
  label: string;
  count?: number;
  icon: React.ReactNode;
}

interface ProfileHeaderProps {
  user: {
    login: string;
    avatar_url: string;
  };
  activeTab: string;
}

const ProfileHeader = ({ user, activeTab }: ProfileHeaderProps) => {
  const navigate = useNavigate();

  const [tabs, setTabs] = useState<ProfileTab[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserStats = async () => {
      setLoading(true);

      const userData = await fetchUserDataAPI(user.login);
      // const starsCount = await fetchStarsCountAPI(user.login);
      const starsCount = 5;
      const repoCount = userData?.public_repos ?? 0;

      setTabs([
        { id: "overview", label: "Overview", icon: <BookOpen size={16} /> },
        { id: "repositories", label: "Repositories", count: repoCount, icon: <LucideBookMarked size={16} /> },
        { id: "projects", label: "Projects", count: 0, icon: <Layers size={16} /> },
        { id: "packages", label: "Packages", count: 0, icon: <Box size={16} /> },
        { id: "stars", label: "Stars", count: starsCount, icon: <Star size={16} /> },
      ]);

      setLoading(false);
    };

    loadUserStats();
  }, [user.login]);

  return (
    <header className="bg-[#f6f8fa] border-b border-border">

      <div className="px-4 py-3 bg-[#f6f8fa]">
        <div className="w-full flex items-center gap-4">

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Menu className="h-5 w-5" />
            </Button>

            {/* GitHub Logo */}
            <svg height="32" width="32" viewBox="0 0 16 16" className="fill-foreground">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 
  7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.67-.52-.01-.53.62-.01 
  1.07.58 1.23.82.71 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 
  0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 
  2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 
  2 .27 1.53-1.04 2.2-.82 2.2-.82.44 
  1.1.16 1.92.08 2.12.51.56.82 
  1.28.82 2.15 0 3.07-1.87 
  3.75-3.65 3.95.29.25.54.73.54 1.48 
  0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 
  8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
            <span className="text-sm text-foreground font-semibold">{user.login}</span>
          </div>

          <div className="flex items-center gap-3 ml-auto">

            <div className="hidden md:flex w-64">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Type / to search"
                  className="w-full bg-gray-50 border border-input rounded-md pl-9 pr-4 py-1.5 text-sm"
                />
              </div>
            </div>



            <Button
              variant="outline"
              className="h-8 px-2 rounded-md bg-gray-50 border-gray-300 flex items-center gap-1"
            >

              <svg viewBox="0 0 512 416" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"><path d="M181.33 266.143c0-11.497 9.32-20.818 20.818-20.818 11.498 0 20.819 9.321 20.819 20.818v38.373c0 11.497-9.321 20.818-20.819 20.818-11.497 0-20.818-9.32-20.818-20.818v-38.373zM308.807 245.325c-11.477 0-20.798 9.321-20.798 20.818v38.373c0 11.497 9.32 20.818 20.798 20.818 11.497 0 20.818-9.32 20.818-20.818v-38.373c0-11.497-9.32-20.818-20.818-20.818z" fill-rule="nonzero" /><path d="M512.002 246.393v57.384c-.02 7.411-3.696 14.638-9.67 19.011C431.767 374.444 344.695 416 256 416c-98.138 0-196.379-56.542-246.33-93.21-5.975-4.374-9.65-11.6-9.671-19.012v-57.384a35.347 35.347 0 016.857-20.922l15.583-21.085c8.336-11.312 20.757-14.31 33.98-14.31 4.988-56.953 16.794-97.604 45.024-127.354C155.194 5.77 226.56 0 256 0c29.441 0 100.807 5.77 154.557 62.722 28.19 29.75 40.036 70.401 45.025 127.354 13.263 0 25.602 2.936 33.958 14.31l15.583 21.127c4.476 6.077 6.878 13.345 6.878 20.88zm-97.666-26.075c-.677-13.058-11.292-18.19-22.338-21.824-11.64 7.309-25.848 10.183-39.46 10.183-14.454 0-41.432-3.47-63.872-25.869-5.667-5.625-9.527-14.454-12.155-24.247a212.902 212.902 0 00-20.469-1.088c-6.098 0-13.099.349-20.551 1.088-2.628 9.793-6.509 18.622-12.155 24.247-22.4 22.4-49.418 25.87-63.872 25.87-13.612 0-27.86-2.855-39.501-10.184-11.005 3.613-21.558 8.828-22.277 21.824-1.17 24.555-1.272 49.11-1.375 73.645-.041 12.318-.082 24.658-.288 36.976.062 7.166 4.374 13.818 10.882 16.774 52.97 24.124 103.045 36.278 149.137 36.278 46.01 0 96.085-12.154 149.014-36.278 6.508-2.956 10.84-9.608 10.881-16.774.637-36.832.124-73.809-1.642-110.62h.041zM107.521 168.97c8.643 8.623 24.966 14.392 42.56 14.392 13.448 0 39.03-2.874 60.156-24.329 9.28-8.951 15.05-31.35 14.413-54.079-.657-18.231-5.769-33.28-13.448-39.665-8.315-7.371-27.203-10.574-48.33-8.644-22.399 2.238-41.267 9.588-50.875 19.833-20.798 22.728-16.323 80.317-4.476 92.492zm130.556-56.008c.637 3.51.965 7.35 1.273 11.517 0 2.875 0 5.77-.308 8.952 6.406-.636 11.847-.636 16.959-.636s10.553 0 16.959.636c-.329-3.182-.329-6.077-.329-8.952.329-4.167.657-8.007 1.294-11.517-6.735-.637-12.812-.965-17.924-.965s-11.21.328-17.924.965zm49.275-8.008c-.637 22.728 5.133 45.128 14.413 54.08 21.105 21.454 46.708 24.328 60.155 24.328 17.596 0 33.918-5.769 42.561-14.392 11.847-12.175 16.322-69.764-4.476-92.492-9.608-10.245-28.476-17.595-50.875-19.833-21.127-1.93-40.015 1.273-48.33 8.644-7.679 6.385-12.791 21.434-13.448 39.665z" /></svg>

              <svg
                className="h-3 w-3 text-gray-600"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6l4 4 4-4" />
              </svg>
            </Button>



            <div className="hidden md:block w-px bg-border h-6"></div>



            <Button
              variant="outline"
              className="h-8 px-2 rounded-md bg-gray-50 border-gray-300 flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />

              {/* Clean GitHub-like caret */}
              <svg
                className="h-3 w-3 text-gray-600"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6l4 4 4-4" />
              </svg>
            </Button>

            <Button variant="outline" className="h-8 w-8 rounded-md bg-gray-50 border-gray-300">
              <CircleDot className="h-4 w-4" />
            </Button>

            <Button variant="outline" className="h-8 w-8 rounded-md bg-gray-50 border-gray-300">
              <GitPullRequest className="h-4 w-4" />
            </Button>

            <img
              src={user.avatar_url}
              alt={user.login}
              className="h-8 w-8 rounded-full cursor-pointer"
            />
          </div>

        </div>
      </div>

      <div className="px-4 bg-[#f6f8fa]">
        <nav className="flex space-x-2 overflow-x-auto">

          {loading && (
            <div className="py-3 text-sm text-muted-foreground">Loading…</div>
          )}

          {!loading &&
            tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => navigate(`/?tab=${tab.id}`)}
                className={`
              flex items-center gap-2 px-4 py-3 text-sm font-medium 
              border-b-2 whitespace-nowrap transition-colors
              ${activeTab === tab.id
                    ? "border-orange-500 text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
              >
                {tab.icon}
                {tab.label}
                {tab.count !== undefined && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-[#d0d7de] text-[#24292f]">

                    {tab.count}
                  </span>
                )}
              </button>
            ))}
        </nav>
      </div>

    </header>

  );
};

export default ProfileHeader;
