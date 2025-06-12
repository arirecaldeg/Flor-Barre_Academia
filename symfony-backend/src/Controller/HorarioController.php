<?php

namespace App\Controller;

use App\Entity\Horario;
use App\Entity\Clase;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class HorarioController extends AbstractController
{
    #[Route('/api/horarios', name: 'get_horarios', methods: ['GET'])]
    public function getHorarios(EntityManagerInterface $em): JsonResponse
    {
        $horarios = $em->getRepository(Horario::class)->findAll();

        $data = [];
        foreach ($horarios as $horario) {
            $data[] = [
                'id' => $horario->getId(),
                'hora_inicio' => $horario->getHorarioInicio()->format('H:i'),
                'hora_fin' => $horario->getHoraFin()->format('H:i'),
                'fecha' => $horario->getFecha()->format('Y-m-d'),
                'clase' => [
                    'id' => $horario->getClase()->getId(),
                    'nombre' => $horario->getClase()->getNombre(),
                ],
            ];
        }

        return $this->json($data);
    }

    #[Route('/api/horarios', name: 'create_horario', methods: ['POST'])]
    public function createHorario(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $clase = $em->getRepository(Clase::class)->find($data['clase_id']);
        if (!$clase) {
            return $this->json(['error' => 'Clase no encontrada'], 404);
        }

        $horario = new Horario();
        $horario->setHorarioInicio(new \DateTime($data['horario_inicio']));
        $horario->setHoraFin(new \DateTime($data['hora_fin']));
        $horario->setFecha(new \DateTime($data['fecha']));
        $horario->setClase($clase);

        $em->persist($horario);
        $em->flush();

        return $this->json(['message' => 'Horario creado correctamente'], 201);
    }
    #[Route('/api/horarios/{id}', name: 'update_horario', methods: ['PUT'])]
public function updateHorario(int $id, Request $request, EntityManagerInterface $em): JsonResponse
{
    $horario = $em->getRepository(Horario::class)->find($id);
    if (!$horario) {
        return $this->json(['error' => 'Horario no encontrado'], 404);
    }

    $data = json_decode($request->getContent(), true);

    $clase = $em->getRepository(Clase::class)->find($data['clase_id']);
    if (!$clase) {
        return $this->json(['error' => 'Clase no encontrada'], 404);
    }

    $horario->setHorarioInicio(new \DateTime($data['horario_inicio']));
    $horario->setHoraFin(new \DateTime($data['hora_fin']));
    $horario->setFecha(new \DateTime($data['fecha']));
    $horario->setClase($clase);

    $em->flush();

    return $this->json(['message' => 'Horario actualizado correctamente']);
}

#[Route('/api/horarios/{id}', name: 'delete_horario', methods: ['DELETE'])]
public function deleteHorario(int $id, EntityManagerInterface $em): JsonResponse
{
    $horario = $em->getRepository(Horario::class)->find($id);
    if (!$horario) {
        return $this->json(['error' => 'Horario no encontrado'], 404);
    }

    $em->remove($horario);
    $em->flush();

    return $this->json(['message' => 'Horario eliminado correctamente']);
}   
}
