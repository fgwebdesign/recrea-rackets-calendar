"use client";
import { useEffect, useState, Suspense } from "react";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/Sidebar";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget"; 
import { BottomNav } from "@/components/navigation/BottomNav";
import { LastMatchResult } from "@/components/dashboard/LastMatchResult";
import { NextMatch } from "@/components/dashboard/NextMatch";
import { SkeletonWelcomeBanner } from "@/components/dashboard/skeletons/SkeletonWelcomeBanner";
import { SkeletonQuickActions } from "@/components/dashboard/skeletons/SkeletonQuickActions";
import { TournamentBanner } from "@/components/dashboard/TournamentBanner";
import { SkeletonTournamentBanner } from "@/components/dashboard/skeletons/SkeletonTournamentBanner";
import { SkeletonLastMatchResult } from "@/components/dashboard/skeletons/SkeletonLastMatchResult";
import { SkeletonNextMatch } from "@/components/dashboard/skeletons/SkeletonNextMatch";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/ErrorFallback";

interface Tournament {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  location?: string;
  description?: string;
  status: 'upcoming' | 'in_progress' | 'finished';
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setError(null);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tournaments`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const upcomingTournaments = data.filter(
          (tournament: Tournament) => tournament.status === 'upcoming'
        );
        console.log('Upcoming tournaments:', upcomingTournaments);
        setTournaments(upcomingTournaments);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTournaments();

    return () => {
      setTournaments([]);
      setError(null);
    };
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto bg-[#FAF9F6] pb-16 md:pb-0">
          <div className="p-4 md:p-8 w-full">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}
            
            {loading ? (
              <>
                <SkeletonWelcomeBanner />
                <SkeletonQuickActions />
                <SkeletonTournamentBanner />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <SkeletonLastMatchResult />
                  <SkeletonNextMatch />
                </div>
              </>
            ) : (
              <ErrorBoundary fallback={<ErrorFallback />}>
                <WelcomeBanner 
                  userName="Usuario"
                  notificationCount={0}
                  email=""
                />
                <QuickActions />
                
                {tournaments.length > 0 && (
                  <Suspense fallback={<SkeletonTournamentBanner />}>
                    <TournamentBanner tournaments={tournaments} />
                  </Suspense>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <LastMatchResult hasMatch={false} />
                  <NextMatch hasMatch={false} />
                </div>

                <div>
                  <WeatherWidget />
                </div>
              </ErrorBoundary>
            )}
          </div>
        </main>
        <BottomNav />
      </div>
    </SidebarProvider>
  );
}
