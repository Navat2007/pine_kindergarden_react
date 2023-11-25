<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

class TableCreator{
    function CheckTableExist($table): bool
    {
        global $conn;
        $sql = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '$table'";
        $result = $conn->query($sql);

        return $result->num_rows > 0;
    }
    function CheckTableEmpty($table): bool
    {
        global $conn;
        $sql = "SELECT * FROM '$table'";
        $result = $conn->query($sql);

        return $result->num_rows === 0;
    }

    function CreateSuccessMessage($table)
    {
        echo "Table <b>$table</b> create: <span style='color: greenyellow'>successfully</span><br/>";
    }
    function CreateErrorMessage($table, $error)
    {
        echo "Table <b>$table</b> create: <span style='color: red'>error</span><br/>";
        print_r($error);
        echo "<br/>";
    }

    function CreateAboutTable(){
        global $conn;

        $sql = "CREATE TABLE IF NOT EXISTS about (
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
            $this->CreateSuccessMessage("about");
        } else {
            $this->CreateErrorMessage("about", $conn->error);
        }
    }
    function CreateAccountsTable(){
        global $conn;

        $sql = "CREATE TABLE IF NOT EXISTS accounts (
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
            $this->CreateSuccessMessage("accounts");

            if($this->CheckTableEmpty("accounts"))
            {
                $sql = "INSERT INTO accounts (email, pwd, role, fio, phone) 
                    VALUES ('navat2007@yandex.ru', '$2y$10$I3JRCN0eO/YuXEHfkgNoIO03PSOq4E//e.ovhq.pE3V9vawdUftu.', 'superadmin', 'Сергей', '9207312060')";
                $conn->query($sql);
                $sql = "INSERT INTO accounts (email, pwd, role, fio, phone) 
                    VALUES ('phenix-vn@yandex.ru', '$2y$10$NAHvK0xxV2RYzuWgVbledef81iX/joLrpHgQw1Sea./twDpTAvFKK', 'admin', 'Варвара', '9207312080')";
                $conn->query($sql);

                echo "Add base admins in table Accounts<br/>";
            }
        } else {
            $this->CreateErrorMessage("accounts", $conn->error);
        }
    }
    function CreateDocumentsTable(){
        global $conn;

        $sql = "CREATE TABLE IF NOT EXISTS documents (
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
            $this->CreateSuccessMessage("documents");
        } else {
            $this->CreateErrorMessage("documents", $conn->error);
        }
    }
    function CreateEmployeesTable(){
        global $conn;

        $sql = "CREATE TABLE IF NOT EXISTS employees (
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
            $this->CreateSuccessMessage("employees");
        } else {
            $this->CreateErrorMessage("employees", $conn->error);
        }
    }
    function CreateEmployeesCategoryTable(){
        global $conn;

        $sql = "CREATE TABLE IF NOT EXISTS employee_category (
            ID INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(1000) NOT NULL,
            sorting INT(11) UNSIGNED DEFAULT '0' NOT NULL,      
            create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,            
            userID INT(11) UNSIGNED NOT NULL,
            last_userID INT(11) UNSIGNED NOT NULL
        )";

        if ($conn->query($sql) === TRUE) {
            $this->CreateSuccessMessage("employee_category");

            if($this->CheckTableEmpty("employee_category"))
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

                echo "Add base admins in table Accounts<br/>";
            }
        } else {
            $this->CreateErrorMessage("employee_category", $conn->error);
        }
    }
    function CreateEmployeesEducationTable(){
        global $conn;

        $sql = "CREATE TABLE IF NOT EXISTS employee_education (
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
            $this->CreateSuccessMessage("employee_education");
        } else {
            $this->CreateErrorMessage("employee_education", $conn->error);
        }
    }
}



$tableCreator = new TableCreator();

$tableCreator->CreateAboutTable();
$tableCreator->CreateAccountsTable();
$tableCreator->CreateDocumentsTable();




