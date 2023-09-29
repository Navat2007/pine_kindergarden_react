<?php

class helper
{
    function getRequestHeaders()
    {
        $headers = array();
        foreach ($_SERVER as $key => $value) {
            if (substr($key, 0, 5) <> 'HTTP_') {
                continue;
            }
            $header = str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))));
            $headers[$header] = $value;
        }
        return $headers;
    }

    function sendEmailWithPassword($conn, $email, $pwd, $new)
    {

        $site_url = 'https://dssosny.ru/';

        $to = $email;
        $subject = 'dssosny.ru | ' . ($new ? 'Учетная запись создана' : 'Ваши данные были изменены администратором');
        $message = include $_SERVER['DOCUMENT_ROOT'] . '/php/templates/email/header.php';

        if ($new) {
            $textMsg = `Вы стали зарегистрированным пользователем в системе учета театров`;
        } else {
            $textMsg = `Ваши данные были изменены администратором.`;
        }

        $message .= '<tr style="box-sizing: border-box;">
                        <td style="box-sizing: border-box;">
                            <div class="a-page" style="background-color: #fff; box-sizing: border-box; padding: 1em 1.5em 1.5em;">
                                <p class="title"
                                   style="box-sizing: border-box; font-weight: 600; margin: 0; margin-bottom: 1em; text-align: center;">
                                    Здравствуйте!</p>
                                <p class="text" style="box-sizing: border-box; margin: 0; margin-bottom: 1.5em;">' . $textMsg . '</p>
                                <div class="data" style="box-sizing: border-box; margin-bottom: 1.5em;">
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Логин:
                                        <b style="box-sizing: border-box;">' . $email . '</b></p>
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Пароль:
                                        <b style="box-sizing: border-box;">' . $pwd . '</b></p></div>
                                <div class="linkBlock" style="box-sizing: border-box; font-size: 87.5%;">Для авторизации в системе пройдите
                                    по ссылке <a rel="nofollow noopener"
                                                 target="_blank"
                                                 href="' . $site_url . '"
                                                 style="-webkit-text-decoration-skip: ink; box-sizing: border-box; color: #017ab2; display: inline-block; text-decoration: underline; text-decoration-skip-ink: auto;">' . $site_url . '</a>
                                </div>
                            </div>
                        </td>
                    </tr>';

        $message .= include $_SERVER['DOCUMENT_ROOT'] . '/php/templates/email/footer.php';

        $headers = 'MIME-Version: 1.0' . "\r\n";
        $headers .= "Content-type: text/html; charset=utf-8 \r\n";
        $headers .= "From: dssosny <support@dssosny.ru> \r\n";
        $headers .= "Reply-To: support@dssosny.ru \r\n";

        return (object)[
            'to' => $email,
            'subject' => $subject,
            'message' => $message,
            'mail_result' => mail($to, $subject, $message, $headers),
        ];

    }

    function sendSupportEmail($site, $email, $text, $fio, $org)
    {
        //Patr!otsport123!
        $to = "Support-sport@patriotsport.moscow";
        //$to = "navat2007@yandex.ru";
        $subject = $site . ' | Новый запрос в поддержку';
        $message = include $_SERVER['DOCUMENT_ROOT'] . '/php/templates/email/header.php';

        $message .= '<tr style="box-sizing: border-box;">
                        <td style="box-sizing: border-box;">
                            <div class="a-page" style="background-color: #fff; box-sizing: border-box; padding: 1em 1.5em 1.5em;">
                                <p class="title"
                                   style="box-sizing: border-box; font-weight: 600; margin: 0; margin-bottom: 1em; text-align: center;">
                                    Здравствуйте!</p>
                                <p class="text" style="box-sizing: border-box; margin: 0; margin-bottom: 1.5em;">' . $text . '</p>
                                <div class="data" style="box-sizing: border-box; margin-bottom: 1.5em;">
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">ФИО:
                                        <b style="box-sizing: border-box;">' . $fio . '</b></p>
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Организация:
                                        <b style="box-sizing: border-box;">' . $org . '</b></p>
                                        <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Почта для ответа:
                                        <b style="box-sizing: border-box;">' . $email . '</b></p>
                                </div>
                            </div>
                        </td>
                    </tr>';

        $message .= include $_SERVER['DOCUMENT_ROOT'] . '/php/templates/email/footer.php';

        $headers = 'MIME-Version: 1.0' . "\r\n";
        $headers .= "Content-type: text/html; charset=utf-8 \r\n";
        $headers .= "From: Support <sport.patriot.service@yandex.ru> \r\n";
        //$headers .= "Reply-To: support@patriot-sport.ru";

        $mail_result = mail($to, $subject, $message, $headers);

        return (object)[
            'to' => $to,
            'subject' => $subject,
            'mail_result' => $mail_result,
        ];

    }

    function sendQuestionEmail($site, $email, $text, $phone)
    {
        //$to = "sodruzhestvo@edu.mos.ru";
        $to = "navat2007@yandex.ru";
        $subject = $site . ' | Новый вопрос со страницы О содружестве';
        $message = include $_SERVER['DOCUMENT_ROOT'] . '/php/templates/email/header.php';

        $message .= '<tr style="box-sizing: border-box;">
                        <td style="box-sizing: border-box;">
                            <div class="a-page" style="background-color: #fff; box-sizing: border-box; padding: 1em 1.5em 1.5em;">
                                <p class="title"
                                   style="box-sizing: border-box; font-weight: 600; margin: 0; margin-bottom: 1em; text-align: center;">
                                    Здравствуйте!</p>
                                <p class="text" style="box-sizing: border-box; margin: 0; margin-bottom: 1.5em;">' . $text . '</p>
                                <div class="data" style="box-sizing: border-box; margin-bottom: 1.5em;">
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Телефон для ответа:
                                        <b style="box-sizing: border-box;">' . $phone . '</b>
                                    </p>
                                    <p style="box-sizing: border-box; font-size: 87.5%; margin: 0; margin-bottom: .4285em;">Почта для ответа:
                                        <b style="box-sizing: border-box;">' . $email . '</b>
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>';

        $message .= include $_SERVER['DOCUMENT_ROOT'] . '/php/templates/email/footer.php';

        $headers = 'MIME-Version: 1.0' . "\r\n";
        $headers .= "Content-type: text/html; charset=utf-8 \r\n";
        $headers .= "From: Support <sport.patriot.service@yandex.ru> \r\n";
        //$headers .= "Reply-To: support@patriot-sport.ru";

        $mail_result = mail($to, $subject, $message, $headers);

        return (object)[
            'to' => $to,
            'subject' => $subject,
            'mail_result' => $mail_result,
        ];

    }

    function map_to_js_console($map)
    {

        ?>
        <script>
            <?php
            foreach ($map as $key => $value) {

            ?>
            console.log("<?= $key ?>: ");
            console.log(JSON.parse('<?= json_encode($value) ?>'));
            <?php

            }
            ?>
            console.log("*****************");
        </script>
        <?php

    }

    function value_to_js_console($value)
    {

        ?>
        <script>
            console.log('<?= $value ?>');
        </script>
        <?php

    }

    function check_access($conn, $userID, $section)
    {

        $answer = false;

        $sql = "SELECT * FROM accounts WHERE ID = '$userID'";
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_object($result);

        if ($row->role == "superadmin") {
            if ($section != 0)
                $answer = true;
        }

        if ($row->role == "superadmin" || $row->role == "admin") {
            if ($section == -1)
                $answer = true;
        }

        if ($row->role == "school") {
            if ($section == 0)
                $answer = true;
        }

        $sql1 = "SELECT * FROM admin_role WHERE userID = '$userID'";
        $result1 = mysqli_query($conn, $sql1);

        while ($row1 = mysqli_fetch_object($result1)) {

            if ((int)$row1->roleID == (int)$section)
                $answer = true;

        }

        return $answer;

    }

    function cleanDir($dir)
    {
        $files = glob($dir . "/*");
        if (count($files) > 0) {
            foreach ($files as $file) {
                if (file_exists($file)) {
                    unlink($file);
                }
            }
        }
    }

    function getDateFromDB($date)
    {
        $tmp_date = explode('-', $date);

        return $tmp_date[2] . '.' . $tmp_date[1] . '.' . $tmp_date[0];
    }

    function getDateStr($date, $month = false)
    {
        $dateFormat = 'Y-m-d';

        $msgDate = DateTime::createFromFormat($dateFormat, $date);
        $msgYear = intval($msgDate->format('Y'));
        $msgMonth = intval($msgDate->format('m'));
        $msgDay = intval($msgDate->format('d'));

        $return_str = $msgDay;
        $return_str .= '.' . $msgMonth;
        $return_str .= '.' . $msgYear;

        return $return_str;
    }

    function getDateTimeStr($date, $time = false)
    {
        $dateFormat = 'Y-m-d H:i:s';

        $msgDate = DateTime::createFromFormat($dateFormat, $date);
        $msgYear = intval($msgDate->format('Y'));
        $msgMonth = intval($msgDate->format('m'));
        $msgDay = intval($msgDate->format('d'));
        $msgHour = $msgDate->format('H');
        $msgMinute = $msgDate->format('i');

        $tTime = $time ? $msgHour . ':' . $msgMinute : '';

        $return_str = $msgDay . ' ' . $this->getMonth($msgMonth) . ' ' . $msgYear;

        if ($time)
            $return_str .= ' ' . $tTime;

        return $return_str;
    }

    function getTimeStr($date)
    {
        $dateFormat = 'Y-m-d H:i:s';

        $msgDate = DateTime::createFromFormat($dateFormat, $date);
        $msgHour = $msgDate->format('H');
        $msgMinute = $msgDate->format('i');

        $tTime = $msgHour . ':' . $msgMinute;

        return $tTime;
    }

    function getDateTimeNumber($date, $time = false)
    {
        $dateFormat = 'Y-m-d H:i:s';

        $msgDate = DateTime::createFromFormat($dateFormat, $date);
        $msgYear = intval($msgDate->format('Y'));
        $msgMonth = intval($msgDate->format('m'));
        $msgDay = intval($msgDate->format('d'));
        $msgHour = $msgDate->format('H');
        $msgMinute = $msgDate->format('i');

        $tTime = $time ? $msgHour . ':' . $msgMinute : '';

        $return_str = $returnDate = $msgDay . '.' . $msgMonth . '.' . $msgYear;

        if ($time)
            $return_str .= ' ' . $tTime;

        return $return_str;
    }

    function getMonth($value)
    {
        switch ($value) {
            case 1:
                return 'янв';
            case 2:
                return 'фев';
            case 3:
                return 'мар';
            case 4:
                return 'апр';
            case 5:
                return 'мая';
            case 6:
                return 'июн';
            case 7:
                return 'июл';
            case 8:
                return 'авг';
            case 9:
                return 'сен';
            case 10:
                return 'окт';
            case 11:
                return 'ноя';
            case 12:
                return 'дек';
        }
    }

    function getFullMonth($value)
    {
        switch ($value) {
            case 1:
                return 'январь';
            case 2:
                return 'февраль';
            case 3:
                return 'март';
            case 4:
                return 'апрель';
            case 5:
                return 'май';
            case 6:
                return 'июнь';
            case 7:
                return 'июль';
            case 8:
                return 'август';
            case 9:
                return 'сентябрь';
            case 10:
                return 'октябрь';
            case 11:
                return 'ноябрь';
            case 12:
                return 'декабрь';
        }
    }

    function removeDirectory($dir)
    {
        if (is_file($dir)) {
            @unlink($dir);
        } else {
            array_map('removeDir', glob('/*')) == @rmdir($dir);
        }
        @rmdir($dir);
    }

    function translit_sef($value)
    {
        $converter = array(
            'а' => 'a', 'б' => 'b', 'в' => 'v', 'г' => 'g', 'д' => 'd',
            'е' => 'e', 'ё' => 'e', 'ж' => 'zh', 'з' => 'z', 'и' => 'i',
            'й' => 'y', 'к' => 'k', 'л' => 'l', 'м' => 'm', 'н' => 'n',
            'о' => 'o', 'п' => 'p', 'р' => 'r', 'с' => 's', 'т' => 't',
            'у' => 'u', 'ф' => 'f', 'х' => 'h', 'ц' => 'c', 'ч' => 'ch',
            'ш' => 'sh', 'щ' => 'sch', 'ь' => '', 'ы' => 'y', 'ъ' => '',
            'э' => 'e', 'ю' => 'yu', 'я' => 'ya',
        );

        $value = mb_strtolower($value);
        $value = strtr($value, $converter);
        $value = mb_ereg_replace('[^-0-9a-z]', '-', $value);
        $value = mb_ereg_replace('[-]+', '-', $value);
        $value = trim($value, '-');

        return $value;
    }

    function url_decode($s)
    {
        $s = strtr($s, array("%20" => " ", "%D0%B0" => "а", "%D0%90" => "А", "%D0%B1" => "б", "%D0%91" => "Б", "%D0%B2" => "в", "%D0%92" => "В", "%D0%B3" => "г", "%D0%93" => "Г", "%D0%B4" => "д", "%D0%94" => "Д", "%D0%B5" => "е", "%D0%95" => "Е", "%D1%91" => "ё", "%D0%81" => "Ё", "%D0%B6" => "ж", "%D0%96" => "Ж", "%D0%B7" => "з", "%D0%97" => "З", "%D0%B8" => "и", "%D0%98" => "И", "%D0%B9" => "й", "%D0%99" => "Й", "%D0%BA" => "к", "%D0%9A" => "К", "%D0%BB" => "л", "%D0%9B" => "Л", "%D0%BC" => "м", "%D0%9C" => "М", "%D0%BD" => "н", "%D0%9D" => "Н", "%D0%BE" => "о", "%D0%9E" => "О", "%D0%BF" => "п", "%D0%9F" => "П", "%D1%80" => "р", "%D0%A0" => "Р", "%D1%81" => "с", "%D0%A1" => "С", "%D1%82" => "т", "%D0%A2" => "Т", "%D1%83" => "у", "%D0%A3" => "У", "%D1%84" => "ф", "%D0%A4" => "Ф", "%D1%85" => "х", "%D0%A5" => "Х", "%D1%86" => "ц", "%D0%A6" => "Ц", "%D1%87" => "ч", "%D0%A7" => "Ч", "%D1%88" => "ш", "%D0%A8" => "Ш", "%D1%89" => "щ", "%D0%A9" => "Щ", "%D1%8A" => "ъ", "%D0%AA" => "Ъ", "%D1%8B" => "ы", "%D0%AB" => "Ы", "%D1%8C" => "ь", "%D0%AC" => "Ь", "%D1%8D" => "э", "%D0%AD" => "Э", "%D1%8E" => "ю", "%D0%AE" => "Ю", "%D1%8F" => "я", "%D0%AF" => "Я"));
        return $s;
    }

    function get_img($detect, $img)
    {

        $result = array();

        if ($detect->isMobile()) {

            $arr = explode(".", $img);
            $arr[1] = $arr[1] . "_mini";
            $img_mini = $arr[0] . "." . $arr[1] . "." . $arr[2];
            $result[] = $img_mini;

            $img_webp = $arr[0] . "." . $arr[1] . ".webp";
            $result[] = $img_webp . ", " . $img_mini . " 2x";

        } else {

            $arr = explode(".", $img);
            $result[] = $img;

            $img_webp = $arr[0] . "." . $arr[1] . ".webp";
            $result[] = $img_webp . ", " . $img . " 2x";

        }

        return $result;
    }

    function get_img_mini($img)
    {

        $result = array();

        $arr = explode(".", $img);
        $arr[1] = $arr[1] . "_mini";
        $img_mini = $arr[0] . "." . $arr[1] . "." . $arr[2];
        $result[] = $img_mini;

        $img_webp = $arr[0] . "." . $arr[1] . ".webp";
        $result[] = $img_webp . ", " . $img_mini . " 2x";

        return $result;
    }

    function getGender($genderNumber)
    {

        return $genderNumber == 1 ? "М" : "Ж";

    }

    function gen_token(): string
    {

        return sprintf(
            '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0x0fff) | 0x4000,
            mt_rand(0, 0x3fff) | 0x8000,
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff)
        );

    }

    function createDir($dir){
        $path = $_SERVER['DOCUMENT_ROOT'] . $dir;

        if (!file_exists($path))
            mkdir($path, 0777, true);

        unset($path);
    }

    function deleteDirectory($dir) {
        if (!file_exists($dir)) {
            return true;
        }

        if (!is_dir($dir)) {
            return unlink($dir);
        }

        foreach (scandir($dir) as $item) {
            if ($item == '.' || $item == '..') {
                continue;
            }

            if (!$this->deleteDirectory($dir . DIRECTORY_SEPARATOR . $item)) {
                return false;
            }

        }

        return rmdir($dir);
    }

    function rrmdir(string $directory): bool
    {
        array_map(function (string $file) {
            return is_dir($file) ? $this->rrmdir($file) : unlink($file);
        }, glob($directory . '/' . '*'));

        return rmdir($directory);
    }
}

class log
{

    function add($conn, $userID, $text)
    {

        $sql = "INSERT INTO logs (userID, descript) VALUES ('$userID', '$text')";
        mysqli_query($conn, $sql);

        return mysqli_insert_id($conn);

    }

}

class constant_strings
{

    public $strings = array(

        "event" => array(
            "single" => "Мероприятие",
            "single_down" => "мероприятие",
            "lot" => "Мероприятия",
            "lot_down" => "мероприятия",
            "lots" => "Мероприятий",
            "lots_down" => "мероприятий",
        ),
        "dusch" => array(
            "single" => "Наличие разрешения на участие в зависимости от спортивной подготовки",
        ),

    );

}
