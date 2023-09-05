<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Генерация пользователей</title>

    <script src="https://test.patriot-sport.ru/js_libs/xls-export.js"></script>
</head>
<body>
    <style>
    body {
        padding-left: 5px;
    }

    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 12px;
    }

    tr:nth-child(even) {
        background-color: #dddddd;
    }

    #myProgress {
        width: 100%;
        background-color: #ddd;
    }

    #myBar {
        width: 0%;
        height: 30px;
        background-color: #04AA6D;
        text-align: center;
        line-height: 30px;
        color: white;
    }

    #myProgress1 {
        width: 100%;
        background-color: #ddd;
    }

    #myBar1 {
        width: 0%;
        height: 30px;
        background-color: #04AA6D;
        text-align: center;
        line-height: 30px;
        color: white;
    }
</style>
    <div class="mainTabs">
        <br/>
        <button id="generate_btn">Сгенерировать пользователей</button>
        <br/>
        <br/>
        <table id="myTable">
            <thead>
            <tr>
                <th>ID</th>
                <th>Логин</th>
                <th>Пароль</th>
                <th>Школа</th>
            </tr>
            </thead>
            <tbody id="tableBody"></tbody>
        </table>
    </div>
    <div id="schools" style="display: none;">
        <?php

        require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';

        function randomPassword(): string {
            $alphabet = 'abcdfghijklmnopqrstuvwxyzABCDFGHIJKLMNOPQRSTUVWXYZ1234567890';
            $pass = array(); //remember to declare $pass as an array
            $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
            for ($i = 0; $i < 8; $i++) {
                $n = rand(0, $alphaLength);
                $pass[] = $alphabet[$n];
            }
            return implode($pass); //turn the array into a string
        }

        function gen_token(): string
        {

            return sprintf(
                '%04x%04x',
                mt_rand(0, 0xffff),
                mt_rand(0, 0xffff)
            );

        }

        $sql = "SELECT * FROM schools WHERE archive = '0'";
        $result = mysqli_query($conn, $sql);

        if(mysqli_num_rows($result) > 0)
        {
            while ($row = mysqli_fetch_object($result))
            {

                $schoolID = (int)$row->ID;
                $login = $schoolID . "_school";
                $password = randomPassword();

                $new_password = password_hash($password, PASSWORD_DEFAULT);

                $sql = "INSERT INTO accounts (login, pwd, schoolID) VALUES ('$login', '$new_password', '$schoolID')";
                mysqli_query($conn, $sql);
                $lastID = mysqli_insert_id($conn);

                ?>
                <li
                    data-id="<?= $lastID ?>"
                    data-org="<?= $row->org_name ?>"
                    data-login="<?= $login ?>"
                    data-password="<?= $password ?>"
                ></li>
                <?php

            }
        }

        ?>
    </div>
    <script>

        const generate_btn = document.getElementById('generate_btn');
        const tableBody = document.getElementById('tableBody');

        function allocateItemsToMaps(items, map) {

            items.forEach((item) => {

                map.set(item.ID, item);

            });

        }

        async function get_schools() {

            let form = new FormData();

            let response = await fetch('https://theatres.patriot-sport.ru/php/models/admin/schools/load.php', {
                method: 'POST',
                body: form
            });
            let result = await response.json();
            let tmpMap = new Map();
            allocateItemsToMaps(result.params, tmpMap);

            return tmpMap;

        }

        async function to_excel() {

            tableBody.innerHTML = '';

            const schoolsArray = document.getElementById('schools').getElementsByTagName('li');
            let schools = [];

            Array.from(schoolsArray).map((school, index) => {

                schools.push({
                    id: school.dataset.id,
                    login: school.dataset.login,
                    password: school.dataset.password,
                    org: school.dataset.org,
                });

                let tr = document.createElement('tr');
                tr.innerHTML = `
                            <td>${school.dataset.id}</td>
                            <td>${school.dataset.login}</td>
                            <td>${school.dataset.password}</td>
                            <td>${school.dataset.org}</td>
                        `;

                tableBody.append(tr);

            });

            const xls = new XlsExport(schools, 'Пользователи', {
                id: 'ID',
                email: 'Логин',
                password: 'Пароль',
                org: 'Школа'
            });
            xls.exportToXLS('theatres_users.xls')

        }

        generate_btn.onclick = () => to_excel();

    </script>
</body>
</html>
