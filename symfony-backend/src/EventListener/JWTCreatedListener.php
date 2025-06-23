<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\Security\Core\User\UserInterface;

class JWTCreatedListener
{
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        $user = $event->getUser();
        $payload = $event->getData();

        // Añade el id (y más campos si quieres)
        if (method_exists($user, 'getId')) {
            $payload['id'] = $user->getId();
        }
        if (method_exists($user, 'getNombre')) {
            $payload['nombre'] = $user->getNombre();
        }

        $event->setData($payload);
    }
}
