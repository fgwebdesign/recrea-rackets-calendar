import { AlertCircle } from "lucide-react"

interface TournamentErrorProps {
  message: string
}

export function TournamentError({ message }: TournamentErrorProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg text-red-600 flex items-center gap-2">
        <AlertCircle className="h-5 w-5" />
        {message}
      </div>
    </div>
  )
} 