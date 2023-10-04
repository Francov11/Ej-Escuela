import { EstudianteClase } from "src/estudiante/entities/estudiante_clase.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('asistencia')
export class Asistencia {

    @PrimaryColumn({name:'estudianteClaseClaseId'})
    claseId:number;

    @PrimaryColumn({name:'estudianteClaseEstudianteId'})
    estudianteId:number;

    @CreateDateColumn()
    fecha:Date;


    constructor(claseId:number,estudianteId:number){
        this.claseId = claseId;
        this.estudianteId = estudianteId;
    }

    @ManyToOne(()=>EstudianteClase,estudianteClase=>estudianteClase.asistencias)
    @JoinColumn()
    estudianteClase:EstudianteClase;

}
