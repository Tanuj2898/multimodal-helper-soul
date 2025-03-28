
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Code,
  FileCode,
  Bug,
  Terminal,
  MessagesSquare,
  Github,
  Loader2,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';
import GitHubImport from './GitHubImport';
import { toast } from "@/hooks/use-toast";

const CodeMode: React.FC = () => {
  const [codeInput, setCodeInput] = useState('// Paste your code here for analysis');
  const [explainInput, setExplainInput] = useState('');
  const [generateInput, setGenerateInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  
  const analyzeCode = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalyzed(true);
    }, 2000);
  };

  const handleFileLoad = () => {
    // This would be implemented in a full version to allow loading local files
    toast({
      title: "Feature not available in demo",
      description: "Loading local files would be available in the full version",
    });
  };

  const handleGitHubImport = (code: string) => {
    setCodeInput(code);
  };

  const handleGenerateCode = () => {
    toast({
      title: "Feature not available in demo",
      description: "Code generation would be available in the full version",
    });
  };

  const handleExplainCode = () => {
    toast({
      title: "Feature not available in demo", 
      description: "Code explanation would be available in the full version",
    });
  };

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Code Assistant</h2>
        <p className="text-muted-foreground">
          Debug, analyze, and optimize your code
        </p>
      </div>
      
      <Tabs defaultValue="analysis" className="space-y-4">
        <TabsList>
          <TabsTrigger value="analysis">
            <Bug size={16} className="mr-2" />
            Debug & Analysis
          </TabsTrigger>
          <TabsTrigger value="generate">
            <Code size={16} className="mr-2" />
            Generate Code
          </TabsTrigger>
          <TabsTrigger value="explain">
            <HelpCircle size={16} className="mr-2" />
            Explain Code
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>Code Analysis</CardTitle>
              <CardDescription>
                Debug issues and get suggestions for improvements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  className="min-h-[200px] font-mono text-sm"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                />
                
                <div className="flex justify-between">
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={handleFileLoad}>
                      <FileCode size={16} className="mr-2" />
                      Load File
                    </Button>
                    <GitHubImport onImport={handleGitHubImport} />
                  </div>
                  
                  <Button 
                    onClick={analyzeCode} 
                    disabled={isAnalyzing || !codeInput.trim() || codeInput === '// Paste your code here for analysis'}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Bug size={16} className="mr-2" />
                        Analyze Code
                      </>
                    )}
                  </Button>
                </div>
                
                {hasAnalyzed && (
                  <div className="mt-6 space-y-4">
                    <div className="border rounded-md">
                      <div className="bg-secondary p-3 border-b font-medium">
                        Analysis Results
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="flex items-start gap-2">
                          <XCircle size={18} className="text-red-500 mt-0.5" />
                          <div>
                            <p className="font-medium">Potential Bug: Uncaught Exception</p>
                            <p className="text-sm text-muted-foreground">
                              Your code might throw an exception when handling null values.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <HelpCircle size={18} className="text-amber-500 mt-0.5" />
                          <div>
                            <p className="font-medium">Performance Issue: Inefficient Loop</p>
                            <p className="text-sm text-muted-foreground">
                              Consider using a more efficient algorithm to improve performance.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <CheckCircle2 size={18} className="text-green-500 mt-0.5" />
                          <div>
                            <p className="font-medium">Good Practice: Clear Naming</p>
                            <p className="text-sm text-muted-foreground">
                              Your variable names are descriptive and follow conventions.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md">
                      <div className="bg-secondary p-3 border-b font-medium">
                        Suggested Fixes
                      </div>
                      <div className="p-4">
                        <p className="mb-3">Here's how you can fix the issues:</p>
                        <div className="bg-black text-white p-3 rounded-md font-mono text-sm">
                          <p className="text-green-400">// Add null check before processing</p>
                          <p>if (data != null) {'{'}</p>
                          <p className="pl-4">// process data here</p>
                          <p>{'}'}</p>
                          <br />
                          <p className="text-green-400">// Replace inefficient loop with optimized version</p>
                          <p>const results = data.reduce((acc, item) =&gt; {'{'}</p>
                          <p className="pl-4">// optimized calculation</p>
                          <p className="pl-4">return acc;</p>
                          <p>{'}, initialValue);'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="generate">
          <Card>
            <CardHeader>
              <CardTitle>Code Generation</CardTitle>
              <CardDescription>
                Generate code snippets or entire functions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">What would you like to generate?</label>
                  <Textarea 
                    placeholder="Describe the code you need, e.g., 'A function to sort an array of objects by multiple properties'"
                    className="min-h-[100px]"
                    value={generateInput}
                    onChange={(e) => setGenerateInput(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Programming Language</label>
                    <select className="w-full border rounded-md p-2">
                      <option>JavaScript</option>
                      <option>Python</option>
                      <option>Java</option>
                      <option>C++</option>
                      <option>TypeScript</option>
                      <option>Go</option>
                      <option>Rust</option>
                      <option>PHP</option>
                      <option>Ruby</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Style</label>
                    <select className="w-full border rounded-md p-2">
                      <option>Standard</option>
                      <option>Optimized for Performance</option>
                      <option>Readable/Educational</option>
                      <option>Minimal/Concise</option>
                    </select>
                  </div>
                </div>
                
                <Button className="w-full" onClick={handleGenerateCode}>
                  <Terminal size={16} className="mr-2" />
                  Generate Code
                </Button>
                
                <div className="border rounded-md p-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    In the full version, A.I.S.H.A. would generate high-quality, functional 
                    code based on your description and requirements. The code would be 
                    optimized, well-commented, and ready to use.
                  </p>
                  
                  <div className="bg-black text-white p-3 rounded-md font-mono text-sm">
                    <p className="text-green-400">/**</p>
                    <p className="text-green-400"> * Sorts an array of objects by multiple properties</p>
                    <p className="text-green-400"> * @param {'{'} Array {'}'} arr - The array to sort</p>
                    <p className="text-green-400"> * @param {'{'} Array {'}'} props - Properties to sort by (in priority order)</p>
                    <p className="text-green-400"> * @returns {'{'} Array {'}'} - The sorted array</p>
                    <p className="text-green-400"> */</p>
                    <p>function multiPropertySort(arr, props) {'{'}</p>
                    <p className="pl-4">return [...arr].sort((a, b) =&gt; {'{'}</p>
                    <p className="pl-8">for (const prop of props) {'{'}</p>
                    <p className="pl-12">if (a[prop] !== b[prop]) {'{'}</p>
                    <p className="pl-16">return a[prop] &gt; b[prop] ? 1 : -1;</p>
                    <p className="pl-12">{'}'}</p>
                    <p className="pl-8">{'}'}</p>
                    <p className="pl-8">return 0;</p>
                    <p className="pl-4">{'})'};</p>
                    <p>{'}'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="explain">
          <Card>
            <CardHeader>
              <CardTitle>Code Explanation</CardTitle>
              <CardDescription>
                Get a detailed explanation of how your code works
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  className="min-h-[200px] font-mono text-sm"
                  placeholder="Paste code you'd like to understand..."
                  value={explainInput}
                  onChange={(e) => setExplainInput(e.target.value)}
                />
                
                <Button className="w-full" onClick={handleExplainCode}>
                  <MessagesSquare size={16} className="mr-2" />
                  Explain This Code
                </Button>
                
                <div className="border rounded-md p-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    In the full version, A.I.S.H.A. would provide a comprehensive explanation 
                    of your code, breaking down complex operations, identifying patterns, and 
                    clarifying the purpose of each section.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">Code Overview</h4>
                      <p className="text-sm">
                        This code implements a recursive merge sort algorithm that efficiently 
                        sorts an array by dividing it into smaller subarrays, sorting them, and 
                        then merging them back together.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Key Components</h4>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>
                          <span className="font-mono bg-secondary px-1 rounded">mergeSort()</span>: 
                          The main function that implements the recursive divide-and-conquer approach
                        </li>
                        <li>
                          <span className="font-mono bg-secondary px-1 rounded">merge()</span>: 
                          Helper function that combines two sorted arrays into a single sorted array
                        </li>
                        <li>
                          Base case: When the array length is 1 or less, it's already sorted
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Time & Space Complexity</h4>
                      <p className="text-sm">
                        <strong>Time Complexity:</strong> O(n log n) - This is efficient for large datasets<br />
                        <strong>Space Complexity:</strong> O(n) - Requires additional space for the merging process
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodeMode;
