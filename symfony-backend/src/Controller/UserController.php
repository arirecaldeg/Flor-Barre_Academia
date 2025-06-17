<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[Route('/api/users')]
class UserController extends AbstractController
{
    #[Route('/users', name: 'user_index', methods: ['GET'])]
    public function index(UserRepository $userRepository): JsonResponse
    {
        $users = $userRepository->findAll();

        $data = array_map(fn(User $user) => [
            'id' => $user->getId(),
            'nombre' => $user->getNombre(),
            'email' => $user->getEmail(),
            'telefono' => $user->getTelefono(),
            'rol' => $user->getRol()
        ], $users);

        return $this->json($data);
    }

    #[Route('/{id}', name: 'user_show', methods: ['GET'])]
    public function show(User $user): JsonResponse
    {
        return $this->json([
            'id' => $user->getId(),
            'nombre' => $user->getNombre(),
            'email' => $user->getEmail(),
            'telefono' => $user->getTelefono(),
            'rol' => $user->getRol()
        ]);
    }

#[Route('/', name: 'user_create', methods: ['POST'])]
public function create(
    Request $request,
    EntityManagerInterface $em,
    UserPasswordHasherInterface $passwordHasher
): JsonResponse {
    $data = json_decode($request->getContent(), true);

    $user = new User();
    $user->setNombre($data['nombre']);
    $user->setEmail($data['email']);
    $user->setTelefono($data['telefono']);
    $user->setRol($data['rol'] ?? 'ROLE_USER');

    // ✅ Encriptar la contraseña
    $hashedPassword = $passwordHasher->hashPassword($user, $data['password']);
    $user->setPassword($hashedPassword);

    $em->persist($user);
    $em->flush();

    return $this->json(['message' => 'Usuario creado', 'id' => $user->getId()], Response::HTTP_CREATED);
}

    #[Route('/{id}', name: 'user_update', methods: ['PUT'])]
    public function update(Request $request, User $user, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user->setNombre($data['nombre'] ?? $user->getNombre());
        $user->setEmail($data['email'] ?? $user->getEmail());
        $user->setPassword($data['password'] ?? $user->getPassword());
        $user->setTelefono($data['telefono'] ?? $user->getTelefono());
        $user->setRol($data['rol'] ?? $user->getRol());

        $em->flush();

        return $this->json(['message' => 'Usuario actualizado']);
    }

    #[Route('/{id}', name: 'user_delete', methods: ['DELETE'])]
    public function delete(User $user, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($user);
        $em->flush();

        return $this->json(['message' => 'Usuario eliminado']);
    }
}
