import { APP_CONFIG } from "@/config/appConfig";

const API_BASE_URL = APP_CONFIG.API_URL;
const API_CONTRIBUTIONS_URL = APP_CONFIG.API_CONTRIBUTIONS_URL;

/* ---------------------- TYPES ---------------------- */

/** GitHub User */
export interface GitHubUser {
  login: string;
  id: number;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

/** GitHub Repo */
export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  visibility: string;
  description: string | null;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  fork: boolean;
  parent: {
    html_url: string;
    full_name: string;
  } | null;
}

/** Contributions API Response */
export interface ContributionsResponse {
  total: number;
  days: {
    date: string;
    count: number;
    level: number;
  }[];
  user: {
    contributionsCollection: {
      contributionCalendar: {
        weeks: {
          contributionDays: {
            date: string;
            contributionCount: number;
          }[];
        }[];
      };
    };
  };
}

/* ---------------------- API ---------------------- */

export const fetchUserDataAPI = async (
  username: string
): Promise<GitHubUser | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${username}`);

    if (!response.ok) throw new Error("Failed to fetch user data");

    const data: GitHubUser = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchStarsCountAPI = async (username: string): Promise<number> => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/users/${username}/repos?per_page=100`
    );

    if (!res.ok) return 0;

    const repos: GitHubRepo[] = await res.json();

    return repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export const fetchPopularReposAPI = async (
  username: string
): Promise<GitHubRepo[]> => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/users/${username}/repos?per_page=100&sort=updated`
    );

    if (!res.ok) throw new Error("Failed to fetch repos");

    const repos: GitHubRepo[] = await res.json();

    return repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchContributionsAPI = async (
  username: string,
  from: string,
  to: string
): Promise<ContributionsResponse | null> => {
  try {
    const res = await fetch(API_CONTRIBUTIONS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, from, to }),
    });

    if (!res.ok) throw new Error("Failed to fetch contributions");

    const data: ContributionsResponse = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
