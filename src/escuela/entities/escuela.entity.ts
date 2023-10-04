import { Ciudad } from "src/ciudad/entities/ciudad.entity";
import { Clase } from "src/clases/entities/clase.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'escuela'})
export class Escuela {
    //Atributos
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column()
    domicilio:string;

    @ManyToOne(()=>Ciudad,ciudad=>ciudad.escuelas)
    @JoinColumn({name:"fk_id_ciudad"})
    ciudad:Ciudad;

    @OneToMany(()=>Clase,clases=>clases.escuela)
    clases:Clase[];

    //Controlador
    constructor(nombre:string,domicilio:string){
        this.domicilio = domicilio;
        this.nombre = nombre;
    }

    //Metodos
    public getId():number{return this.id;}

    public getNombre():string{
        return this.nombre;
    }

    public setNombre(nombre:string){
        this.nombre = nombre;
    }

    public getDomicilio():string{
        return this.domicilio
    }

    public setDomicilio(domicilio:string){
        this.domicilio = domicilio
    }

}
