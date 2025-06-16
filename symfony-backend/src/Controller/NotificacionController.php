<?php

namespace App\Controller;

use App\Entity\Notificacion;
use App\Repository\NotificacionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Response;

#[Route('/api/notificaciones')]
class NotificacionController extends AbstractController
{
    #[Route('/', name: 'get_notificaciones', methods: ['GET'])]
    public function index(NotificacionRepository $notificacionRepository): JsonResponse
    {
        $notificaciones = $notificacionRepository->findAll();

        $data = array_map(function (Notificacion $n) {
            return [
                'id' => $n->getId(),
                'mensaje' => $n->getMensaje(),
                'leido' => $n->isLeido(),
                'fecha' => $n->getFecha()?->format('Y-m-d H:i:s'),
                'user_id' => $n->getUser()?->getId(),
            ];
        }, $notificaciones);

        return $this->json($data);
    }

    #[Route('/', name: 'create_notificacion', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!$data || !isset($data['mensaje'], $data['user_id'])) {
            return new JsonResponse(['error' => 'Datos incompletos'], Response::HTTP_BAD_REQUEST);
        }

        $user = $em->getRepository(\App\Entity\User::class)->find($data['user_id']);

        if (!$user) {
            return new JsonResponse(['error' => 'Usuario no encontrado'], Response::HTTP_NOT_FOUND);
        }

        $notificacion = new Notificacion();
        $notificacion->setMensaje($data['mensaje']);
        $notificacion->setLeido(false);
        $notificacion->setFecha(new \DateTime());
        $notificacion->setUser($user);

        $em->persist($notificacion);
        $em->flush();

        return new JsonResponse(['message' => 'Notificación creada'], Response::HTTP_CREATED);
    }
}
