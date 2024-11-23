import pdf from 'html-pdf';
import QRCode from 'qrcode';
import receiptTemplate from './htmlTemplates/receipt'

/**
 * Function to generate a PDF from HTML with a QR code
 * @param content - The content of the PDF (HTML formatted)
 * @param qrData - The data to encode in the QR code
 * @param outputPath - Path to save the generated PDF
 * @param cb - Callback function to handle the response
 */
export async function generateReceipt(
  content: string,
  qrData: string,
  outputPath: string,
  cb: (err: Error | null) => void
): Promise<void> {
  try {
    const qrCodeImage: string = await QRCode.toDataURL(qrData);
    pdf.create(receiptTemplate(content, qrCodeImage)).toFile(outputPath, (err: Error | null) => {
      if (err) {
        cb(err);
      } else {
        cb(null);
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      cb(error);
    } else {
      cb(new Error('Unknown error occurred'));
    }
  }
}



/**
 * Example usage Uncomment the code below
 */
// const content: string = '<p>This is a sample PDF with <strong>HTML styling</strong> and an embedded QR code.</p>';
// const qrData: string = 'HEZRON'; // URL or data to be encoded in the QR code
// const outputPath: string = `output/${ Math.floor(Math.random() * (10000 - 0) + 0)}_styled_sample_with_qr.pdf`;

// generateReceipt(content, qrData, outputPath, (err: Error | null) => {
//   if (err) {
//     console.error('Error generating PDF with QR code and styling:', err);
//   } else {
//     console.log('Styled PDF with QR code generated successfully at:', outputPath);
//   }
// }); 


