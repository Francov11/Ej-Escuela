import { CiudadProfesor } from "src/ciudad/entities/ciudad_profesor.entity";
import { Clase } from "src/clases/entities/clase.entity";


export class UpdateProfesorDto {
    id:number;
    nombre?:string;
    apellido?:string;
    clases:Clase[];
    domicilios:CiudadProfesor[];
}
