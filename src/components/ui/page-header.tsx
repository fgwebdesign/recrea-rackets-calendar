import { LucideIcon } from 'lucide-react'

interface PageHeaderProps {
  title: string
  description?: string
  icon?: LucideIcon
}

export function PageHeader({ title, description, icon: Icon }: PageHeaderProps) {
  return (
    <div className="relative w-full bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-[linear-gradient(40deg,#0000_40%,#fff2_70%,#0000)] opacity-20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#fff3_0%,#0000_50%)] opacity-40"></div>
      
      {/* Contenido */}
      <div className="relative px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          {Icon && (
            <div className="p-2 sm:p-2.5 bg-white/10 rounded-lg sm:rounded-xl backdrop-blur-sm">
              <Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
            </div>
          )}
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
            {title}
          </h1>
        </div>
        {description && (
          <p className="text-white/90 text-sm sm:text-base max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </div>
  )
} 