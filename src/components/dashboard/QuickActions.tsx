import Link from 'next/link';
import { 
  Trophy, 
  Calendar, 
  Users, 
  Clock,
  ChevronRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const actions = [
  {
    title: 'Reservar Cancha',
    description: 'Agenda tu próximo partido',
    icon: Calendar,
    href: '/book',
    gradient: 'from-green-500 to-green-600',
    hoverGradient: 'from-green-600 to-green-700'
  },
  {
    title: 'Torneos',
    description: 'Inscríbete y compite',
    icon: Trophy,
    href: '/tournaments',
    gradient: 'from-blue-500 to-blue-600',
    hoverGradient: 'from-blue-600 to-blue-700'
  },
  {
    title: 'Mis Partidos',
    description: 'Revisa tus próximos juegos',
    icon: Clock,
    href: '/my-matches',
    gradient: 'from-purple-500 to-purple-600',
    hoverGradient: 'from-purple-600 to-purple-700'
  },
  {
    title: 'Jugadores',
    description: 'Encuentra compañeros',
    icon: Users,
    href: '/players',
    gradient: 'from-orange-500 to-orange-600',
    hoverGradient: 'from-orange-600 to-orange-700'
  }
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {actions.map((action) => (
        <Link
          key={action.title}
          href={action.href}
          className={cn(
            "relative group p-6 rounded-2xl overflow-hidden",
            "transition-all duration-300 transform hover:scale-[1.02]",
            `bg-gradient-to-br ${action.gradient}`,
            "hover:shadow-lg"
          )}
        >
          {/* Efecto de hover */}
          <div className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100",
            `bg-gradient-to-br ${action.hoverGradient}`,
            "transition-opacity duration-300"
          )} />

          {/* Contenido */}
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <action.icon className="h-8 w-8 text-white" />
              <ChevronRight className="h-5 w-5 text-white/70 group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">
              {action.title}
            </h3>
            <p className="text-sm text-white/80">
              {action.description}
            </p>
          </div>

          {/* Decoración */}
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-16 translate-y-16" />
          <div className="absolute top-0 left-0 w-16 h-16 bg-white/5 rounded-full transform -translate-x-8 -translate-y-8" />
        </Link>
      ))}
    </div>
  );
} 