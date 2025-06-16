<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class NotificacionController extends AbstractController
{
    #[Route('/notificacion', name: 'app_notificacion')]
    public function index(): Response
    {
        return $this->render('notificacion/index.html.twig', [
            'controller_name' => 'NotificacionController',
        ]);
    }
}
