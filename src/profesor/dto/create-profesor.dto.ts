import { CiudadProfesor } from "src/ciudad/entities/ciudad_profesor.entity";
import { Clase } from "src/clases/entities/clase.entity";

//Crear profesor DTO
export class CreateProfesorDto {
    nombre:string;
    apellido:string;
    clases:Clase[];
    domicilios:CiudadProfesor[];
}
