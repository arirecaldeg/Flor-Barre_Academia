import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Clase {
  nombre: string;
  imagen: string;
  cupo: string;
  duracion: string;
  nivel: string;
  descripcion: string;
}

@Component({
  selector: 'app-clases',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './clases.component.html',
})
export class ClasesComponent {
  clases: Clase[] = [
    {
      nombre: 'Barre',
      imagen: 'barre.jpeg.webp',
      cupo: '14',
      duracion: '50 min',
      nivel: 'Básico / Intermedio',
      descripcion: `Nuestra clase de Barre está diseñada para que cualquier persona, sin importar su nivel de experiencia o condición física, pueda disfrutar de una sesión completa, dinámica y profundamente transformadora. Combinamos movimientos inspirados en el ballet, el pilates y el yoga para trabajar de forma integral todo el cuerpo, enfocándonos en tonificación, alineación postural, resistencia y conexión mente-cuerpo.

Si eres nueva en el mundo del barre, encontrarás opciones adaptadas para comenzar con seguridad y confianza. Y si ya tienes experiencia, te retarás con secuencias más intensas y conscientes. Aquí todas las barrealinas tienen su lugar, porque lo importante no es hacerlo perfecto, sino sentirte bien contigo misma en cada movimiento.

Una clase para fortalecer, estirar, respirar y, sobre todo, disfrutar.`,
    },
    {
      nombre: 'Barre Suave',
      imagen: 'suave.jpg.webp',
      cupo: '12',
      duracion: '50 min',
      nivel: 'Básico',
      descripcion: `Esta modalidad está pensada para quienes buscan una experiencia más pausada, amable y consciente. Ideal si te estás iniciando, si te estás recuperando de alguna lesión, o simplemente si ese día tu cuerpo te pide un ritmo más lento.

En Barre Suave mantenemos la esencia del barre, trabajando fuerza, postura, flexibilidad y coordinación, pero con transiciones más suaves, más tiempo para cada movimiento y un enfoque profundo en la respiración y el autocuidado.

Es una clase perfecta para reconectar contigo misma, liberar tensiones y mover el cuerpo de forma respetuosa y efectiva. Porque a veces, bajar el ritmo también es una forma poderosa de avanzar.`,
    },
    {
      nombre: 'Barre PRO',
      imagen: 'pro.png',
      cupo: '16',
      duracion: '50 min',
      nivel: 'Avanzado',
      descripcion: `Esta clase está pensada para quienes ya tienen una base sólida en barre y desean llevar su práctica al siguiente nivel. En Barre PRO combinamos secuencias más exigentes, mayor duración en las posiciones y un enfoque técnico que desafía tanto la fuerza como la resistencia y el control corporal.

Aquí afinamos detalles, pulimos la alineación y profundizamos en la conexión mente-cuerpo, siempre respetando los límites personales pero buscando superarlos con cada sesión.

Es una clase ideal si ya llevas un tiempo practicando y quieres perfeccionar tu técnica, aumentar tu intensidad o simplemente disfrutar del placer de moverte con potencia, precisión y gracia.

Una experiencia intensa y gratificante, creada para barrelinas que quieren más.`,
    },
    {
      nombre: 'Barre EMB',
      imagen: 'emb.png',
      cupo: '8',
      duracion: '50 min',
      nivel: 'Embarazadas',
      descripcion: `En esta etapa tan especial de la vida, el movimiento consciente es una herramienta poderosa para cuidar el cuerpo, conectar con el bebé y fortalecer la mente.

BARRE EMB es una clase diseñada específicamente para embarazadas y mamás recientes, respetando los cambios físicos y emocionales que acompañan al embarazo y al postparto.

Trabajamos con ejercicios suaves, seguros y adaptados, que ayudan a mejorar la postura, aliviar tensiones, fortalecer el suelo pélvico, tonificar suavemente y fomentar la circulación. Además, el enfoque en la respiración y la conciencia corporal favorece la relajación y el bienestar general.

Tanto si estás en pleno embarazo como en el proceso de recuperación tras dar a luz, esta clase es tu espacio para moverte con calma, sentirte acompañada y cuidar de ti desde el cariño.

Aquí, cada barrelinas EMB lleva su propio ritmo, y todas son bienvenidas.`,
    },
    {
      nombre: 'Barre ENG',
      imagen: 'eng.png',
      cupo: '12',
      duracion: '50 min',
      nivel: 'Básico / Intermedio',
      descripcion: `Hemos creado BARRE ENG, una clase pensada especialmente para barrelinas extranjeras, impartida íntegramente en inglés.

Es una oportunidad perfecta para disfrutar de una sesión completa de barre —tonificación, elongación, equilibrio y conciencia corporal— en un ambiente acogedor y accesible, donde podrás seguir cada movimiento con claridad y sentirte parte de la comunidad.

Ya sea que estés de paso, viviendo en la isla o simplemente te sientas más cómoda en inglés, esta clase está diseñada para ti.

Porque el bienestar no entiende de fronteras, y moverse con gracia y fuerza es un idioma universal.`,
    },
  ];
}
