<?php

namespace App\Controller;

use App\Entity\Clase;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ClaseController extends AbstractController
{
    #[Route('/api/clases', name: 'get_clases', methods: ['GET'])]
    public function getClases(EntityManagerInterface $em): JsonResponse
    {
        $clases = $em->getRepository(Clase::class)->findAll();

        $data = [];
        foreach ($clases as $clase) {
            $data[] = [
                'id' => $clase->getId(),
                'nombre' => $clase->getNombre(),
                'descripcion' => $clase->getDescripcion(),
                'capacidad_maxima' => $clase->getCapacidadMaxima(),
                'nivel' => $clase->getNivel(),
                'instructor' => $clase->getInstructor(),
                'users_id' => $clase->getUser()?->getId(),
            ];
        }

        return $this->json($data);
    }

    #[Route('/api/clases', name: 'create_clase', methods: ['POST'])]
    public function createClase(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $clase = new Clase();
        $clase->setNombre($data['nombre']);
        $clase->setDescripcion($data['descripcion']);
        $clase->setCapacidadMaxima($data['capacidad_maxima']);
        $clase->setNivel($data['nivel']);
        $clase->setInstructor($data['instructor']);

        // Buscar y asignar el usuario si se incluye users_id
        if (isset($data['users_id'])) {
            $user = $em->getRepository(User::class)->find($data['users_id']);
            if (!$user) {
                return $this->json(['error' => 'Usuario no encontrado'], 404);
            }
            $clase->setUser($user);
        }

        $em->persist($clase);
        $em->flush();

        return $this->json([
            'message' => 'Clase creada correctamente',
            'id' => $clase->getId()
        ], 201);
    }
}
