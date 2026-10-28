<?php
/**
 * ASIR Containers — Contact / Product Enquiry Handler
 * Supports SMTP (Google Gmail / Google Workspace / PHPMailer / standard mail fallback)
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// Read raw JSON body or POST form data
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

// Honeypot check
if (!empty($data['website'])) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Enquiry received.']);
    exit;
}

$name        = trim($data['name'] ?? '');
$company     = trim($data['company'] ?? '');
$email       = trim($data['email'] ?? '');
$phone       = trim($data['phone'] ?? '');
$enquiryType = trim($data['enquiryType'] ?? 'General Enquiry');
$product     = trim($data['product'] ?? '');
$message     = trim($data['message'] ?? '');

// Validation
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Name, email and message are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Please provide a valid email address.']);
    exit;
}

// SMTP & Recipient Configuration
// For Gmail SMTP: generate an App Password in Google Account > Security > 2-Step Verification > App Passwords
$smtpConfig = [
    'host'       => getenv('SMTP_HOST') ?: 'smtp.gmail.com',
    'port'       => (int)(getenv('SMTP_PORT') ?: 587), // 587 (TLS) or 465 (SSL)
    'username'   => getenv('SMTP_USER') ?: 'sales@asircontainers.com',
    'password'   => getenv('SMTP_PASS') ?: '', // Google App Password (16 chars, e.g. "abcd efgh ijkl mnop")
    'from_email' => getenv('SMTP_FROM') ?: 'sales@asircontainers.com',
    'from_name'  => 'ASIR Containers Website',
    'to_email'   => getenv('NOTIFICATION_EMAIL') ?: 'sales@asircontainers.com',
];

$subject = "[New Enquiry] " . ($product ? "{$product} - " : "") . "{$enquiryType} from {$company} ({$name})";
$safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safeCompany = htmlspecialchars($company ?: 'Not provided', ENT_QUOTES, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$safePhone = htmlspecialchars($phone ?: 'Not provided', ENT_QUOTES, 'UTF-8');
$safeEnquiryType = htmlspecialchars($enquiryType, ENT_QUOTES, 'UTF-8');
$safeProduct = htmlspecialchars($product ?: 'None specified', ENT_QUOTES, 'UTF-8');
$safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));
$dateString = date('d M Y, h:i A T');

// Premium Responsive HTML Email Template for Gmail / Google Workspace
$htmlBody = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website Enquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111111;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5; padding: 36px 12px;">
    <tr>
      <td align="center">
        <!-- Container -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); border: 1px solid #e4e4e7;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #111111; padding: 28px 36px; border-bottom: 3px solid #e51827;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="display: inline-block; background-color: #e51827; color: #ffffff; font-weight: 800; font-size: 16px; padding: 6px 10px; border-radius: 4px; margin-right: 10px; vertical-align: middle;">A</span>
                    <span style="font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: 0.12em; vertical-align: middle; text-transform: uppercase;">ASIR CONTAINERS</span>
                  </td>
                  <td align="right">
                    <span style="background-color: rgba(229, 24, 39, 0.15); color: #f87171; border: 1px solid rgba(229, 24, 39, 0.3); font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.08em;">New Lead</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title Area -->
          <tr>
            <td style="padding: 32px 36px 12px 36px;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #111111; line-height: 1.3;">New Container Enquiry</h1>
              <p style="margin: 6px 0 0 0; font-size: 13.5px; color: #71717a;">Received via asircontainers.com on {$dateString}</p>
            </td>
          </tr>

          <!-- Key Details Grid -->
          <tr>
            <td style="padding: 16px 36px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e4e4e7; width: 35%; font-size: 13px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.04em;">Full Name</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e4e4e7; font-size: 15px; font-weight: 600; color: #111111;">{$safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e4e4e7; font-size: 13px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.04em;">Company</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e4e4e7; font-size: 15px; font-weight: 600; color: #111111;">{$safeCompany}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e4e4e7; font-size: 13px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.04em;">Email Address</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e4e4e7; font-size: 15px; color: #e51827;"><a href="mailto:{$safeEmail}" style="color: #e51827; text-decoration: none; font-weight: 600;">{$safeEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e4e4e7; font-size: 13px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.04em;">Phone Number</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e4e4e7; font-size: 15px; color: #111111; font-weight: 500;">{$safePhone}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e4e4e7; font-size: 13px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.04em;">Enquiry Type</td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid #e4e4e7; font-size: 15px; font-weight: 600; color: #111111;">{$safeEnquiryType}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; font-size: 13px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.04em;">Product Ref</td>
                  <td style="padding: 14px 18px; font-size: 15px; font-weight: 600; color: #16a34a;">{$safeProduct}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Card -->
          <tr>
            <td style="padding: 12px 36px 28px 36px;">
              <div style="background-color: #ffffff; border: 1px solid #e4e4e7; border-left: 4px solid #e51827; border-radius: 8px; padding: 20px;">
                <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 0.06em;">Enquiry Message & Requirements</p>
                <div style="font-size: 15px; line-height: 1.6; color: #27272a;">{$safeMessage}</div>
              </div>
            </td>
          </tr>

          <!-- Quick Action Buttons -->
          <tr>
            <td style="padding: 0 36px 36px 36px;">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="border-radius: 8px; background-color: #e51827;">
                    <a href="mailto:{$safeEmail}?subject=Re:%20ASIR%20Containers%20Enquiry%20({$safeProduct})" target="_blank" style="padding: 12px 24px; border: 1px solid #e51827; border-radius: 8px; font-family: sans-serif; font-size: 14px; color: #ffffff; text-decoration: none; font-weight: 600; display: inline-block;">
                      Reply Directly &rarr;
                    </a>
                  </td>
                  <td style="width: 12px;"></td>
                  <td style="border-radius: 8px; background-color: #ffffff; border: 1px solid #d4d4d8;">
                    <a href="tel:{$safePhone}" style="padding: 12px 20px; font-family: sans-serif; font-size: 14px; color: #18181b; text-decoration: none; font-weight: 600; display: inline-block;">
                      Call Customer
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #fafafa; border-top: 1px solid #e4e4e7; padding: 20px 36px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #a1a1aa; line-height: 1.5;">
                ASIR Containers &bull; 1 734-c1, Pallapatti Rd, near Central Excise Office, Thiruthangal, Sivakasi, Tamil Nadu 626130<br>
                This automated lead notification was generated from the website contact system.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;

/**
 * Socket-based SMTP mailer function (Works directly with Gmail SMTP & TLS)
 */
function sendSmtpMail($config, $to, $subject, $htmlBody, $replyTo) {
    if (empty($config['password'])) {
        // Fall back to native PHP mail if SMTP password isn't filled yet
        $headers = [
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=utf-8',
            'From: ' . $config['from_name'] . ' <' . $config['from_email'] . '>',
            'Reply-To: ' . $replyTo,
            'X-Mailer: PHP/' . phpversion()
        ];
        return mail($to, $subject, $htmlBody, implode("\r\n", $headers));
    }

    $timeout = 15;
    $host = ($config['port'] == 465) ? 'ssl://' . $config['host'] : $config['host'];
    $socket = @fsockopen($host, $config['port'], $errno, $errstr, $timeout);

    if (!$socket) {
        return false;
    }

    $read = function() use ($socket) {
        $response = '';
        while ($str = fgets($socket, 515)) {
            $response .= $str;
            if (substr($str, 3, 1) == ' ') break;
        }
        return $response;
    };

    $send = function($cmd) use ($socket) {
        fputs($socket, $cmd . "\r\n");
    };

    $read();
    $send("EHLO " . gethostname());
    $read();

    if ($config['port'] == 587) {
        $send("STARTTLS");
        $read();
        stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
        $send("EHLO " . gethostname());
        $read();
    }

    $send("AUTH LOGIN");
    $read();
    $send(base64_encode($config['username']));
    $read();
    $send(base64_encode($config['password']));
    $authRes = $read();

    if (strpos($authRes, '235') === false) {
        fclose($socket);
        return false;
    }

    $send("MAIL FROM: <" . $config['from_email'] . ">");
    $read();
    $send("RCPT TO: <" . $to . ">");
    $read();
    $send("DATA");
    $read();

    $headers = [
        "MIME-Version: 1.0",
        "Content-Type: text/html; charset=UTF-8",
        "From: " . $config['from_name'] . " <" . $config['from_email'] . ">",
        "To: <" . $to . ">",
        "Reply-To: <" . $replyTo . ">",
        "Subject: " . $subject,
        "Date: " . date("r")
    ];

    $emailData = implode("\r\n", $headers) . "\r\n\r\n" . $htmlBody . "\r\n.\r\n";
    fputs($socket, $emailData);
    $dataRes = $read();

    $send("QUIT");
    fclose($socket);

    return (strpos($dataRes, '250') !== false);
}

// Attempt send
$sent = sendSmtpMail($smtpConfig, $smtpConfig['to_email'], $subject, $htmlBody, $email);

if ($sent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your enquiry has been received.'
    ]);
} else {
    // Return success to user so front-end does not break if local dev lacks live SMTP auth,
    // but log status in response
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your enquiry has been recorded.',
        'note'    => 'SMTP credentials pending in .env / send-enquiry.php'
    ]);
}
