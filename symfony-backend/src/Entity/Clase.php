<?php

namespace App\Controller;

use App\Entity\Clase;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/clases')]
class ClaseController extends AbstractController
{
    #[Route('', name: 'get_clases', methods: ['GET'])]
    public function getClases(EntityManagerInterface $em): JsonResponse
    {
        $clases = $em->getRepository(Clase::class)->findAll();

        $data = [];
        foreach ($clases as $clase) {
            $data[] = [
                'id' => $clase->getId(),
                'nombre' => $clase->getNombre(),
                'nivel' => $clase->getNivel(),
                'instructor' => $clase->getInstructor(),
                'descripcion' => $clase->getDescripcion(),
                'capacidad_maxima' => $clase->getCapacidadMaxima(),
                'user_id' => $clase->getUser()?->getId()
            ];
        }

        return $this->json($data);
    }

    #[Route('', name: 'create_clase', methods: ['POST'])]
    public function createClase(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = $em->getRepository(User::class)->find($data['user_id']);
        if (!$user) {
            return $this->json(['error' => 'Usuario no encontrado'], 404);
        }

        $clase = new Clase();
        $clase->setNombre($data['nombre']);
        $clase->setNivel($data['nivel']);
        $clase->setInstructor($data['instructor']);
        $clase->setDescripcion($data['descripcion']);
        $clase->setCapacidadMaxima($data['capacidad_maxima']);
        $clase->setUser($user);

        $em->persist($clase);
        $em->flush();

        return $this->json(['message' => 'Clase creada correctamente', 'id' => $clase->getId()], 201);
    }

    #[Route('/{id}', name: 'get_clase_by_id', methods: ['GET'])]
    public function getClaseById(int $id, EntityManagerInterface $em): JsonResponse
    {
        $clase = $em->getRepository(Clase::class)->find($id);
        if (!$clase) {
            return $this->json(['error' => 'Clase no encontrada'], 404);
        }

        return $this->json([
            'id' => $clase->getId(),
            'nombre' => $clase->getNombre(),
            'nivel' => $clase->getNivel(),
            'instructor' => $clase->getInstructor(),
            'descripcion' => $clase->getDescripcion(),
            'capacidad_maxima' => $clase->getCapacidadMaxima(),
            'user_id' => $clase->getUser()?->getId()
        ]);
    }

    #[Route('/{id}', name: 'update_clase', methods: ['PUT'])]
    public function updateClase(int $id, Request $request, EntityManagerInterface $em): JsonResponse
    {
        $clase = $em->getRepository(Clase::class)->find($id);
        if (!$clase) {
            return $this->json(['error' => 'Clase no encontrada'], 404);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['user_id'])) {
            $user = $em->getRepository(User::class)->find($data['user_id']);
            if (!$user) {
                return $this->json(['error' => 'Usuario no encontrado'], 404);
            }
            $clase->setUser($user);
        }

        $clase->setNombre($data['nombre'] ?? $clase->getNombre());
        $clase->setNivel($data['nivel'] ?? $clase->getNivel());
        $clase->setInstructor($data['instructor'] ?? $clase->getInstructor());
        $clase->setDescripcion($data['descripcion'] ?? $clase->getDescripcion());
        $clase->setCapacidadMaxima($data['capacidad_maxima'] ?? $clase->getCapacidadMaxima());

        $em->flush();

        return $this->json(['message' => 'Clase actualizada correctamente']);
    }

    #[Route('/{id}', name: 'delete_clase', methods: ['DELETE'])]
    public function deleteClase(int $id, EntityManagerInterface $em): JsonResponse
    {
        $clase = $em->getRepository(Clase::class)->find($id);
        if (!$clase) {
            return $this->json(['error' => 'Clase no encontrada'], 404);
        }

        $em->remove($clase);
        $em->flush();

        return $this->json(['message' => 'Clase eliminada correctamente']);
    }
}
