<?php
// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve form data
    $name = htmlspecialchars($_POST['Name']);
    $phone = htmlspecialchars($_POST['Phone']);
    $email = htmlspecialchars($_POST['Email']);
    $description = htmlspecialchars($_POST['Description']);

    // Check if a file is uploaded
    if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['attachment']['tmp_name'];
        $fileName = $_FILES['attachment']['name'];
        $fileSize = $_FILES['attachment']['size'];
        $fileType = $_FILES['attachment']['type'];
        $uploadDir = 'uploads/';

        // Ensure upload directory exists
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        // Set the full file path
        $filePath = $uploadDir . basename($fileName);

        // Move the file to the upload directory
        if (move_uploaded_file($fileTmpPath, $filePath)) {
            echo "File uploaded successfully: $filePath<br>";
        } else {
            echo "Error: Unable to upload file.<br>";
            exit;
        }
    }

    // Process form data (this could be saving to a database or sending an email)
    echo "Form submitted successfully!<br>";
    echo "Name: $name<br>";
    echo "Phone: $phone<br>";
    echo "Email: $email<br>";
    echo "Description: $description<br>";

    // Display uploaded file info (if applicable)
    if (isset($filePath)) {
        echo "Uploaded File: $filePath<br>";
    }
} else {
    echo "Form not submitted properly.<br>";
}
?>
