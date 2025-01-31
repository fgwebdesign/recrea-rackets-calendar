import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Match } from '@/types/matches'

interface CancelMatchDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  matchId: string
  match: Match
}

export function CancelMatchDialog({
  isOpen,
  onClose,
  onConfirm,
  matchId,
  match
}: CancelMatchDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cancelar Partido</DialogTitle>
          <DialogDescription>
            ¿Estás seguro que deseas cancelar este partido? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
          >
            Confirmar cancelación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 