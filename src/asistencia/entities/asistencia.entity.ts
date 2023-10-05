import { EstudianteClase } from "src/estudiante/entities/estudiante_clase.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

//Entidad asistencia
@Entity('asistencia')
export class Asistencia {

    //Atributos
    @PrimaryColumn({name:'estudianteClaseClaseId'})
    claseId:number;

    @PrimaryColumn({name:'estudianteClaseEstudianteId'})
    estudianteId:number;

    @CreateDateColumn()
    fecha:Date;

    @ManyToOne(()=>EstudianteClase,estudianteClase=>estudianteClase.asistencias)
    @JoinColumn()
    estudianteClase:EstudianteClase;

    //Constructor
    constructor(claseId:number,estudianteId:number){
        this.claseId = claseId;
        this.estudianteId = estudianteId;
    }
}
