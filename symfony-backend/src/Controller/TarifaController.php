<?php

namespace App\Controller;

use App\Entity\Tarifa;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/tarifas')]
class TarifaController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function index(EntityManagerInterface $em): JsonResponse
    {
        $tarifas = $em->getRepository(Tarifa::class)->findAll();
        return $this->json($tarifas);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function getById(int $id, EntityManagerInterface $em): JsonResponse
    {
    $tarifa = $em->getRepository(Tarifa::class)->find($id);

    if (!$tarifa) {
        return $this->json(['error' => 'Tarifa no encontrada'], Response::HTTP_NOT_FOUND);
    }

    return $this->json($tarifa);
    }


    #[Route('', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em, SerializerInterface $serializer): JsonResponse
    {
        $tarifa = $serializer->deserialize($request->getContent(), Tarifa::class, 'json');
        $em->persist($tarifa);
        $em->flush();

        return $this->json($tarifa, Response::HTTP_CREATED);
    }

    
    #[Route('/{id}', methods: ['PUT'])]
    public function update(int $id, Request $request, EntityManagerInterface $em, SerializerInterface $serializer): JsonResponse
    {
        $tarifa = $em->getRepository(Tarifa::class)->find($id);
        if (!$tarifa) {
            return $this->json(['error' => 'Tarifa no encontrada'], Response::HTTP_NOT_FOUND);
        }

        $serializer->deserialize($request->getContent(), Tarifa::class, 'json', [
            'object_to_populate' => $tarifa
        ]);

        $em->flush();

        return $this->json($tarifa);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $em): JsonResponse
    {
        $tarifa = $em->getRepository(Tarifa::class)->find($id);
        if (!$tarifa) {
            return $this->json(['error' => 'Tarifa no encontrada'], Response::HTTP_NOT_FOUND);
        }

        $em->remove($tarifa);
        $em->flush();

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
