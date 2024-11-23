import fs from 'fs';
import pdf from 'html-pdf';
import QRCode from 'qrcode';

/**
 * Function to generate a PDF from HTML with a QR code
 * @param content - The content of the PDF (HTML formatted)
 * @param qrData - The data to encode in the QR code
 * @param outputPath - Path to save the generated PDF
 * @param cb - Callback function to handle the response
 */
export async function generateStyledPDFWithQRCode(
  content: string,
  qrData: string,
  outputPath: string,
  cb: (err: Error | null) => void
): Promise<void> {
  try {
    // Generate the QR code image as a Data URL
    const qrCodeImage: string = await QRCode.toDataURL(qrData);

    // Combine the content with the QR code image in HTML
    const htmlContent: string = `
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  font-size: 14px;
                  line-height: 1.6;
                  padding: 20px;
              }
              h1 {
                  color: #4CAF50;
              }
              .qr-code {
                  margin-top: 20px;
                  text-align: center;
              }
              .content {
                  margin-bottom: 30px;
              }
          </style>
      </head>
      <body>
          <h1>Sample PDF with QR Code</h1>
          <div class="content">${content}</div>
          <div class="qr-code">
              <img src="${qrCodeImage}" alt="QR Code" width="150" height="150" />
          </div>
      </body>
      </html>
    `;

    // Use html-pdf to generate the PDF from HTML content
    pdf.create(htmlContent).toFile(outputPath, (err: Error | null) => {
      if (err) {
        cb(err); // Return error through callback
      } else {
        cb(null); // PDF generation completed successfully
      }
    });
  } catch (error) {
    // Handle any errors that occur during the process
    if (error instanceof Error) {
      cb(error);
    } else {
      cb(new Error('Unknown error occurred'));
    }
  }
}


