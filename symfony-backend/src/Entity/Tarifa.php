<?php

namespace App\Entity;

use App\Repository\TarifaRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TarifaRepository::class)]
class Tarifa
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $nombre = null;

    #[ORM\Column(length: 100)]
    private ?string $descripci�on = null;

    #[ORM\Column]
    private ?int $precio = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): static
    {
        $this->nombre = $nombre;

        return $this;
    }

    public function getDescripci�on(): ?string
    {
        return $this->descripci�on;
    }

    public function setDescripci�on(string $descripci�on): static
    {
        $this->descripci�on = $descripci�on;

        return $this;
    }

    public function getPrecio(): ?int
    {
        return $this->precio;
    }

    public function setPrecio(int $precio): static
    {
        $this->precio = $precio;

        return $this;
    }
}
