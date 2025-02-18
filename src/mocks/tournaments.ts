import { Tournament } from "@/types/tournament"

export const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: 1,
    name: "Torneo de Verano 2025",
    startDate: "2025-07-15",
    endDate: "2025-07-20",
    categories: ["Cuarta", "Quinta", "Sexta", "Séptima"],
    availableSpots: {
      "Cuarta": 8,
      "Quinta": 12,
      "Sexta": 6,
      "Séptima": 8
    },
    totalTeams: {
      "Cuarta": 16,
      "Quinta": 16,
      "Sexta": 8,
      "Séptima": 8
    },
    registrationDeadline: "2025-07-01",
    price: 3000,
    status: "open",
    image: "/assets/canchapadel.jpeg",
    location: "Recrea Pádel",
    format: "Fase de grupos + eliminatorias",
    matchDuration: "1 hora y media",
    teamsPerCategory: 16,
    description: "El Torneo de Verano 2025 es el evento más esperado de la temporada. Con las mejores instalaciones y un formato que garantiza partidos emocionantes.",
    rules: [
      "Los partidos se jugarán al mejor de 3 sets con tie-break",
      "Cada equipo debe presentarse 15 minutos antes",
      "Se utilizará el sistema de punto de oro",
      "Los equipos deben mantener la misma formación",
      "Se aplicará W.O. después de 15 minutos de tolerancia"
    ],
    sponsors: [
      {
        name: "Gatorade",
        logo: "/assets/logogatorade.png",
        website: "https://www.gatorade.com",
        tier: "platinum"
      },
      {
        name: "Head",
        logo: "/assets/logohead.png",
        website: "https://www.head.com",
        tier: "platinum"
      }
    ],
    venue: {
      name: "Club de Pádel Central",
      address: "Av. del Deporte 123",
      coordinates: {
        lat: -34.6037,
        lng: -58.3816
      },
      facilities: [
        "8 canchas de cristal",
        "Vestuarios con duchas",
        "Cafetería",
        "Zona de calentamiento"
      ],
      parkingAvailable: true
    },
    schedule: [
      {
        date: "2025-07-15",
        events: [
          {
            time: "09:00",
            description: "Inicio fase de grupos - Cuarta"
          },
          {
            time: "14:00",
            description: "Inicio fase de grupos - Quinta"
          }
        ]
      }
    ],
    organizer: {
      name: "Club de Pádel Central",
      contact: "torneos@clubcentral.com",
      logo: "/assets/organizers/central.png"
    },
    prizes: {
      firstPlace: "Trofeo + $100.000",
      secondPlace: "Trofeo + $50.000",
      thirdPlace: "Trofeo + $25.000"
    },
    benefits: [
      "Kit de bienvenida",
      "Hidratación durante partidos",
      "Pelotas oficiales",
      "Fisioterapeuta disponible"
    ]
  },
  {
    id: 2,
    name: "Copa Primavera",
    startDate: "2024-09-10",
    endDate: "2024-09-15",
    categories: ["Cuarta", "Quinta", "Sexta"],
    availableSpots: {
      "Cuarta": 4,
      "Quinta": 8,
      "Sexta": 12
    },
    totalTeams: {
      "Cuarta": 16,
      "Quinta": 16,
      "Sexta": 16
    },
    registrationDeadline: "2024-08-25",
    price: 45,
    status: "open",
    image: "/assets/canchapadel.jpeg",
    location: "Complejo Deportivo Norte",
    format: "Eliminación directa",
    matchDuration: "1 hora",
    teamsPerCategory: 16,
    description: "La Copa Primavera es el torneo perfecto para comenzar la temporada. Ideal para categorías intermedias.",
    rules: [
      "Sistema de eliminación directa",
      "Partidos al mejor de 3 sets",
      "Punto de oro en todos los games",
      "15 minutos de tolerancia"
    ],
    sponsors: [
      {
        name: "Wilson",
        logo: "/assets/sponsors/wilson.svg",
        website: "https://www.wilson.com",
        tier: "platinum"
      }
    ],
    venue: {
      name: "Complejo Deportivo Norte",
      address: "Av. Norte 456",
      coordinates: {
        lat: -34.5837,
        lng: -58.4016
      },
      facilities: [
        "6 canchas de cristal",
        "Vestuarios",
        "Cafetería"
      ],
      parkingAvailable: true
    },
    schedule: [
      {
        date: "2024-09-10",
        events: [
          {
            time: "09:00",
            description: "Primera ronda"
          }
        ]
      }
    ],
    organizer: {
      name: "Complejo Deportivo Norte",
      contact: "info@deportivonorte.com",
      logo: "/assets/organizers/norte.png"
    },
    prizes: {
      firstPlace: "Trofeo + $80.000",
      secondPlace: "Trofeo + $40.000",
      thirdPlace: "Trofeo + $20.000"
    },
    benefits: [
      "Kit deportivo",
      "Hidratación",
      "Pelotas Wilson"
    ]
  },
  {
    id: 3,
    name: "Torneo Metropolitano",
    startDate: "2024-10-20",
    endDate: "2024-10-25",
    categories: ["Quinta", "Sexta", "Séptima"],
    availableSpots: {
      "Quinta": 6,
      "Sexta": 10,
      "Séptima": 8
    },
    totalTeams: {
      "Quinta": 12,
      "Sexta": 16,
      "Séptima": 12
    },
    registrationDeadline: "2024-10-05",
    price: 60,
    status: "open",
    image: "/assets/canchapadel.jpeg",
    location: "Club Metropolitano",
    format: "Round Robin + Playoffs",
    matchDuration: "2 horas",
    teamsPerCategory: 16,
    description: "El Torneo Metropolitano reúne a los mejores jugadores de la región en un formato innovador.",
    rules: [
      "Fase de grupos + playoffs",
      "Partidos al mejor de 3 sets",
      "Tie-break en todos los sets",
      "Cambio de pelotas cada partido"
    ],
    sponsors: [
      {
        name: "Adidas",
        logo: "/assets/sponsors/adidas.svg",
        website: "https://www.adidas.com",
        tier: "platinum"
      }
    ],
    venue: {
      name: "Club Metropolitano",
      address: "Av. Central 789",
      coordinates: {
        lat: -34.6137,
        lng: -58.4216
      },
      facilities: [
        "10 canchas premium",
        "Gimnasio",
        "Restaurant",
        "Spa"
      ],
      parkingAvailable: true
    },
    schedule: [
      {
        date: "2024-10-20",
        events: [
          {
            time: "10:00",
            description: "Ceremonia inaugural"
          }
        ]
      }
    ],
    organizer: {
      name: "Club Metropolitano",
      contact: "torneos@metropolitano.com",
      logo: "/assets/organizers/metro.png"
    },
    prizes: {
      firstPlace: "Trofeo + $150.000",
      secondPlace: "Trofeo + $75.000",
      thirdPlace: "Trofeo + $37.500"
    },
    benefits: [
      "Equipación completa",
      "Servicio de fisioterapia",
      "Análisis de video",
      "Alojamiento incluido"
    ]
  }
] 