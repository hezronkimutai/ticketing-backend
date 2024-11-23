export default (content: any, qrCodeImage: any) => `
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