import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository , FindOneOptions } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { CiudadDTO } from './dto/ciudad.dto';

@Injectable()
export class CiudadService {

    private ciudades:Ciudad[] = [];

    constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository:Repository<Ciudad>
    ){}

    async findAllRaw():Promise<CiudadDTO[]>{
        this.ciudades = [];
        let datos = await this.ciudadRepository.query("select * from ciudad");
        datos.forEach(element => {
            let ciudad : Ciudad = new Ciudad(element['nombre']);
            this.ciudades.push(ciudad)
        });
        return this.ciudades;
    }

    async findAllOrm():Promise<CiudadDTO[]>{
        return await this.ciudadRepository.find();
    }

    async findById(id :number) : Promise<CiudadDTO> {
        try{
            const criterio : FindOneOptions = { where: { id:id} };
            const ciudad : CiudadDTO = await this.ciudadRepository.findOne( criterio );
            if(ciudad)
                return ciudad
            else  
                throw new Error('No se encuentra la ciudad');
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'Error en ciudad - ' + error
            },HttpStatus.NOT_FOUND)
        }
    }

    async create(ciudadDTO : CiudadDTO) : Promise<boolean>{
        try{
            let ciudad : Ciudad = await this.ciudadRepository.save(new Ciudad(ciudadDTO.nombre));
            if(ciudad)
               return true;
           else
               throw new Error('No se pudo crear la cuidad');
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en ciudad - ' + error
            },HttpStatus.NOT_FOUND)
        }

    }


    // {
    //     id:1
    //     nombre:null
    // }

    // {
    //     id:1
    // }




    async update(ciudadDTO : CiudadDTO, id:number) : Promise<String>{
        try{
            const criterio : FindOneOptions = { where : {id:id} }
            let ciudad : Ciudad = await this.ciudadRepository.findOne(criterio);

            // ciudad= { 
            //     id:1
            //     nombre:"Tandil"
            //     habitantes:166
            // }

            if(!ciudad)
                throw new Error('no se pudo encontrar la ciudad a modificar ');
            else{
                let ciudadVieja = ciudad.getNombre();

                // ciudadVieja = Tandil
                if(ciudadDTO.nombre != null && ciudadDTO.nombre != undefined)
                    ciudad.setNombre(ciudadDTO.nombre);

                // // {
                //     id:1
                //     nombre:null
                //     habitantes:12
                // }

                ciudad = await this.ciudadRepository.save(ciudad);
                return `OK - ${ciudadVieja} --> ${ciudadDTO.nombre}`
            }
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en ciudad - ' + error
            },HttpStatus.NOT_FOUND)
        }

    }

    async delete(id:number): Promise<any>{
        try{
            const criterio : FindOneOptions = { where : {id:id} }
            let ciudad : Ciudad = await this.ciudadRepository.findOne(criterio);
            if(!ciudad)
                throw new Error('no se eliminar ciudad ');
            else{
                await this.ciudadRepository.remove(ciudad);
                return { id:id,
                        message:'se elimino exitosamente'
                    }
                }
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en ciudad - ' + error
            },HttpStatus.NOT_FOUND)
        }
    }




}
