import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';
import { Repository } from 'typeorm';
import { CreateClaseDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';


@Injectable()
export class ClasesService {

  constructor(
    @InjectRepository(Clase) 
    private claseRepository:Repository<Clase> 
    ){}

    //Agregar clase
    async create(createClaseDto: CreateClaseDto) {
      try {
        const clase : Clase = await this.claseRepository.save(new Clase(createClaseDto.nombre))
  
        if(clase) return `Se creo la clase: ${clase.nombre}`;
  
      } catch {
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error - create : ' + Error,
          },
          HttpStatus.NOT_FOUND,
      );
      }
    }
  
    //Buscar todas las clases
    findAll() {
      try {
        return this.claseRepository.find()
      } catch {
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error - findAll : ' + Error,
          },
          HttpStatus.NOT_FOUND,
      );
      }
    }
  
    //Buscar una clase
    async findOne(id: number) {
      try {
        const clase = await this.claseRepository.findOne({
          where: {
              id
          }
      });
      if(!clase){
          return new HttpException('Clase no encontrada', HttpStatus.NOT_FOUND);
      }
  
      return clase;
  
      } catch {
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error - findOne : ' + Error,
          },
          HttpStatus.NOT_FOUND,
      );
      }
    }
  
    //Actualizar una clase
    async update(id: number, updateClaseDto: UpdateClaseDto) {
      try {
        const clase = await this.claseRepository.findOne({
          where: {
              id
          }
      })
      if(!clase){
          return new HttpException('Clase no encontrada', HttpStatus.NOT_FOUND);
      }

      const updateClase = Object.assign(clase, updateClaseDto)
      console.log(updateClase)

      return this.claseRepository.save(updateClase)
  
      } catch {
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error - update : ' + Error,
          },
          HttpStatus.NOT_FOUND,
      );
      }
    }
  
    //Eliminar clase
    async remove(id: number) {
      try {
        const result = await this.claseRepository.delete({id});
  
        if(result.affected === 0){
            return new HttpException('Clase no encontrada', HttpStatus.NOT_FOUND);
        }
  
        return 'Clase: ' + id + ' Eliminada';
  
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
