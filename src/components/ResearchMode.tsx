
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  BookOpen,
  FileText,
  AlignLeft,
  BarChart2,
  MessageSquare,
  BrainCircuit,
  Loader2
} from 'lucide-react';

const ResearchMode: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 2000);
  };

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Research Assistant</h2>
        <p className="text-muted-foreground">
          Find and analyze information across multiple disciplines
        </p>
      </div>
      
      <div className="flex gap-2 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            className="pl-10" 
            placeholder="Search for any topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button 
          onClick={handleSearch} 
          disabled={!searchQuery.trim() || isSearching}
          className="bg-mode-research hover:bg-mode-research/90"
        >
          {isSearching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
          Search
        </Button>
      </div>
      
      {!hasSearched ? (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Research Capabilities</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <BookOpen size={16} className="mr-2 text-mode-research" />
                  Multidisciplinary Knowledge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Access information from diverse fields including chemistry, biology, physics, 
                  mathematics, microbiology, biotechnology, philosophy, commerce, computing, 
                  business, finance, and psychology.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <FileText size={16} className="mr-2 text-mode-research" />
                  Document Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Upload research papers, articles, or datasets for A.I.S.H.A. to analyze,
                  summarize, and extract key insights.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <AlignLeft size={16} className="mr-2 text-mode-research" />
                  Summarization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Create concise summaries of complex topics, perfect for quick understanding
                  or study sessions.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <BarChart2 size={16} className="mr-2 text-mode-research" />
                  Data Visualization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Transform raw data into meaningful visualizations, charts, and graphs
                  to better understand patterns and trends.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Featured Topics</h3>
            
            <div className="flex flex-wrap gap-2">
              {['Quantum Mechanics', 'Machine Learning', 'Climate Science', 'Cryptocurrency', 
                'Neuroscience', 'Global Economics', 'Biotechnology', 'Astronomy'].map((topic, i) => (
                <Button 
                  key={i} 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery(topic);
                    handleSearch();
                  }}
                >
                  {topic}
                </Button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Tabs defaultValue="summary" className="space-y-4">
          <TabsList>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
            <TabsTrigger value="visual">Visualizations</TabsTrigger>
            <TabsTrigger value="questions">Ask Questions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary">
            <Card>
              <CardHeader>
                <CardTitle>Research Summary: {searchQuery}</CardTitle>
                <CardDescription>
                  A concise overview of the topic
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Key Points</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>In the full version, A.I.S.H.A. would provide a dynamically generated summary based on your query.</li>
                    <li>Key concepts, definitions, and foundational information would be highlighted here.</li>
                    <li>Recent developments and major breakthroughs in the field would be included.</li>
                    <li>Different perspectives and schools of thought would be presented.</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Sources</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Academic journals and papers</li>
                    <li>Educational resources</li>
                    <li>Trusted online databases</li>
                    <li>Expert publications</li>
                  </ul>
                </div>
                
                <div className="bg-secondary p-4 rounded-md">
                  <p className="text-sm italic">
                    Note: A.I.S.H.A. maintains an up-to-date knowledge base across multiple disciplines, 
                    ensuring accurate and relevant information.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="detailed">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Analysis: {searchQuery}</CardTitle>
                <CardDescription>
                  In-depth exploration of the topic
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    In the full version, A.I.S.H.A. would generate a comprehensive, multi-section 
                    analysis of your query topic. This would include historical context, theoretical 
                    frameworks, practical applications, case studies, and current research.
                  </p>
                  
                  <p>
                    The information would be structured in a logical, easy-to-follow format with 
                    clear section headings, examples, and references. Technical concepts would be 
                    explained in accessible language while maintaining accuracy.
                  </p>
                  
                  <div className="bg-secondary p-4 rounded-md my-4">
                    <h4 className="font-medium mb-2">Sample Sections</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Historical Development</li>
                      <li>Theoretical Foundation</li>
                      <li>Key Principles and Concepts</li>
                      <li>Practical Applications</li>
                      <li>Current Research and Innovations</li>
                      <li>Challenges and Limitations</li>
                      <li>Future Directions</li>
                    </ul>
                  </div>
                  
                  <p>
                    A.I.S.H.A. would also identify connections to related fields, highlight 
                    interdisciplinary implications, and note any controversies or debates 
                    within the domain.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="visual">
            <Card>
              <CardHeader>
                <CardTitle>Visualizations: {searchQuery}</CardTitle>
                <CardDescription>
                  Visual representations to enhance understanding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="mb-6">
                    In the full version, A.I.S.H.A. would generate relevant visualizations 
                    to help you better understand complex concepts, relationships, and data 
                    related to your query.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-2">Concept Map</h4>
                      <div className="h-40 bg-secondary rounded-md flex items-center justify-center">
                        <p className="text-muted-foreground text-sm">
                          Interactive concept map visualization would appear here
                        </p>
                      </div>
                      <p className="text-sm mt-2">
                        Visual representation of key concepts and their relationships
                      </p>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-2">Timeline</h4>
                      <div className="h-40 bg-secondary rounded-md flex items-center justify-center">
                        <p className="text-muted-foreground text-sm">
                          Interactive timeline visualization would appear here
                        </p>
                      </div>
                      <p className="text-sm mt-2">
                        Historical development and key milestones
                      </p>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-2">Statistical Charts</h4>
                      <div className="h-40 bg-secondary rounded-md flex items-center justify-center">
                        <p className="text-muted-foreground text-sm">
                          Data charts and graphs would appear here
                        </p>
                      </div>
                      <p className="text-sm mt-2">
                        Visual representation of relevant data and statistics
                      </p>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-2">Comparative Analysis</h4>
                      <div className="h-40 bg-secondary rounded-md flex items-center justify-center">
                        <p className="text-muted-foreground text-sm">
                          Comparative visualizations would appear here
                        </p>
                      </div>
                      <p className="text-sm mt-2">
                        Side-by-side comparison of different approaches or viewpoints
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="questions">
            <Card>
              <CardHeader>
                <CardTitle>Ask Questions: {searchQuery}</CardTitle>
                <CardDescription>
                  Get specific answers about this topic
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="mb-2">
                    Ask any specific questions related to {searchQuery} and A.I.S.H.A. will provide 
                    detailed answers.
                  </p>
                  
                  <div className="flex gap-2 mb-6">
                    <Input placeholder="Ask a question..." />
                    <Button>
                      <MessageSquare size={16} className="mr-2" />
                      Ask
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Suggested Questions</h4>
                    <div className="space-y-2">
                      {[
                        `What are the fundamental principles of ${searchQuery}?`,
                        `What are the practical applications of ${searchQuery}?`,
                        `How has ${searchQuery} evolved over time?`,
                        `What are the current research trends in ${searchQuery}?`,
                        `What are the limitations or criticisms of ${searchQuery}?`
                      ].map((question, i) => (
                        <Button key={i} variant="outline" className="w-full justify-start">
                          <BrainCircuit size={16} className="mr-2 text-mode-research" />
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ResearchMode;
