import { google, Auth } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

const clientId = process.env.MAIL_CLIENT_ID;
const clientSecret = process.env.MAIL_CLIENT_SECRET;
const redirectUrl = process.env.MAIL_REDIRECT_URL;

console.log({ clientId, clientSecret, redirectUrl })

// Initialize OAuth2 client
const authClient = new OAuth2(clientId, clientSecret, redirectUrl);

/**
 * Function to send an email using Gmail API
 * @param ss - Unused parameter
 * @param content - Content of the email
 * @param to - Recipient email address
 * @param from - Sender email address
 * @param subject - Email subject
 * @param cb - Callback function to handle response
 */
export function sendMail(content: string, to: any, from: any, subject: any, cb: any) {


    // Set credentials with access_token, refresh_token, and other details
    authClient.setCredentials({
        "access_token": "ya29.a0AXooCgusk436jQCM1toGb8Ysm00muh2C0S7FNGHBPQeeH-9J74XaTduDK7PfIbu-I0dndRwlws2-ROGllgR1lmLTV0Ju2rNYvLZ1DszYfPScTsS14OcdpeM1tUhFYWhqu7vWd9_HG6b-d2AGrc-hVZFqwNwKIubRe2liaCgYKAf8SARASFQHGX2Mi7w2eS5_5rTAJSWRoHKSYLQ0171",
        "refresh_token": "1//09HEtbL4826bgCgYIARAAGAkSNwF-L9IrKN8OWIUM9kp2TooOONJoKqDA8ci5xxiLfr53XtZVGPE27DI5q2dQs7jkQALvgRImH9w",
        "scope": "https://www.googleapis.com/auth/gmail.send",
        "token_type": "Bearer"
    });

    // Check if the access token has expired
    if (isAccessTokenExpired(authClient)) {
        // Access token expired, refresh it
        refreshAccessToken(authClient)
            .then(() => {
                // Once refreshed, send the email
                sendEmail(authClient, content, to, from, subject, cb);
            })
            .catch(err => {
                console.error('Error refreshing access token:', err);
                cb(err);
            });
    } else {
        // Access token is still valid, directly send the email
        sendEmail(authClient, content, to, from, subject, cb);
    }
}

/**
 * Helper function to check if the access token has expired
 * @param authClient - OAuth2 client instance
 * @returns true if access token is expired, false otherwise
 */
function isAccessTokenExpired(authClient: Auth.OAuth2Client): boolean {
    const expiryDate = authClient.credentials.expiry_date;
    if (!expiryDate) {
        return true; // No expiry date means token is considered expired
    }
    return Date.now() >= expiryDate;
}

/**
 * Helper function to refresh the access token
 * @param authClient - OAuth2 client instance
 * @returns Promise<void>
 */
function refreshAccessToken(authClient: Auth.OAuth2Client): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        authClient.refreshAccessToken((err, tokens) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

/**
 * Helper function to send email using Gmail API
 * @param authClient - OAuth2 client instance
 * @param content - Content of the email
 * @param to - Recipient email address
 * @param from - Sender email address
 * @param subject - Email subject
 * @param cb - Callback function to handle response
 */
function sendEmail(authClient: Auth.OAuth2Client, content: string, to: any, from: any, subject: any, cb: any) {
    let emailLines = [
        `Content-Type: text/html; charset="UTF-8"`,
        `MIME-Version: 1.0`,
        `Content-Transfer-Encoding: 7bit`,
        `to: ${to}`,
        `from: ${from}`,
        `subject: ${subject}`,
        '',
        `${content}`
    ];

    let email = emailLines.join('\n');
    let encodedMail = Buffer.from(email).toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

    const gmail = google.gmail({ version: 'v1', auth: authClient });

    gmail.users.messages.send({
        userId: 'me',
        requestBody: {
            raw: encodedMail
        }
    }, cb);
}
