<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

class TableCreator{
    private function CheckTableExist($table): bool
    {
        global $conn;
        $sql = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '$table'";
        $result = $conn->query($sql);

        return $result->num_rows > 0;
    }
    private function CheckTableEmpty($table): bool
    {
        global $conn;
        $sql = "SELECT * FROM '$table'";
        $result = $conn->query($sql);

        return $result->num_rows === 0;
    }

    private function CreateSuccessMessage($table)
    {
        echo "Таблица <b>$table</b> создана: <span style='color: darkgoldenrod'>успешно</span><br/>";
    }
    private function CreateErrorMessage($table, $error)
    {
        echo "Таблица <b>$table</b> создана: <span style='color: red'>с ошибкой</span><br/>";
        print_r($error);
        echo "<br/>";
    }

    function CreateAboutTable(){
        global $conn;
        $table = "about";

        $sql = "CREATE TABLE IF NOT EXISTS $table (
            ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            text TEXT NULL,
            preview TEXT NULL,
            image VARCHAR(1000) DEFAULT '' NOT NULL,
            preview_image VARCHAR(1000) DEFAULT '' NOT NULL,
            create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            userID INT(11) UNSIGNED NOT NULL,
            last_userID INT(11) UNSIGNED NOT NULL
        )";

        if ($conn->query($sql) === TRUE) {
            $this->CreateSuccessMessage($table);
        } else {
            $this->CreateErrorMessage($table, $conn->error);
        }
    }
    function CreateAccountsTable(){
        global $conn;
        $table = "accounts";

        $sql = "CREATE TABLE IF NOT EXISTS $table (
            ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) DEFAULT '' NOT NULL,
            login VARCHAR(255) DEFAULT '' NOT NULL,
            pwd VARCHAR(255) NOT NULL,
            token VARCHAR(500) DEFAULT '' NOT NULL,
            last_pwd VARCHAR(255) DEFAULT '' NOT NULL,
            pwd_change_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,    
            create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            photo VARCHAR(500) DEFAULT '' NOT NULL,
            role VARCHAR(25) DEFAULT 'user' NOT NULL,
            fio VARCHAR(255) DEFAULT '' NOT NULL,
            phone VARCHAR(255) DEFAULT '' NOT NULL,
            active INT(11) UNSIGNED DEFAULT '1' NOT NULL,
            archive INT(11) UNSIGNED DEFAULT '0' NOT NULL,
            new_user INT(11) UNSIGNED DEFAULT '1' NOT NULL,
            userID INT(11) UNSIGNED NOT NULL,
            last_userID INT(11) UNSIGNED NOT NULL
        )";

        if ($conn->query($sql) === TRUE) {
            $this->CreateSuccessMessage($table);

            if($this->CheckTableEmpty($table))
            {
                $sql = "INSERT INTO accounts (email, pwd, role, fio, phone) 
                    VALUES ('navat2007@yandex.ru', '$2y$10$I3JRCN0eO/YuXEHfkgNoIO03PSOq4E//e.ovhq.pE3V9vawdUftu.', 'superadmin', 'Сергей', '9207312060')";
                $conn->query($sql);
                $sql = "INSERT INTO accounts (email, pwd, role, fio, phone) 
                    VALUES ('phenix-vn@yandex.ru', '$2y$10$NAHvK0xxV2RYzuWgVbledef81iX/joLrpHgQw1Sea./twDpTAvFKK', 'admin', 'Варвара', '9207312080')";
                $conn->query($sql);

                echo "Добавлены админы по умолчанию в таблицу $table<br/>";
            }
        } else {
            $this->CreateErrorMessage("accounts", $conn->error);
        }
    }
    function CreateDocumentsTable(){
        global $conn;
        $table = "documents";

        $sql = "CREATE TABLE IF NOT EXISTS $table (
            ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(1000) NOT NULL,
            title_short VARCHAR(1000) NOT NULL,
            url VARCHAR(1000) NOT NULL,
            image VARCHAR(1000) DEFAULT '' NOT NULL,  
            create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            userID INT(11) UNSIGNED NOT NULL,
            last_userID INT(11) UNSIGNED NOT NULL
        )";

        if ($conn->query($sql) === TRUE) {
            $this->CreateSuccessMessage($table);
        } else {
            $this->CreateErrorMessage($table, $conn->error);
        }
    }
    function CreateEmployeesTable(){
        global $conn;
        $table = "employees";

        $sql = "CREATE TABLE IF NOT EXISTS $table (
            ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            photo VARCHAR(1000) DEFAULT '' NOT NULL,  
            fio VARCHAR(1000) NOT NULL,
            position VARCHAR(1000) DEFAULT '' NOT NULL,
            categoryID INT(11) UNSIGNED,
            page VARCHAR(1000) DEFAULT '' NOT NULL,            
            create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,            
            userID INT(11) UNSIGNED NOT NULL,
            last_userID INT(11) UNSIGNED NOT NULL
        )";

        if ($conn->query($sql) === TRUE) {
            $this->CreateSuccessMessage($table);
        } else {
            $this->CreateErrorMessage($table, $conn->error);
        }
    }
    function CreateEmployeesCategoryTable(){
        global $conn;
        $table = "employee_category";

        $sql = "CREATE TABLE IF NOT EXISTS $table (
            ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(1000) NOT NULL,
            sorting INT(11) UNSIGNED DEFAULT '0' NOT NULL,      
            create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,            
            userID INT(11) UNSIGNED NOT NULL,
            last_userID INT(11) UNSIGNED NOT NULL
        )";

        if ($conn->query($sql) === TRUE) {
            $this->CreateSuccessMessage($table);

            if($this->CheckTableEmpty($table))
            {
                $sql = "INSERT INTO employee_category (title, sorting) 
                    VALUES ('Заведующий', '1')";
                $conn->query($sql);

                $sql = "INSERT INTO employee_category (title, sorting) 
                    VALUES ('Администрация', '2')";
                $conn->query($sql);

                $sql = "INSERT INTO employee_category (title, sorting) 
                    VALUES ('Воспитатели', '3')";
                $conn->query($sql);

                $sql = "INSERT INTO employee_category (title, sorting) 
                    VALUES ('Педагоги дополнительного образования', '4')";
                $conn->query($sql);

                echo "Добавлены категории по умолчанию в таблицу: $table<br/>";
            }
        } else {
            $this->CreateErrorMessage("employee_category", $conn->error);
        }
    }
    function CreateEmployeesEducationTable(){
        global $conn;
        $table = "employee_education";

        $sql = "CREATE TABLE IF NOT EXISTS $table (
            ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            employeeID INT(11) UNSIGNED NOT NULL,   
            org_name VARCHAR(1000) NOT NULL,
            end_date DATE NOT NULL,
            qualification VARCHAR(1000) NOT NULL, 
            create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,            
            userID INT(11) UNSIGNED NOT NULL,
            last_userID INT(11) UNSIGNED NOT NULL
        )";

        if ($conn->query($sql) === TRUE) {
            $this->CreateSuccessMessage($table);
        } else {
            $this->CreateErrorMessage($table, $conn->error);
        }
    }
    function CreateEmployeesQualificationTable(){
        global $conn;
        $table = "employee_qualification";

        $sql = "CREATE TABLE IF NOT EXISTS $table (
            ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            employeeID INT(11) UNSIGNED NOT NULL,   
            title VARCHAR(1000) NOT NULL,
            date DATE NOT NULL,
            place VARCHAR(1000) NOT NULL, 
            hours INT(11) UNSIGNED DEFAULT '0' NOT NULL,  
            create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,            
            userID INT(11) UNSIGNED NOT NULL,
            last_userID INT(11) UNSIGNED NOT NULL
        )";

        if ($conn->query($sql) === TRUE) {
            $this->CreateSuccessMessage($table);
        } else {
            $this->CreateErrorMessage($table, $conn->error);
        }
    }
    function CreateEmployeesRewardTable(){
        global $conn;
        $table = "employee_reward";

        $sql = "CREATE TABLE IF NOT EXISTS $table (
            ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            employeeID INT(11) UNSIGNED NOT NULL,   
            title VARCHAR(1000) NOT NULL COMMENT 'награды, благодарности',
            date DATE NOT NULL COMMENT 'дата получения награды',
            create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,            
            userID INT(11) UNSIGNED NOT NULL,
            last_userID INT(11) UNSIGNED NOT NULL
        )";

        if ($conn->query($sql) === TRUE) {
            $this->CreateSuccessMessage($table);
        } else {
            $this->CreateErrorMessage($table, $conn->error);
        }
    }
    function CreateEmployeesWorkTable(){
        global $conn;
        $table = "employee_work";

        $sql = "CREATE TABLE IF NOT EXISTS $table (
            ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            employeeID INT(11) UNSIGNED NOT NULL,   
            summary VARCHAR(1000) DEFAULT '' NOT NULL COMMENT 'Общий стаж',
            education VARCHAR(1000) DEFAULT '' NOT NULL COMMENT 'Педагогический стаж',
            work VARCHAR(1000) DEFAULT '' NOT NULL COMMENT 'В данном учреждении',
            category VARCHAR(1000) DEFAULT '' NOT NULL COMMENT 'Квалификационная категория',
            date DATE COMMENT 'Дата аттестации',
            date_order VARCHAR(1000) DEFAULT '' NOT NULL COMMENT 'Приказ',
            create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,            
            userID INT(11) UNSIGNED NOT NULL,
            last_userID INT(11) UNSIGNED NOT NULL
        )";

        if ($conn->query($sql) === TRUE) {
            $this->CreateSuccessMessage($table);
        } else {
            $this->CreateErrorMessage($table, $conn->error);
        }
    }
    function CreateFoodTable(){
        global $conn;
        $table = "food";

        $sql = "CREATE TABLE IF NOT EXISTS $table (
            ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            text TEXT NULL,
            preview TEXT NULL,
            image VARCHAR(1000) DEFAULT '' NOT NULL,
            create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            userID INT(11) UNSIGNED NOT NULL,
            last_userID INT(11) UNSIGNED NOT NULL
        )";

        if ($conn->query($sql) === TRUE) {
            $this->CreateSuccessMessage($table);
        } else {
            $this->CreateErrorMessage($table, $conn->error);
        }
    }
    function CreateFoodMenuTable(){
        global $conn;
        $table = "food_menu";

        $sql = "CREATE TABLE IF NOT EXISTS $table (
            ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(1000) NOT NULL,
            text VARCHAR(2000) NOT NULL,
            url VARCHAR(1000) NOT NULL,
            image VARCHAR(1000) DEFAULT '' NOT NULL,  
            create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            userID INT(11) UNSIGNED NOT NULL,
            last_userID INT(11) UNSIGNED NOT NULL
        )";

        if ($conn->query($sql) === TRUE) {
            $this->CreateSuccessMessage($table);
        } else {
            $this->CreateErrorMessage($table, $conn->error);
        }
    }
    function CreateGroupsTable(){
        global $conn;
        $table = "groups";

        $sql = "CREATE TABLE IF NOT EXISTS $table (
            ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(1000) NOT NULL,
            image VARCHAR(1000) DEFAULT '' NOT NULL,  
            preview VARCHAR(1000) DEFAULT '' NOT NULL,  
            text TEXT DEFAULT NULL,
            create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            userID INT(11) UNSIGNED NOT NULL,
            last_userID INT(11) UNSIGNED NOT NULL
        )";

        if ($conn->query($sql) === TRUE) {
            $this->CreateSuccessMessage($table);
        } else {
            $this->CreateErrorMessage($table, $conn->error);
        }
    }
    function CreateGroupsTeachersTable(){
        global $conn;
        $table = "group_teachers";

        $sql = "CREATE TABLE IF NOT EXISTS $table (
            ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            groupID INT(11) UNSIGNED NOT NULL,   
            teacherID INT(11) UNSIGNED NOT NULL,   
            create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            userID INT(11) UNSIGNED NOT NULL,
            last_userID INT(11) UNSIGNED NOT NULL
        )";

        if ($conn->query($sql) === TRUE) {
            $this->CreateSuccessMessage($table);
        } else {
            $this->CreateErrorMessage($table, $conn->error);
        }
    }
    function CreateLessonsTable(){
        global $conn;
        $table = "lessons";

        $sql = "CREATE TABLE IF NOT EXISTS $table (
            ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(1000) NOT NULL,
            image VARCHAR(1000) DEFAULT '' NOT NULL,  
            text TEXT DEFAULT NULL,
            create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            userID INT(11) UNSIGNED NOT NULL,
            last_userID INT(11) UNSIGNED NOT NULL
        )";

        if ($conn->query($sql) === TRUE) {
            $this->CreateSuccessMessage($table);
        } else {
            $this->CreateErrorMessage($table, $conn->error);
        }
    }
    function CreateLogsTable(){
        global $conn;
        $table = "logs";

        $sql = "CREATE TABLE IF NOT EXISTS $table (
            ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            userID INT(11) UNSIGNED NOT NULL,   
            descript TEXT DEFAULT NULL,
            type VARCHAR(1000) DEFAULT 'system' NOT NULL,  
            create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )";

        if ($conn->query($sql) === TRUE) {
            $this->CreateSuccessMessage($table);
        } else {
            $this->CreateErrorMessage($table, $conn->error);
        }
    }
    function CreateMediaFilesTable(){
        global $conn;
        $table = "media_files";

        $sql = "CREATE TABLE IF NOT EXISTS $table (
            ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(1000) NOT NULL,
            text VARCHAR(2000) DEFAULT '' NOT NULL,  
            url VARCHAR(1000) DEFAULT '' NOT NULL,
            file_name VARCHAR(2000) NOT NULL,            
            type VARCHAR(1000) DEFAULT '' NOT NULL,  
            create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            userID INT(11) UNSIGNED NOT NULL,
            last_userID INT(11) UNSIGNED NOT NULL
        )";

        if ($conn->query($sql) === TRUE) {
            $this->CreateSuccessMessage($table);
        } else {
            $this->CreateErrorMessage($table, $conn->error);
        }
    }
    function CreateMenuTable(){
        global $conn;
        $table = "menu";

        $sql = "CREATE TABLE IF NOT EXISTS $table (
            ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(1000) NOT NULL,
            url VARCHAR(1000) NOT NULL,
            parentID INT(11) UNSIGNED DEFAULT 0 NOT NULL,
            sorting INT(11) UNSIGNED DEFAULT 0 NOT NULL,
            page INT(11) UNSIGNED DEFAULT 1 NOT NULL,
            custom_page INT(11) UNSIGNED DEFAULT 0 NOT NULL,
            create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            userID INT(11) UNSIGNED NOT NULL,
            last_userID INT(11) UNSIGNED NOT NULL
        )";

        if ($conn->query($sql) === TRUE) {
            $this->CreateSuccessMessage($table);
        } else {
            $this->CreateErrorMessage($table, $conn->error);
        }
    }
    function CreateNewsTable(){
        global $conn;
        $table = "news";

        $sql = "CREATE TABLE IF NOT EXISTS $table (
            ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            preview_title VARCHAR(2000) NOT NULL,
            title VARCHAR(2000) NOT NULL COLLATE 'utf8mb4_general_ci',
            date DATETIME NOT NULL,
            text TEXT NULL COLLATE 'utf8mb4_general_ci',
            preview_text TEXT NULL COLLATE 'utf8mb4_general_ci',
            image VARCHAR(1000) DEFAULT '' NOT NULL,
            preview_image VARCHAR(1000) DEFAULT '' NOT NULL,
            show_on_main_page INT(11) UNSIGNED DEFAULT 0 NOT NULL,
            active INT(11) UNSIGNED DEFAULT 1 NOT NULL,
            archive INT(11) UNSIGNED DEFAULT 0 NOT NULL,
            create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            userID INT(11) UNSIGNED NOT NULL,
            last_userID INT(11) UNSIGNED NOT NULL
        )";

        if ($conn->query($sql) === TRUE) {
            $this->CreateSuccessMessage($table);
        } else {
            $this->CreateErrorMessage($table, $conn->error);
        }
    }
    function CreateNewsImagesTable(){
        global $conn;
        $table = "news_images";

        $sql = "CREATE TABLE IF NOT EXISTS $table (
            ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            newsID INT(11) UNSIGNED NOT NULL,
            url VARCHAR(1000) NOT NULL,
            main INT(11) UNSIGNED DEFAULT 0 NOT NULL,
            photo_order INT(11) UNSIGNED DEFAULT 0 NOT NULL
        )";

        if ($conn->query($sql) === TRUE) {
            $this->CreateSuccessMessage($table);
        } else {
            $this->CreateErrorMessage($table, $conn->error);
        }
    }
    function CreateSupportTable(){
        global $conn;
        $table = "support";

        $sql = "CREATE TABLE IF NOT EXISTS $table (
            ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            userID INT(11) UNSIGNED NOT NULL,
            email VARCHAR(1000) NOT NULL,
            text TEXT DEFAULT NULL COLLATE 'utf8mb4_general_ci',
            create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )";

        if ($conn->query($sql) === TRUE) {
            $this->CreateSuccessMessage($table);
        } else {
            $this->CreateErrorMessage($table, $conn->error);
        }
    }

    function CreateAllTables()
    {
        $this->CreateAboutTable();
        $this->CreateAccountsTable();
        $this->CreateDocumentsTable();
        $this->CreateEmployeesTable();
        $this->CreateEmployeesCategoryTable();
        $this->CreateEmployeesEducationTable();
        $this->CreateEmployeesQualificationTable();
        $this->CreateEmployeesRewardTable();
        $this->CreateEmployeesWorkTable();
        $this->CreateFoodTable();
        $this->CreateFoodMenuTable();
        $this->CreateGroupsTable();
        $this->CreateGroupsTeachersTable();
        $this->CreateLessonsTable();
        $this->CreateLogsTable();
        $this->CreateMediaFilesTable();
        $this->CreateMenuTable();
        $this->CreateNewsTable();
        $this->CreateNewsImagesTable();
        $this->CreateSupportTable();
    }
}

class Menu{
    private function CreateSuccessMessage($menu)
    {
        echo "Пункт меню <b>$menu</b> создан: <span style='color: darkgoldenrod'>успешно</span><br/>";
    }
    private function CreateErrorMessage($menu, $error)
    {
        echo "Пункт меню <b>$menu</b> создан: <span style='color: red'>с ошибкой</span><br/>";
        print_r($error);
        echo "<br/>";
    }

    private function AddMenu($title, $url, $parentID, $sorting, $page, $customPage = false){
        global $conn;

        $sql = "INSERT INTO menu (title, url, parentID, sorting, page, custom_page) 
                    VALUES ('$title', '$url', '$parentID', '$sorting', '$page', '$customPage')";

        if ($conn->query($sql) === TRUE) {
            $this->CreateSuccessMessage($title);
        } else {
            $this->CreateErrorMessage($title, $conn->error);
        }

        return mysqli_insert_id($conn);
    }

    private function CreateEducationOrganization($id){
        $this->AddMenu("Основные сведения", "/customPage/", $id, 1, 1, true);
        $this->AddMenu("Структура и органы управления", "/customPage/", $id, 2, 1, true);
        $docs_id = $this->AddMenu("Документы", "", $id, 3, 0);
        $this->CreateDocuments($docs_id);
        $this->AddMenu("Образование", "/customPage/", $id, 4, 1, true);
        $this->AddMenu("Образовательные стандарты", "/customPage/", $id, 5, 1, true);
        $this->AddMenu("Руководство. Педагогический состав", "/employees/", $id, 6, 1);
        $this->AddMenu("Материально-техническое обеспечение", "/customPage/", $id, 7, 1, true);
        $this->AddMenu("Стипендии и иные виды материальной поддержки", "/customPage/", $id, 8, 1, true);
        $this->AddMenu("Финансово-хозяйственная деятельность", "/customPage/", $id, 9, 1, true);
        $this->AddMenu("Вакантные места для приема (перевода)", "/customPage/", $id, 10, 1, true);
        $this->AddMenu("Доступная среда", "/customPage/", $id, 11, 1, true);
        $this->AddMenu("Международное сотрудничество", "/customPage/", $id, 12, 1, true);
    }

    private function CreateDocuments($id){
        $this->AddMenu("Учредительные документы", "/customPage/", $id, 1, 1, true);
        $this->AddMenu("Документы в сфере образования", "/customPage/", $id, 2, 1, true);
        $this->AddMenu("Локальные нормативные акты", "/customPage/", $id, 3, 1, true);
        $this->AddMenu("Результаты проверок", "/customPage/", $id, 4, 1, true);
        $this->AddMenu("Результаты самообследования", "/customPage/", $id, 5, 1, true);
        $this->AddMenu("План финансово-хозяйственной деятельности", "/customPage/", $id, 6, 1, true);
        $this->AddMenu("ГО и ЧС, антитеррор", "/customPage/", $id, 7, 1, true);
        $this->AddMenu("Пожарная безопасность", "/customPage/", $id, 8, 1, true);
        $this->AddMenu("Противодействие коррупции", "/customPage/", $id, 9, 1, true);
        $this->AddMenu("Охрана труда", "/customPage/", $id, 10, 1, true);
        $this->AddMenu("Информационные системы и сети", "/customPage/", $id, 11, 1, true);
        $this->AddMenu("Защита персональных данных", "/customPage/", $id, 12, 1, true);
    }

    private function CreateAbout($id){
        $this->AddMenu("Новости", "/news/", $id, 1, 1);
        $this->AddMenu("Учимся играя", "/customPage/", $id, 2, 1, true);
        $this->AddMenu("Наши достижения", "/customPage/", $id, 3, 1, true);
        $this->AddMenu("Отзывы и предложения", "/customPage/", $id, 4, 1, true);
        $this->AddMenu("Советы родителям", "/customPage/", $id, 5, 1, true);
        $this->AddMenu("Книжный навигатор", "/customPage/", $id, 6, 1, true);
        $gallery_id = $this->AddMenu("Галерея", "", $id, 7, 0);
        $this->CreateGallery($gallery_id);
        $this->AddMenu("Контакты", "/contacts/", $id, 8, 1);
    }

    private function CreateGallery($id){
        $this->AddMenu("Фото", "/customPage/", $id, 1, 1, true);
        $this->AddMenu("Видео", "/customPage/", $id, 2, 1, true);
    }

    private function CreateCondition($id){
        $this->AddMenu("Режим работы", "/customPage/", $id, 1, 1, true);
        $this->AddMenu("Набор и условия приёма", "/customPage/", $id, 2, 1, true);
        $this->AddMenu("Наши группы", "/groups/", $id, 3, 1);
        $this->AddMenu("Питание", "/food/", $id, 4, 1);
        $this->AddMenu("Безопасность", "/customPage/", $id, 5, 1, true);
        $this->AddMenu("Медицинский кабинет", "/customPage/", $id, 6, 1, true);
    }

    private function CreateServices($id){
        $this->AddMenu("Задать вопрос", "/support/", $id, 1, 1);
        $this->AddMenu("Образцы документов", "/customPage/", $id, 2, 1, true);
        $this->AddMenu("Полезные ссылки", "/customPage/", $id, 3, 1, true);
    }

    function CreateMenu($clear = false){
        if($clear){
            global $conn;

            $sql = "DELETE FROM menu";
            $conn->query($sql);
        }

        $this->AddMenu("Главная", "/", 0, 1, 1);
        $this->AddMenu("Платные услуги", "/lessons/", 0, 2, 1);

        $id = $this->AddMenu("Сведения об образовательной организации", "", 0, 3, 0);
        $this->CreateEducationOrganization($id);
        $id = $this->AddMenu("О нас", "", 0, 4, 0);
        $this->CreateAbout($id);
        $id = $this->AddMenu("Условия", "", 0, 5, 0);
        $this->CreateCondition($id);
        $id = $this->AddMenu("e-Сервисы", "", 0, 6, 0);
        $this->CreateServices($id);
    }
}

$tableCreator = new TableCreator();
$menu = new Menu();

$tableCreator->CreateAllTables();
$menu->CreateMenu(true);




