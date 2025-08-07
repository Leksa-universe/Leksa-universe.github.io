<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // Vérifie que la case RGPD est cochée
  if (!isset($_POST["rgpd"])) {
    echo "Vous devez accepter notre politique de confidentialité.";
    exit;
  }

  // Destinataire
  $to = "compagnonsducastellas@gmail.com";

  // Sécurisation des champs
  $nom = htmlspecialchars(trim($_POST["nom"]));
  $prenom = htmlspecialchars(trim($_POST["prenom"]));
  $email = htmlspecialchars(trim($_POST["email"]));
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "L'adresse email entrée est invalide.";
    exit;
}
  $telephone = htmlspecialchars(trim($_POST["telephone"]));
  $message = htmlspecialchars(trim($_POST["message"]));

  // Sujet + contenu du mail
  $subject = "Nouveau message depuis le site compagnonsducastellas.fr";
  $body  = "Nom : $nom $prenom\n";
  $body .= "Email : $email\n";
  $body .= "Téléphone : $telephone\n\n";
  $body .= "Message :\n$message";

  // Headers
  $headers = "From: Site Compagnons <no-reply@compagnonsducastellas.fr>\r\n";
  $headers .= "Reply-To: $email\r\n";

  // Envoi
  if (mail($to, $subject, $body, $headers)) {
    echo "OK"; 
  } else {
    echo "Une erreur est survenue. Veuillez réessayer.";
  }

} else {
  echo "Méthode non autorisée.";
  exit;
}
?>
