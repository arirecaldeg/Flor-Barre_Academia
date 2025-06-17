 export interface Tarifa {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;
  tipo: 'mensual' | 'anual';
  orden: number; 
}