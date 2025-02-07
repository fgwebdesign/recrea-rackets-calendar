"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface Sponsor {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
}

export default function SponsorsBanner() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [AutoPlay({ delay: 6000, stopOnInteraction: false })]
  );

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sponsors`);
        if (!response.ok) throw new Error('Error al cargar los patrocinadores');
        const data = await response.json();
        setSponsors(data);
      } catch (error) {
        console.error('Error fetching sponsors:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || sponsors.length === 0) return null;

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl h-[300px]",
      "transition-all duration-700 transform",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className="flex-[0_0_100%] relative h-full">
              {/* Imagen de fondo */}
              <div className="absolute inset-0">
                <Image
                  src={sponsor.logo_url}
                  alt={sponsor.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>
              
              {/* Contenido del sponsor */}
              <div className="relative h-full flex flex-col justify-end p-6 sm:p-8">
                {/* Contenedor con efecto glassmorphism */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20 transform transition-all duration-500 hover:bg-white/20">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                    {sponsor.name}
                  </h3>
                  
                  {sponsor.website_url && (
                    <a
                      href={sponsor.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-white/90 hover:text-white font-medium text-sm sm:text-base transition-colors group"
                    >
                      Visitar sitio web
                      <ExternalLink className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decoración y efectos adicionales */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}