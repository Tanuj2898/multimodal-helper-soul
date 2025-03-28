
import React, { useState } from 'react';
import NavSidebar from '@/components/NavSidebar';
import AssistantMode from '@/components/AssistantMode';
import TasksMode from '@/components/TasksMode';
import HealthMode from '@/components/HealthMode';
import ResearchMode from '@/components/ResearchMode';
import CodeMode from '@/components/CodeMode';
import AishaLogo from '@/components/AishaLogo';

const Index = () => {
  const [activeMode, setActiveMode] = useState('assistant');

  const renderModeContent = () => {
    switch (activeMode) {
      case 'assistant':
        return <AssistantMode />;
      case 'tasks':
        return <TasksMode />;
      case 'health':
        return <HealthMode />;
      case 'research':
        return <ResearchMode />;
      case 'code':
        return <CodeMode />;
      default:
        return <AssistantMode />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <NavSidebar activeMode={activeMode} setActiveMode={setActiveMode} />
      
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b flex items-center justify-between px-6">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">
              A.I.S.H.A. <span className="text-sm font-normal text-muted-foreground">v0.1</span>
            </h1>
            
            <div className="ml-6 flex items-center bg-secondary rounded-full px-3 py-1 text-xs font-medium">
              <span 
                className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  activeMode === 'assistant' ? 'bg-mode-assistant' : 
                  activeMode === 'tasks' ? 'bg-mode-tasks' : 
                  activeMode === 'health' ? 'bg-mode-health' : 
                  activeMode === 'research' ? 'bg-mode-research' : 
                  'bg-primary'
                }`}
              />
              {activeMode.charAt(0).toUpperCase() + activeMode.slice(1)} Mode
            </div>
          </div>
          
          <div className="flex items-center">
            <AishaLogo size={32} className="ml-4" />
          </div>
        </header>
        
        <main className="flex-1 overflow-hidden">
          {renderModeContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
