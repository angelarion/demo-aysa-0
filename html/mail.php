<?php  



    require("inc/class.phpmailer.php");
    require("inc/class.pop3.php");
    require("inc/class.smtp.php");
    



        // VARIABLES
        $nombre = $_POST['nombre'];
        $email = $_POST['email'];
        $telefono = $_POST['telefono'];
        $mensaje = $_POST['mensaje'];
        $attachments = $_FILES["archivo"]["name"];



        $mail = new PHPMailer();


        $msgHTML = "
          Nombre: $nombre
          Email: $email
          Telefono: $telefono
          Mensaje: $mensaje
        ";

        $mail->IsSMTP();
        $mail->isHTML(true);
        $mail->CharSet = "UTF-8";
        $mail->AddCC("antiguedadesnico@antiguedadesfemenias.com.ar", 'Antiguedades Femenias');
        $mail->SetFrom('antiguedadesnico@hotmail.com', 'Antiguedades Femenias');
        $mail->Subject    = "Consulta de ".$nombre." recibida desde la web";
        $mail->Body= $msgHTML;



        $destinatario = "antiguedadesnico@hotmail.com";

        $mail->AddAddress($destinatario, 'Antigüedades Femenias');
        $mail->AddReplyTo($email, $nombre);
        
        for ($i=0; $i < count($attachments); $i++) { 
          $file_tmp = $_FILES["archivo"]["tmp_name"][$i];
          $file_name = $_FILES["archivo"]["name"][$i];
          move_uploaded_file($file_tmp, "archivo/" . $file_name);
          $mail->AddAttachment('archivo/' . $file_name);
        }
        
        if (!$mail->Send()) {
            echo "Mailer Error: " . $mail->ErrorInfo;
        } else {
            echo json_encode('exito');
        }

?>