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

export const generateRulesPDF = (tournamentName: string, rules: string): void => {
  try {
    const pdf = new jsPDF();
    
    // Colores
    const primaryColor = [0, 101, 255];  
    const textColor = [51, 51, 51];
    
    pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.rect(0, 0, pdf.internal.pageSize.width, 40, 'F');
    
    pdf.setTextColor(255, 255, 255); 
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(24);
    pdf.text(`${tournamentName}`, 20, 25);
    
    pdf.setFontSize(16);
    pdf.text("Reglamento", 20, 35);
    
    pdf.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.setLineWidth(0.5);
    pdf.line(20, 45, 190, 45);
    
    pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    
    const rulesArray = rules.split('\n');
    let yPosition = 60;
    
    rulesArray.forEach((rule, index) => {
      const bulletPoint = `${index + 1}.`;
      const bulletWidth = pdf.getTextWidth(bulletPoint);
      
      const textWidth = 170 - bulletWidth - 5;
      const splitText = pdf.splitTextToSize(rule, textWidth);
      
      if (yPosition + (splitText.length * 7) > 280) {
        pdf.addPage();
        pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        pdf.rect(0, 0, pdf.internal.pageSize.width, 20, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(12);
        pdf.text(`${tournamentName} - Reglamento (continuación)`, 20, 13);
        yPosition = 40;
        pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
      }
      
      pdf.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      pdf.circle(20, yPosition - 3, 1, 'F');
      
      pdf.text(bulletPoint, 25, yPosition);
      pdf.text(splitText, 40, yPosition);
      
      yPosition += splitText.length * 7 + 5;
    });
    
    const pageCount = pdf.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setTextColor(128, 128, 128);
      pdf.setFontSize(10);
      pdf.text(
        `Página ${i} de ${pageCount}`,
        pdf.internal.pageSize.width / 2,
        pdf.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }
    
    pdf.save(`${tournamentName}-reglamento.pdf`);
  } catch (error) {
    console.error('Error generating rules PDF:', error);
  }
}; 