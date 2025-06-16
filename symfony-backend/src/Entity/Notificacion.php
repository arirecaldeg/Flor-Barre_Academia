<?php

namespace App\Controller;

use App\Entity\Notificacion;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/notificaciones')]
class NotificacionController extends AbstractController
{
    #[Route('', name: 'get_notificaciones', methods: ['GET'])]
    public function getAll(EntityManagerInterface $em): JsonResponse
    {
        $notificaciones = $em->getRepository(Notificacion::class)->findAll();

        $data = [];
        foreach ($notificaciones as $n) {
            $data[] = [
                'id' => $n->getId(),
                'email' => $n->getEmail(),
                'fecha_subscripcion' => $n->getFechaSubscripcion()->format('Y-m-d'),
                'user_ids' => $n->getUsers()->map(fn(User $u) => $u->getId())->toArray()
            ];
        }

        return $this->json($data);
    }

    #[Route('', name: 'create_notificacion', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $notificacion = new Notificacion();
        $notificacion->setEmail($data['email']);
        $notificacion->setFechaSubscripcion(new \DateTime($data['fecha_subscripcion'] ?? 'now'));

        if (isset($data['user_ids']) && is_array($data['user_ids'])) {
            foreach ($data['user_ids'] as $userId) {
                $user = $em->getRepository(User::class)->find($userId);
                if ($user) {
                    $notificacion->addUser($user);
                }
            }
        }

        $em->persist($notificacion);
        $em->flush();

        return $this->json(['message' => 'Notificación creada', 'id' => $notificacion->getId()], 201);
    }

    #[Route('/{id}', name: 'get_notificacion_by_id', methods: ['GET'])]
    public function getById(int $id, EntityManagerInterface $em): JsonResponse
    {
        $n = $em->getRepository(Notificacion::class)->find($id);
        if (!$n) {
            return $this->json(['error' => 'Notificación no encontrada'], 404);
        }

        return $this->json([
            'id' => $n->getId(),
            'email' => $n->getEmail(),
            'fecha_subscripcion' => $n->getFechaSubscripcion()->format('Y-m-d'),
            'user_ids' => $n->getUsers()->map(fn(User $u) => $u->getId())->toArray()
        ]);
    }

    #[Route('/{id}', name: 'delete_notificacion', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $em): JsonResponse
    {
        $n = $em->getRepository(Notificacion::class)->find($id);
        if (!$n) {
            return $this->json(['error' => 'Notificación no encontrada'], 404);
        }

        $em->remove($n);
        $em->flush();

        return $this->json(['message' => 'Notificación eliminada']);
    }
}
