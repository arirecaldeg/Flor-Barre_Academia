<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\HttpFoundation\JsonResponse;

final class ContactController extends AbstractController
{
    #[Route('/contact', name: 'app_contact', methods: ['POST'])]
public function contact(Request $request, MailerInterface $mailer): JsonResponse
{
    $data = json_decode($request->getContent(), true);

    // Validación simple
    if (empty($data['nombre']) || empty($data['email']) || empty($data['mensaje'])) {
        return new JsonResponse(['error' => 'Todos los campos son obligatorios.'], Response::HTTP_BAD_REQUEST);
    }

    // Correo destino desde .env
    $destino = $_ENV['CONTACT_DESTINATION_EMAIL'] ?? 'arirecaldegutierrez99@gmail.com';

    // Preparar datos
    $nombre = htmlspecialchars($data['nombre']);
    $emailUsuario = htmlspecialchars($data['email']);
    $mensaje = nl2br(htmlspecialchars($data['mensaje']));

    // Crear contenido HTML
    $emailHtml = <<<HTML
    <div style="max-width:600px; margin:auto; padding:20px; border-radius:12px; background-color:#f4f4f9; font-family:Arial,sans-serif; color:#333; border:1px solid #ddd;">
        <h2 style="color:#C4A4B0; text-align:center;">📩 Nuevo mensaje de contacto</h2>
        <hr style="border:none; border-top:1px solid #ddd; margin:20px 0;">
        <p><strong>Nombre:</strong> {$nombre}</p>
        <p><strong>Email:</strong> {$emailUsuario}</p>
        <p><strong>Mensaje:</strong><br>{$mensaje}</p>
        <hr style="border:none; border-top:1px solid #ddd; margin:20px 0;">
        <p style="font-size:12px; color:#777; text-align:center;">Este mensaje fue enviado desde el formulario de contacto de tu web.</p>
    </div>
    HTML;

    // Crear email
    $emailObj = (new Email())
        ->from('Nuevo mensaje Academia <arirecaldegutierrez99@gmail.com>')
        ->replyTo($data['email'])
        ->to($destino)
        ->subject('Nuevo mensaje desde el formulario de contacto')
        ->html($emailHtml);

    // Enviar email
    $mailer->send($emailObj);

    return new JsonResponse(['success' => 'Mensaje enviado correctamente.']);
}
}