<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos del formulario
    $name = $_POST['nombre'];
    $email = $_POST['correo'];
    $phone = $_POST['telefono'];
    $message = $_POST['mensaje'];

    // Validar los datos
    if (!empty($name) && !empty($email) && !empty($message)) {
        // Dirección de correo de destino
        $to = "info@tecnycompu.net"; 

        // Asunto del correo
        $subject = "Nuevo mensaje de contacto de $name";

        // Construir el cuerpo del mensaje
        $emailContent = "Nombre: $name\n";
        $emailContent .= "Correo Electrónico: $email\n";
        $emailContent .= "Teléfono: $phone\n\n";
        $emailContent .= "Mensaje:\n$message\n";

        // Encabezados del correo
        $headers = "From: $email";

        // Enviar el correo
        if (mail($to, $subject, $emailContent, $headers)) {
            echo "Correo enviado exitosamente.";
        } else {
            echo "Error al enviar el correo.";
        }
    } else {
        echo "Por favor, complete todos los campos.";
    }
} else {
    echo "Método de solicitud no válido.";
}
?>
