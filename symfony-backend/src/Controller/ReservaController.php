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

        // 🚫 Verificar si ya existe una reserva para el usuario, la clase y la fecha/hora
        $fechaReserva = new \DateTime($data['fecha_reserva'] ?? 'now');

        $existingReserva = $em->getRepository(Reserva::class)->findOneBy([
            'users' => $user,
            'clases' => $clase,
            'fecha_reserva' => $fechaReserva,
        ]);

        if ($existingReserva) {
            return $this->json(['error' => 'Ya tienes una reserva para esta clase en ese horario'], 400);
        }

        // 🚫 Verificar si el usuario tiene pases disponibles
        if ($user->getPases() <= 0) {
            return $this->json(['error' => 'No tienes pases disponibles'], 400);
        }

        // ✅ Crear reserva
        $reserva = new Reserva();
        $reserva->setUsers($user);
        $reserva->setClases($clase);
        $reserva->setEstado($data['estado'] ?? 'pendiente');
        $reserva->setFechaReserva($fechaReserva);

        // 🔻 Restar 1 pase
        $user->setPases($user->getPases() - 1);

        $em->persist($reserva);
        $em->persist($user);
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

        // 🟢 Devolver pase al usuario
        $user = $reserva->getUsers();
        if ($user) {
            $user->setPases($user->getPases() + 1);
            $em->persist($user);
        }

        $em->remove($reserva);
        $em->flush();

        return $this->json(['message' => 'Reserva eliminada y pase devuelto']);
    }

    #[Route('/usuario/{id}', name: 'get_reservas_by_user', methods: ['GET'])]
    public function getByUser(int $id, EntityManagerInterface $em): JsonResponse
    {
        $user = $em->getRepository(User::class)->find($id);

        if (!$user) {
            return $this->json(['error' => 'Usuario no encontrado'], 404);
        }

        $reservas = $em->getRepository(Reserva::class)->findBy(['users' => $user]);

        $data = array_map(function (Reserva $reserva) {
            return [
                'id' => $reserva->getId(),
                'fecha_reserva' => $reserva->getFechaReserva()->format('Y-m-d H:i:s'),
                'estado' => $reserva->getEstado(),
                'user_id' => $reserva->getUsers()?->getId(),
                'user_nombre' => $reserva->getUsers()?->getNombre(),
                'clase_id' => $reserva->getClases()?->getId(),
                'clase_nombre' => $reserva->getClases()?->getNombre(),
            ];
        }, $reservas);

        return $this->json($data);
    }

    #[Route('/usuario/{id}/semana', name: 'get_reservas_by_user_week', methods: ['GET'])]
    public function getReservasSemana(int $id, EntityManagerInterface $em): JsonResponse
    {
        $user = $em->getRepository(User::class)->find($id);

        if (!$user) {
            return $this->json(['error' => 'Usuario no encontrado'], 404);
        }

        $inicioSemana = (new \DateTimeImmutable('monday this week'))->setTime(0, 0, 0);
        $finSemana = (new \DateTimeImmutable('sunday this week'))->setTime(23, 59, 59);

        $hoy = new \DateTimeImmutable('today');
        $fin = $hoy->modify('+6 days')->setTime(23, 59, 59);

        $query = $em->createQuery(
            'SELECT r FROM App\Entity\Reserva r
            WHERE r.users = :user
            AND r.fecha_reserva BETWEEN :inicio AND :fin
            ORDER BY r.fecha_reserva ASC'
        )
            ->setParameter('user', $user)
            ->setParameter('inicio', $hoy)
            ->setParameter('fin', $fin);

        $reservas = $query->getResult();

        // Devuelve también el día de la semana y la hora
        $data = array_map(function (Reserva $reserva) {
            $fecha = $reserva->getFechaReserva();
            $diasSemana = [
                'Domingo',
                'Lunes',
                'Martes',
                'Miércoles',
                'Jueves',
                'Viernes',
                'Sábado'
            ];
            return [
                'id' => $reserva->getId(),
                'fecha_reserva' => $fecha->format('Y-m-d H:i:s'),
                'dia_semana' => $diasSemana[(int) $fecha->format('w')],
                'hora' => $fecha->format('H:i'),
                'estado' => $reserva->getEstado(),
                'clase_id' => $reserva->getClases()?->getId(),
                'clase_nombre' => $reserva->getClases()?->getNombre(),
            ];
        }, $reservas);

        return $this->json($data);
    }
}
