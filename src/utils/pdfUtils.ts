import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const generateBracketPDF = async (elementId: string, tournamentId: number, name: string): Promise<void> => {
  const flowElement = document.querySelector(`#${elementId}`);
  if (!flowElement) return;

  try {
    const canvas = await html2canvas(flowElement as HTMLElement, {
      logging: false,
      useCORS: true,
      scale: 2,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${name}-fixture.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}; 