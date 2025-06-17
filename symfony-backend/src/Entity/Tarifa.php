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
    private ?string $descripcion = null;

    #[ORM\Column]
    private ?int $precio = null;

    #[ORM\Column(length: 20)]
    private ?string $tipo = null;

    #[ORM\Column(type: 'integer')]
    private ?int $orden = null;

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

    public function getDescripcion(): ?string
    {
        return $this->descripcion;
    }

    public function setDescripcion(string $descripcion): static
    {
        $this->descripcion = $descripcion;
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

    public function getTipo(): ?string
    {
        return $this->tipo;
    }

    public function setTipo(string $tipo): static
    {
        $this->tipo = $tipo;
        return $this;
    }

    public function getOrden(): ?int
    {
    return $this->orden;
    }

    public function setOrden(int $orden): static
    {
    $this->orden = $orden;
    return $this;
    }
}
