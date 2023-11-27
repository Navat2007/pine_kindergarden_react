<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

$phone = htmlspecialchars($_POST['phone']);
$text = htmlspecialchars($_POST['message']);

$to = "dssosny@yandex.ru, navat2007@yandex.ru";

$subject = 'Новая заявка на обратный звонок | ' . date('d.m.Y H:i');
$message = "";

$message .= '<tr style="box-sizing: border-box;">
                        <td style="box-sizing: border-box;">
                            <div class="a-page" style="background-color: #fff; box-sizing: border-box; padding: 1em 1.5em 1.5em;">
                                <p class="title" style="box-sizing: border-box; font-weight: 600; margin: 0; margin-bottom: 1em; text-align: center;">
                                    Здравствуйте!
                                </p>
                                <div class="data" style="box-sizing: border-box; margin-bottom: 1.5em;">
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Телефон:
                                        <b style="box-sizing: border-box;">' . $phone . '</b>
                                    </p>
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Сообщение:
                                        <b style="box-sizing: border-box;">' . $text . '</b>
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>';

$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= "Content-type: text/html; charset=utf-8 \r\n";
$headers .= "From: Support <kindergarden@forest.ru> \r\n";

$mail_result = mail($to, $subject, $message, $headers);

$content = (object)[

    'input_params' => (object)[
        'POST' => $_POST,
        'GET' => $_GET,
        'FILES' => $_FILES,
    ],
    'to' => $to,
    'subject' => $subject,
    'mail_result' => $mail_result,
    'message' => $message,

];
echo json_encode($content);