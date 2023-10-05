import { Clase } from "src/clases/entities/clase.entity";

//Crear estudiante DTO 
export class EstudianteDto {
    readonly nombre:string;
    readonly apellido:string;
    readonly fecha_nacimiento:Date;
    readonly fk_clases:Clase[];
}
