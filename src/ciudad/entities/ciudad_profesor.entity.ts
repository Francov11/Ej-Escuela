import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Ciudad } from "./ciudad.entity";

//Entidad ciudad-profesor
@Entity({name:'ciudad_profesor'})
export class CiudadProfesor{

    //Atrubutos
    @PrimaryColumn()
    ciudadId:number;

    @PrimaryColumn()
    profesorId:number;

    @Column()
    direccion:string;
    
    @ManyToOne(()=>Profesor,profesor=>profesor.domicilios)
    profesor:Profesor;

    @ManyToOne(()=>Ciudad,ciudad=>ciudad.domicilios)
    ciudad:Ciudad;

    //Constructor
    constructor(ciudadId:number,profesorId:number,direccion:string){
        this.ciudadId = ciudadId;
        this.profesorId = profesorId;
        this.direccion = direccion;
    }
}