import { createContext, useContext, useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import type { TabItem } from '../../types';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
  orientation: 'horizontal' | 'vertical';
}

const TabsContext = createContext<TabsContextValue | null>(null);

interface TabsProps {
  defaultValue: string;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  children: React.ReactNode;
}

export const Tabs = ({ defaultValue, orientation = 'horizontal', className, children }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, orientation }}>
      <div className={cn('w-full', className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

export const TabsList = ({ className, children }: TabsListProps) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsList must be used within Tabs');
  
  const { orientation } = context;
  const scrollRef = useRef<HTMLDivElement>(null);
  
  return (
    <div
      ref={scrollRef}
      className={cn(
        'flex bg-gray-100 p-1 rounded-lg',
        orientation === 'horizontal' 
          ? 'overflow-x-auto scrollbar-hide space-x-1' 
          : 'flex-col overflow-y-auto space-y-1',
        className
      )}
    >
      {children}
    </div>
  );
};

interface TabsTriggerProps {
  value: string;
  className?: string;
  disabled?: boolean;
  badge?: number;
  children: React.ReactNode;
}

export const TabsTrigger = ({ value, className, disabled, badge, children }: TabsTriggerProps) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');
  
  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;
  
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => setActiveTab(value)}
      className={cn(
        'relative flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-all',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
        isActive 
          ? 'bg-white text-primary-600 shadow-sm'
          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
      {badge && badge > 0 && (
        <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-2xs font-bold text-white bg-primary-500 rounded-full">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </button>
  );
};

interface TabsContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export const TabsContent = ({ value, className, children }: TabsContentProps) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');
  
  const { activeTab } = context;
  
  if (activeTab !== value) return null;
  
  return (
    <div className={cn('mt-4 focus:outline-none animate-fade-in', className)}>
      {children}
    </div>
  );
};