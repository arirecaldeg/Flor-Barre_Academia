<?php

namespace App\Entity;

use App\Repository\HorarioRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: HorarioRepository::class)]
class Horario
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::STRING, length: 20)]
    private ?string $dia_semana = null; // Ej: "Lunes"

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $horario_inicio = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $hora_fin = null;

    #[ORM\ManyToOne(inversedBy: 'horarios')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Clase $clase = null;

    // --------------------
    // Getters y Setters
    // --------------------

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDiaSemana(): ?string
    {
        return $this->dia_semana;
    }

    public function setDiaSemana(string $dia_semana): static
    {
        $this->dia_semana = $dia_semana;

        return $this;
    }

    public function getHorarioInicio(): ?\DateTimeInterface
    {
        return $this->horario_inicio;
    }

    public function setHorarioInicio(\DateTimeInterface $horario_inicio): static
    {
        $this->horario_inicio = $horario_inicio;

        return $this;
    }

    public function getHoraFin(): ?\DateTimeInterface
    {
        return $this->hora_fin;
    }

    public function setHoraFin(\DateTimeInterface $hora_fin): static
    {
        $this->hora_fin = $hora_fin;

        return $this;
    }

    public function getClase(): ?Clase
    {
        return $this->clase;
    }

    public function setClase(?Clase $clase): static
    {
        $this->clase = $clase;

        return $this;
    }
}
