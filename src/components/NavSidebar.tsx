
import React from 'react';
import { Button } from "@/components/ui/button";
import AishaLogo from './AishaLogo';
import { 
  MessageSquare, 
  CheckSquare, 
  Heart, 
  Search, 
  Settings, 
  Code, 
  User
} from 'lucide-react';

interface NavSidebarProps {
  activeMode: string;
  setActiveMode: (mode: string) => void;
}

const NavSidebar: React.FC<NavSidebarProps> = ({ activeMode, setActiveMode }) => {
  
  const navItems = [
    { id: 'assistant', label: 'Assistant', icon: <MessageSquare size={20} /> },
    { id: 'tasks', label: 'Tasks', icon: <CheckSquare size={20} /> },
    { id: 'health', label: 'Health', icon: <Heart size={20} /> },
    { id: 'research', label: 'Research', icon: <Search size={20} /> },
    { id: 'code', label: 'Code', icon: <Code size={20} /> },
  ];
  
  return (
    <div className="w-[70px] md:w-[240px] h-screen bg-sidebar flex flex-col items-center md:items-start py-6 px-3 text-sidebar-foreground">
      <div className="flex items-center gap-3 mb-8 pl-1">
        <AishaLogo size={36} />
        <h1 className="text-lg font-semibold hidden md:block text-white">A.I.S.H.A.</h1>
      </div>
      
      <div className="flex flex-col gap-2 w-full">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={`w-full justify-start gap-3 ${
              activeMode === item.id 
                ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                : 'text-sidebar-foreground hover:bg-sidebar-accent/20'
            }`}
            onClick={() => setActiveMode(item.id)}
          >
            {item.icon}
            <span className="hidden md:inline">{item.label}</span>
          </Button>
        ))}
      </div>
      
      <div className="mt-auto flex flex-col gap-2 w-full">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent/20"
        >
          <Settings size={20} />
          <span className="hidden md:inline">Settings</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent/20"
        >
          <User size={20} />
          <span className="hidden md:inline">Profile</span>
        </Button>
      </div>
    </div>
  );
};

export default NavSidebar;
