<?php

namespace App\Controller;

use App\Entity\Reserva;
use App\Entity\User;
use App\Entity\Clase;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/reservas')]
class ReservaController extends AbstractController
{
    #[Route('', name: 'get_all_reservas', methods: ['GET'])]
    public function getAll(EntityManagerInterface $em): JsonResponse
    {
        $reservas = $em->getRepository(Reserva::class)->findAll();

        $data = array_map(function (Reserva $reserva) {
            return [
                'id' => $reserva->getId(),
                'fecha_reserva' => $reserva->getFechaReserva()->format('Y-m-d H:i:s'),
                'estado' => $reserva->getEstado(),
                'user_id' => $reserva->getUsers()?->getId(),
                'clase_id' => $reserva->getClases()?->getId(),
            ];
        }, $reservas);

        return $this->json($data);
    }

    #[Route('', name: 'create_reserva', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = $em->getRepository(User::class)->find($data['user_id'] ?? null);
        $clase = $em->getRepository(Clase::class)->find($data['clase_id'] ?? null);

        if (!$user || !$clase) {
            return $this->json(['error' => 'Usuario o clase no válidos'], 400);
        }

        $reserva = new Reserva();
        $reserva->setUsers($user);
        $reserva->setClases($clase);
        $reserva->setEstado($data['estado'] ?? 'pendiente');
        $reserva->setFechaReserva(new \DateTime($data['fecha_reserva'] ?? 'now'));

        $em->persist($reserva);
        $em->flush();

        return $this->json(['message' => 'Reserva creada', 'id' => $reserva->getId()], 201);
    }

    #[Route('/{id}', name: 'get_reserva_by_id', methods: ['GET'])]
    public function getById(int $id, EntityManagerInterface $em): JsonResponse
    {
        $reserva = $em->getRepository(Reserva::class)->find($id);
        if (!$reserva) {
            return $this->json(['error' => 'Reserva no encontrada'], 404);
        }

        return $this->json([
            'id' => $reserva->getId(),
            'fecha_reserva' => $reserva->getFechaReserva()->format('Y-m-d H:i:s'),
            'estado' => $reserva->getEstado(),
            'user_id' => $reserva->getUsers()?->getId(),
            'clase_id' => $reserva->getClases()?->getId(),
        ]);
    }

    #[Route('/{id}', name: 'delete_reserva', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $em): JsonResponse
    {
        $reserva = $em->getRepository(Reserva::class)->find($id);
        if (!$reserva) {
            return $this->json(['error' => 'Reserva no encontrada'], 404);
        }

        $em->remove($reserva);
        $em->flush();

        return $this->json(['message' => 'Reserva eliminada']);
    }
}
