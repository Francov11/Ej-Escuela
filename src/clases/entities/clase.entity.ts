import { Escuela } from "src/escuela/entities/escuela.entity";
import { EstudianteClase } from "src/estudiante/entities/estudiante_clase.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

//Entidad clase
@Entity({name:'clase'})
export class Clase {

    //Atributos
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre: string;

    @ManyToOne(()=>Profesor,profesor=>profesor.clases)
    @JoinColumn({name:"fk_id_profesor"})
    profesor:Profesor;

    @ManyToOne(()=>Escuela,escuela=>escuela.clases)
    @JoinColumn({name:"fk_id_escuela"})
    escuela:Escuela;

    @OneToMany(()=>EstudianteClase,estudianteclases=>estudianteclases.clase)
    estudianteClases:EstudianteClase[];

    //Constructor
    constructor(nombre:string){
        this.nombre=nombre;
    }

    //Metodos
    public getId(): number {
        return this.id;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string) {
        this.nombre = nombre;
    }
}
