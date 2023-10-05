import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EstudianteClase } from "./estudiante_clase.entity";

//Entidad estudiantes 
@Entity({name:'estudiantes'})
export class Estudiante {

    //Atributos
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column()
    apellido:string;

    @Column()
    fecha_nacimiento:Date;

    @OneToMany(()=>EstudianteClase,estudianteclases=>estudianteclases.estudiante)
    estudianteClases:EstudianteClase[];

    //Constructor
    constructor(nombre:string,apellido:string,fecha:Date){
        this.nombre = nombre;
        this.apellido=apellido;
        this.fecha_nacimiento = fecha;
    }

}
