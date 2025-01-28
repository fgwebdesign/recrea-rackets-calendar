export interface User {
  id: number
  name: string
  category: string
  avatar?: string
}

export const MOCK_USERS: User[] = [
  {
    id: 1,
    name: "Juan Pérez",
    category: "3ra",
    avatar: "/avatars/juan.jpg"
  },
  {
    id: 2,
    name: "María García",
    category: "4ta",
    avatar: "/avatars/maria.jpg"
  },
  {
    id: 3,
    name: "Carlos López",
    category: "3ra",
    avatar: "/avatars/carlos.jpg"
  },
  {
    id: 4,
    name: "Ana Martínez",
    category: "5ta",
    avatar: "/avatars/ana.jpg"
  },
  {
    id: 5,
    name: "Pedro Rodríguez",
    category: "3ra",
    avatar: "/avatars/pedro.jpg"
  },
  {
    id: 6,
    name: "Laura Sánchez",
    category: "4ta",
    avatar: "/avatars/laura.jpg"
  },
  {
    id: 7,
    name: "Diego López",
    category: "3ra",
    avatar: "/avatars/diego.jpg"
  },
  {
    id: 8,
    name: "Sofía Hernández",
    category: "4ta",
    avatar: "/avatars/sofia.jpg"
  },
  {
    id: 9,
    name: "Jorge Gómez",
    category: "5ta",
    avatar: "/avatars/jorge.jpg"
  },
  {
    id: 10,
    name: "Elena López",
    category: "3ra",
    avatar: "/avatars/elena.jpg"
  },

] 