import { Ciudad } from "src/ciudad/entities/ciudad.entity";
import { Clase } from "src/clases/entities/clase.entity";

export class UpdateEscuelaDto {
    id:number;
    nombre?:string;
    domicilio?:string;
    ciudad_fk:Ciudad[];
    clase_fk:Clase[];
}
