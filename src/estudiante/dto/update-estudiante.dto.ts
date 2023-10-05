import { Clase } from "src/clases/entities/clase.entity";

//Actualizar estudiante DTO 
export class UpdateEstudianteDto {
    readonly nombre?:string;
    readonly apellido?:string;
    readonly fecha_nacimiento?:Date;
    readonly fk_clases:Clase[];
}
