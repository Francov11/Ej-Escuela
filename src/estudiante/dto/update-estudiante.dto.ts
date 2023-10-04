import { Clase } from "src/clases/entities/clase.entity";

export class UpdateEstudianteDto {
    readonly nombre?:string;
    readonly apellido?:string;
    readonly fecha_nacimiento?:Date;
    readonly fk_clases:Clase[];
}
