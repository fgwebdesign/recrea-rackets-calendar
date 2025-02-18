import { Button } from "@/components/ui/button"
import { FileDown, Calendar, MapPin, Trophy, Info } from "lucide-react"
import jsPDF from "jspdf"

interface DownloadRulesButtonProps {
  tournamentName: string
  rules: string[]
  organizerName: string
  sponsors: Array<{
    name: string
    logo: string
    tier: string
  }>
  startDate: string
  endDate: string
  location: string
  format: string
  venue: {
    name: string
    address: string
  }
}

export function DownloadRulesButton({ 
  tournamentName, 
  rules, 
  organizerName,
  sponsors,
  startDate,
  endDate,
  location,
  format,
  venue
}: DownloadRulesButtonProps) {
  const generatePDF = async () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    // Colores corporativos
    const primaryBlue = [75, 131, 242]
    const darkBlue = [28, 57, 126]
    const lightGray = [107, 114, 128]
    const accentBlue = [59, 130, 246]

    // Header con barra de color
    pdf.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
    pdf.rect(0, 0, 210, 15, 'F')

    // Título principal
    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(24)
    pdf.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2])
    pdf.text("Reglamento del Torneo", 20, 35)

    // Subtítulo (nombre del torneo)
    pdf.setFontSize(16)
    pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
    pdf.text(tournamentName, 20, 45)

    // Línea decorativa
    pdf.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
    pdf.setLineWidth(0.5)
    pdf.line(20, 50, 190, 50)

    // Sección de información del torneo
    pdf.setFillColor(245, 247, 250) // Color de fondo suave
    pdf.rect(20, 60, 170, 40, 'F')
    pdf.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
    pdf.setLineWidth(0.2)
    pdf.rect(20, 60, 170, 40, 'S')

    // Información del torneo con iconos y diseño moderno
    pdf.setFontSize(11)
    pdf.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2])

    // Fecha
    pdf.setFont("helvetica", "bold")
    pdf.text("Fecha del Torneo:", 25, 70)
    pdf.setFont("helvetica", "normal")
    pdf.text(`${formatDate(startDate)} - ${formatDate(endDate)}`, 80, 70)

    // Sede
    pdf.setFont("helvetica", "bold")
    pdf.text("Sede:", 25, 78)
    pdf.setFont("helvetica", "normal")
    pdf.text(`${venue.name} - ${venue.address}`, 80, 78)

    // Formato
    pdf.setFont("helvetica", "bold")
    pdf.text("Formato:", 25, 86)
    pdf.setFont("helvetica", "normal")
    pdf.text(format, 80, 86)

    // Ubicación
    pdf.setFont("helvetica", "bold")
    pdf.text("Ubicación:", 25, 94)
    pdf.setFont("helvetica", "normal")
    pdf.text(location, 80, 94)

    // Sección de sponsors
    let yPosition = 110
    try {
      pdf.setFontSize(12)
      pdf.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2])
      pdf.text("Patrocinadores Oficiales", 20, yPosition)

      let sponsorX = 20
      const sponsorY = yPosition + 10
      const sponsorWidth = 40
      const sponsorGap = 10

      // Cargar y agregar logos de sponsors
      for (const sponsor of sponsors.filter(s => s.tier === 'platinum' || s.tier === 'gold')) {
        try {
          const logoData = await fetch(sponsor.logo).then(response => response.blob())
          const logoBase64 = await new Promise<string>((resolve) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result as string)
            reader.readAsDataURL(logoData)
          })

          pdf.addImage(logoBase64, 'PNG', sponsorX, sponsorY, sponsorWidth, 20)
          pdf.setFontSize(8)
          pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2])
          pdf.text(sponsor.name, sponsorX + sponsorWidth/2, sponsorY + 25, { align: 'center' })
          
          sponsorX += sponsorWidth + sponsorGap
        } catch (error) {
          console.error(`Error al cargar el logo de ${sponsor.name}:`, error)
        }
      }
    } catch (error) {
      console.error('Error al procesar sponsors:', error)
    }

    // Contenido - Reglas
    yPosition = 160
    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(11)
    pdf.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2])

    rules.forEach((rule, index) => {
      // Círculo numerado para cada regla
      pdf.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
      pdf.circle(25, yPosition - 1, 2, 'F')

      // Texto de la regla
      const lines = pdf.splitTextToSize(rule, 150)
      lines.forEach((line: string, lineIndex: number) => {
        if (yPosition > 270) {
          pdf.addPage()
          // Agregar la barra de color en la nueva página
          pdf.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
          pdf.rect(0, 0, 210, 15, 'F')
          yPosition = 30
        }
        pdf.text(line, 35, yPosition + (lineIndex * 6))
      })
      yPosition += (lines.length * 6) + 8
    })

    // Footer en cada página
    const pageCount = pdf.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i)
      
      // Línea decorativa footer
      pdf.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
      pdf.line(20, 280, 190, 280)

      // Información del footer
      pdf.setFontSize(9)
      pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2])
      const today = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      
      // Footer con 3 columnas
      pdf.text(`Generado el ${today}`, 20, 287)
      pdf.text(organizerName, pdf.internal.pageSize.getWidth() / 2, 287, { align: 'center' })
      pdf.text(`Página ${i} de ${pageCount}`, 190, 287, { align: 'right' })
    }

    // Descargar el PDF
    pdf.save(`reglamento-${tournamentName.toLowerCase().replace(/\s+/g, '-')}.pdf`)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Button
      variant="outline"
      onClick={generatePDF}
      className="flex items-center gap-2 hover:bg-blue-50"
    >
      <FileDown className="h-4 w-4" />
      Descargar Reglamento
    </Button>
  )
} 