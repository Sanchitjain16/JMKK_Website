<?php
// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // reCAPTCHA Secret Key (replace with your secret key from Google reCAPTCHA)
    $secretKey = "6Lcf_8IqAAAAADRjFYpyr41eW4nf4J97fXo-wMfi";
    $responseKey = $_POST['g-recaptcha-response'];
    $userIP = $_SERVER['REMOTE_ADDR'];

    // Verify reCAPTCHA response
    $verifyURL = "https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$responseKey&remoteip=$userIP";
    $response = file_get_contents($verifyURL);
    $responseKeys = json_decode($response, true);

    if (!$responseKeys["success"]) {
        echo "Error: reCAPTCHA verification failed.";
        exit;
    }

    // Retrieve form data
    $name = htmlspecialchars($_POST['Name']);
    $phone = htmlspecialchars($_POST['Phone']);
    $email = htmlspecialchars($_POST['Email']);
    $description = htmlspecialchars($_POST['Description']);

    // Check if a file was uploaded
    if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['attachment']['tmp_name'];
        $fileName = $_FILES['attachment']['name'];
        $fileSize = $_FILES['attachment']['size'];
        $fileType = $_FILES['attachment']['type'];
        $uploadDir = 'uploads/';

        // Create the upload directory if it doesn't exist
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $filePath = $uploadDir . basename($fileName);

        // Move the file to the upload directory
        if (move_uploaded_file($fileTmpPath, $filePath)) {
            echo "File uploaded successfully: $filePath";
        } else {
            echo "Error: Unable to upload file.";
            exit;
        }
    }

    // Process the form (you can store the data in a database or send an email)
    echo "Form submitted successfully!<br>";
    echo "Name: $name<br>";
    echo "Phone: $phone<br>";
    echo "Email: $email<br>";
    echo "Description: $description<br>";

    if (isset($filePath)) {
        echo "Uploaded File: $filePath<br>";
    }
} else {
    echo "Error: Invalid request method.";
}
?>
