import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface MatchTabsProps {
  activeTab: 'upcoming' | 'completed' | 'cancelled'
  onTabChange: (tab: 'upcoming' | 'completed' | 'cancelled') => void
}

export function MatchTabs({ activeTab, onTabChange }: MatchTabsProps) {
  const tabs = [
    {
      id: 'upcoming' as const,
      label: 'Próximos'
    },
    {
      id: 'completed' as const,
      label: 'Completados'
    },
    {
      id: 'cancelled' as const,
      label: 'Cancelados'
    }
  ]

  return (
    <div className="flex space-x-1 rounded-xl bg-gray-100 p-1">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          variant="ghost"
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition-all",
            activeTab === tab.id
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
          )}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  )
} 