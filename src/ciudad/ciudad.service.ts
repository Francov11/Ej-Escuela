import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';

@Injectable()
export class CiudadService {

    constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository:Repository<Ciudad>
    ){}

    //Agregar ciudad
    async create(createCiudadDto: CreateCiudadDto) {
        try {
          const ciudad : Ciudad = await this.ciudadRepository.save(new Ciudad(createCiudadDto.nombre))
    
          if(ciudad) return `Se creo la ciudad: ${ciudad.nombre}`;
    
        } catch {
          throw new HttpException({
            status: HttpStatus.CONFLICT,
            error: 'Error - create : ' + Error,
            },
            HttpStatus.NOT_FOUND,
        );
        }
      }
    
      //Busacr todas las ciudades
      findAll() {
        try {
          return this.ciudadRepository.find()
        } catch {
          throw new HttpException({
            status: HttpStatus.CONFLICT,
            error: 'Error - findAll : ' + Error,
            },
            HttpStatus.NOT_FOUND,
        );
        }
      }
    
      //Buscar una ciudad
      async findOne(id: number) {
        try {
          const ciudad = await this.ciudadRepository.findOne({
            where: {
                id
            }
        });
        if(!ciudad){
            return new HttpException('Ciudad no encontrada', HttpStatus.NOT_FOUND);
        }
    
        return ciudad;
    
        } catch {
          throw new HttpException({
            status: HttpStatus.CONFLICT,
            error: 'Error - findOne : ' + Error,
            },
            HttpStatus.NOT_FOUND,
        );
        }
      }
    
      //Actualizar una ciudad
      async update(id: number, updateCiudadDto: UpdateCiudadDto) {
        try {
          const ciudad = await this.ciudadRepository.findOne({
            where: {
                id
            }
        })
        if(!ciudad){
            return new HttpException('Ciudad no encontrada', HttpStatus.NOT_FOUND);
        }
  
        const updateCiudad = Object.assign(ciudad, updateCiudadDto)
        console.log(updateCiudad)
  
        return this.ciudadRepository.save(updateCiudad)
    
        } catch {
          throw new HttpException({
            status: HttpStatus.CONFLICT,
            error: 'Error - update : ' + Error,
            },
            HttpStatus.NOT_FOUND,
        );
        }
      }
    
      //Eliminar ciudad
      async remove(id: number) {
        try {
          const result = await this.ciudadRepository.delete({id});
    
          if(result.affected === 0){
              return new HttpException('Ciudad no encontrada', HttpStatus.NOT_FOUND);
          }
    
          return 'Ciudad: ' + id + ' Eliminada';
    
        } catch {
          throw new HttpException({
            status: HttpStatus.CONFLICT,
            error: 'Error - remove : ' + Error,
            },
            HttpStatus.NOT_FOUND,
        );
        }
      }
}
