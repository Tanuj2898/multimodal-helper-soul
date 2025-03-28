
import React, { useState } from 'react';
import { Github, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { fetchGitHubFileContent, parseGitHubUrl } from '@/utils/github';

interface GitHubImportProps {
  onImport: (code: string) => void;
}

const GitHubImport: React.FC<GitHubImportProps> = ({ onImport }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImport = async () => {
    if (!url.trim()) return;
    
    setIsLoading(true);
    
    try {
      const { owner, repo, path, branch } = parseGitHubUrl(url);
      
      if (!path) {
        toast({
          title: "Invalid URL",
          description: "Please provide a URL to a specific file",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      const content = await fetchGitHubFileContent(owner, repo, path, branch);
      onImport(content);
      setIsOpen(false);
      toast({
        title: "Import Successful",
        description: `Imported ${path} from ${owner}/${repo}`,
      });
    } catch (error) {
      toast({
        title: "Import Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        <Github size={16} className="mr-2" />
        Import from GitHub
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import from GitHub</DialogTitle>
            <DialogDescription>
              Enter the URL of a GitHub file to import its content
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Input
                placeholder="https://github.com/username/repo/blob/main/path/to/file.js"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                For example: https://github.com/facebook/react/blob/main/packages/react/src/React.js
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleImport} disabled={isLoading || !url.trim()}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                "Import"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GitHubImport;
