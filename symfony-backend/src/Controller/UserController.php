<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    #[Route('/api/users', name: 'create_user', methods: ['POST'])]
    public function createUser(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = new User();
        $user->setNombre($data['nombre']);
        $user->setRol($data['rol']);
        $user->setContraseña($data['contraseña']); // ojo: con Ñ
        $user->setTelefono($data['telefono']);
        $user->setEmail($data['email']);

        $em->persist($user);
        $em->flush();

        return $this->json([
            'message' => 'Usuario creado correctamente',
            'id' => $user->getId()
        ], 201);
    }
}
