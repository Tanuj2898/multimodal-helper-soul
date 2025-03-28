
/**
 * GitHub API utilities for fetching repository content
 */

// Interface for GitHub repository content response
interface GitHubContent {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string | null;
  type: string;
  content?: string;
  encoding?: string;
}

/**
 * Fetch content from a GitHub repository file
 */
export const fetchGitHubFileContent = async (
  owner: string,
  repo: string,
  path: string,
  branch: string = 'main'
): Promise<string> => {
  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const data = await response.json() as GitHubContent;
    
    // GitHub API returns content as base64 encoded
    if (data.content && data.encoding === 'base64') {
      return atob(data.content.replace(/\n/g, ''));
    }
    
    throw new Error('Could not retrieve file content');
  } catch (error) {
    console.error('Error fetching GitHub file:', error);
    throw error;
  }
};

/**
 * Parse GitHub URL to extract owner, repo, and path
 * Supports formats like:
 * - https://github.com/owner/repo/blob/branch/path/to/file.js
 * - https://github.com/owner/repo
 */
export const parseGitHubUrl = (url: string): { owner: string; repo: string; path?: string; branch?: string } => {
  try {
    const githubUrlPattern = /github\.com\/([^\/]+)\/([^\/]+)(?:\/blob\/([^\/]+)\/(.+))?/;
    const matches = url.match(githubUrlPattern);
    
    if (!matches) {
      throw new Error('Invalid GitHub URL format');
    }
    
    const [, owner, repo, branch, path] = matches;
    
    return {
      owner,
      repo,
      branch: branch || 'main',
      path: path || '',
    };
  } catch (error) {
    console.error('Error parsing GitHub URL:', error);
    throw new Error('Please enter a valid GitHub URL');
  }
};
