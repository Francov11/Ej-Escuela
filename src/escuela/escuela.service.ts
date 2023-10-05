import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateEscuelaDto } from './dto/create-escuela.dto';
import { UpdateEscuelaDto } from './dto/update-escuela.dto';
import { Escuela } from './entities/escuela.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EscuelaService {

  constructor(@InjectRepository(Escuela) private readonly escuelaRepository:Repository<Escuela>){}

  //Agregar escuela
  async create(createEscuelaDto: CreateEscuelaDto) {
    try {
      const escuela : Escuela = await this.escuelaRepository.save(new Escuela(createEscuelaDto.nombre, createEscuelaDto.domicilio))

      if(escuela) return `Se creo la escuela: ${escuela.nombre}`;
      
    } catch {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error - create : ' + Error,
        },
        HttpStatus.NOT_FOUND,
    );
    }
  }

  //Buscar todas las escuelas
  findAll() {
    try {
      return this.escuelaRepository.find()
    } catch {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error - findAll : ' + Error,
        },
        HttpStatus.NOT_FOUND,
    );
    }
  }

  //Buscar una escuela
  async findOne(id: number) {
    try {
      const escuela = await this.escuelaRepository.findOne({
        where: {
            id
        }
    });
    if(!escuela){
        return new HttpException('Escuela no encontrada', HttpStatus.NOT_FOUND);
    }

    return escuela;

    } catch {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error - findOne : ' + Error,
        },
        HttpStatus.NOT_FOUND,
    );
    }
  }

  //Actualizar escuela
  async update(id: number, updateEscuelaDto: UpdateEscuelaDto) {
    try {
      const escuela = await this.escuelaRepository.findOne({
        where: {
            id
        }
    })
    if(!escuela){
        return new HttpException('Escuela no encontrada', HttpStatus.NOT_FOUND);
    }
    console.log(escuela)
    const updateEscuela = Object.assign(escuela, updateEscuelaDto)
    console.log(updateEscuela)
    return this.escuelaRepository.save(updateEscuela)

    } catch {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error - update : ' + Error,
        },
        HttpStatus.NOT_FOUND,
    );
    }
  }

  //Eliminar escuela
  async remove(id: number) {
    try {
      const result = await this.escuelaRepository.delete({id});

      if(result.affected === 0){
          return new HttpException('Escuela no encontrada', HttpStatus.NOT_FOUND);
      }

      return 'Escuela: ' + id + ' Eliminada';

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
