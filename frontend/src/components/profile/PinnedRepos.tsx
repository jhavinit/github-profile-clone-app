import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { fetchPopularReposAPI } from "@/services/apiService";
import { GitHubRepo } from "@/services/apiService";

interface PinnedReposProps {
  username: string;
}

const PinnedRepos = ({ username }: PinnedReposProps) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRepos = async () => {
      setLoading(true);
      const data = await fetchPopularReposAPI(username);
      setRepos(data);
      setLoading(false);
    };

    loadRepos();
  }, [username]);

  const getLanguageColor = (lang: string) => {
    const colors: Record<string, string> = {
      JavaScript: "#f1e05a",
      TypeScript: "#3178c6",
      Python: "#3572A5",
      Go: "#00ADD8",
      Dart: "#00B4AB",
      HTML: "#e34c26",
      CSS: "#563d7c",
      Shell: "#89e051",
      Rust: "#dea584",
      "C++": "#f34b7d",
      Java: "#b07219",
      PHP: "#4F5D95",
      "Jupyter Notebook": "#DA5B0B",
    };

    return colors[lang] || "#858585";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base text-foreground">
          Popular repositories
        </h2>
      </div>

      {loading && (
        <p className="text-sm text-muted-foreground">Loading repositories…</p>
      )}

      {!loading && repos.length === 0 && (
        <p className="text-sm text-muted-foreground">No repositories found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map((repo) => (
          <Card
            key={repo.id}
            className="hover:border-muted-foreground transition-colors"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                {/* --- GitHub Blue Repo Name --- */}
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold"
                  style={{ color: "#0969da" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#054da7")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#0969da")
                  }
                >
                  {repo.name}
                </a>

                <span className="text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                  {repo.visibility.charAt(0).toUpperCase() + repo.visibility.slice(1) || "Public"}
                </span>
              </div>

              {repo.fork && repo.parent && (
                <p className="text-xs text-muted-foreground mb-2">
                  Forked from{" "}
                  <a
                    href={repo.parent.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    style={{ color: "#0969da" }}
                  >
                    {repo.parent.full_name}
                  </a>
                </p>
              )}

              {repo.description && (
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {repo.description}
                </p>
              )}

              {repo.language && (
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: getLanguageColor(repo.language) }}
                    ></span>
                    <span>{repo.language}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PinnedRepos;
