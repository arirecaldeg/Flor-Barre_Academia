<?php

namespace App\Controller\Admin;

use App\Entity\Horario;
use App\Repository\HorarioRepository;
use App\Repository\ClaseRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/admin/horarios')]
class AdminHorarioController extends AbstractController

{
    #[Route('', methods: ['GET'])]
    public function index(HorarioRepository $repository): JsonResponse
    {
        $horarios = $repository->findAll();

        $data = array_map(fn($h) => [
            'id' => $h->getId(),
            'fecha' => $h->getFecha()->format('Y-m-d'),
            'horario_inicio' => $h->getHorarioInicio()->format('H:i'),
            'hora_fin' => $h->getHoraFin()->format('H:i'),
            'clase' => [
                'id' => $h->getClase()->getId(),
                'nombre' => $h->getClase()->getNombre()
            ]
        ], $horarios);

        return $this->json($data);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show($id, HorarioRepository $repo): JsonResponse
    {
        $horario = $repo->find($id);

        if (!$horario) {
            return $this->json(['error' => 'Horario no encontrado'], 404);
        }

        $data = [
            'id' => $horario->getId(),
            'fecha' => $horario->getFecha()->format('Y-m-d'),
            'horario_inicio' => $horario->getHorarioInicio()->format('H:i'),
            'hora_fin' => $horario->getHoraFin()->format('H:i'),
            'clase' => [
                'id' => $horario->getClase()->getId(),
                'nombre' => $horario->getClase()->getNombre()
            ]
        ];

        return $this->json($data);
    }

    #[Route('', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em, ClaseRepository $claseRepo): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $clase = $claseRepo->find($data['clase_id']);
        if (!$clase) {
            return $this->json(['error' => 'Clase no encontrada'], 404);
        }

        $horario = new Horario();
        $horario->setFecha(new \DateTime($data['fecha']));
        $horario->setHorarioInicio(new \DateTime($data['horario_inicio']));
        $horario->setHoraFin(new \DateTime($data['hora_fin']));
        $horario->setClase($clase);

        $em->persist($horario);
        $em->flush();

        return $this->json(['message' => 'Horario creado', 'id' => $horario->getId()], 201);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update($id, Request $request, HorarioRepository $repo, ClaseRepository $claseRepo, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $horario = $repo->find($id);
        if (!$horario) {
            return $this->json(['error' => 'Horario no encontrado'], 404);
        }

        $clase = $claseRepo->find($data['clase_id']);
        if (!$clase) {
            return $this->json(['error' => 'Clase no encontrada'], 404);
        }

        $horario->setFecha(new \DateTime($data['fecha']));
        $horario->setHorarioInicio(new \DateTime($data['horario_inicio']));
        $horario->setHoraFin(new \DateTime($data['hora_fin']));
        $horario->setClase($clase);

        $em->flush();

        return $this->json(['message' => 'Horario actualizado']);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete($id, HorarioRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $horario = $repo->find($id);
        if (!$horario) {
            return $this->json(['error' => 'Horario no encontrado'], 404);
        }

        $em->remove($horario);
        $em->flush();

        return $this->json(['message' => 'Horario eliminado']);
    }
}
