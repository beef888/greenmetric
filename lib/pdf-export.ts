import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export class PDFExportService {
  static async exportElementToPDF(
    elementId: string, 
    filename: string, 
    options: {
      title?: string;
      orientation?: 'portrait' | 'landscape';
      format?: 'a4' | 'letter';
    } = {}
  ) {
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error(`Element with ID ${elementId} not found`);
      }

      // Create canvas from element
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: options.orientation || 'portrait',
        unit: 'mm',
        format: options.format || 'a4'
      });

      // Calculate dimensions
      const imgWidth = options.orientation === 'landscape' ? 297 : 210;
      const pageHeight = options.orientation === 'landscape' ? 210 : 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      // Add title page if provided
      if (options.title) {
        pdf.setFontSize(20);
        pdf.text(options.title, 20, 30);
        pdf.setFontSize(12);
        pdf.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 45);
        pdf.text('Powered by GreenMetric.my', 20, 55);
        
        if (heightLeft > pageHeight - 80) {
          pdf.addPage();
        }
      }

      // Add content
      let position = options.title ? 80 : 0;
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save PDF
      pdf.save(filename);
      return true;
    } catch (error) {
      console.error('PDF export failed:', error);
      return false;
    }
  }

  static async exportCarbonResults(results: any, companyName: string) {
    const filename = `${companyName || 'Company'}_Carbon_Footprint_${new Date().getFullYear()}.pdf`;
    
    return this.exportElementToPDF('carbon-results', filename, {
      title: `Carbon Footprint Report - ${companyName}`,
      orientation: 'portrait'
    });
  }

  static async exportESGResults(results: any, companyName: string) {
    const filename = `${companyName || 'Company'}_ESG_Assessment_${new Date().getFullYear()}.pdf`;
    
    return this.exportElementToPDF('esg-results', filename, {
      title: `ESG Assessment Report - ${companyName}`,
      orientation: 'portrait'
    });
  }

  static async exportMaterialityMatrix(companyName: string) {
    const filename = `${companyName || 'Company'}_Materiality_Matrix_${new Date().getFullYear()}.pdf`;
    
    return this.exportElementToPDF('materiality-matrix', filename, {
      title: `Materiality Matrix - ${companyName}`,
      orientation: 'landscape'
    });
  }

  static async exportReport(reportData: any) {
    const filename = `${reportData.title.replace(/[^a-z0-9]/gi, '_')}.pdf`;
    
    return this.exportElementToPDF('generated-report', filename, {
      title: reportData.title,
      orientation: 'portrait'
    });
  }
}