import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface WelcomeBannerProps {
  userName: string;
  notificationCount?: number;
  avatarUrl?: string;
  email?: string;
}

export function WelcomeBanner({ 
  userName, 
  notificationCount = 0, 
  avatarUrl,
  email 
}: WelcomeBannerProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-8 mb-8">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-blue-400 opacity-20 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-24 w-24 rounded-full bg-blue-600 opacity-20 blur-2xl"></div>
      
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="lg:hidden">
              <Avatar className="h-12 w-12 border-2 border-white/50 shadow-lg cursor-pointer hover:opacity-90 transition-opacity">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className="bg-blue-600 text-white">
                  {userName?.charAt(0)?.toUpperCase() || email?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Avatar sin dropdown para desktop */}
          <div className="hidden lg:block">
            <Avatar className="h-12 w-12 border-2 border-white/50 shadow-lg">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback className="bg-blue-600 text-white">
                {userName?.charAt(0)?.toUpperCase() || email?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white mb-1">¡Bienvenido, {userName}!</h1>
            <p className="text-blue-100">Gestiona tus reservas y disfruta del mejor pádel</p>
          </div>
        </div>
        
        <Button variant="secondary" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
} 