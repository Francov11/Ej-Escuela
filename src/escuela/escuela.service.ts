import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateEscuelaDto } from './dto/create-escuela.dto';
import { UpdateEscuelaDto } from './dto/update-escuela.dto';
import { Escuela } from './entities/escuela.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EscuelaService {

  constructor(@InjectRepository(Escuela) private readonly escuelaRepository:Repository<Escuela>){}

  async create(createEscuelaDto: CreateEscuelaDto) {
    try {
      const escuela = await this.escuelaRepository.findOne({
        where: {
            id: createEscuelaDto.id
        }
    });
    if(escuela){
      return new HttpException('Escuela already exist', HttpStatus.CONFLICT);
    }
    const nuevaEscuela = this.escuelaRepository.create(createEscuelaDto);
      
    return this.escuelaRepository.save(nuevaEscuela);
    } catch {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error - create : ' + Error,
        },
        HttpStatus.NOT_FOUND,
    );
    }
  }

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

  async findOne(id: number) {
    try {
      const escuela = await this.escuelaRepository.findOne({
        where: {
            id
        }
    });
    if(!escuela){
        return new HttpException('Escuela not found', HttpStatus.NOT_FOUND);
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

  async update(id: number, updateEscuelaDto: UpdateEscuelaDto) {
    try {
      const escuela = await this.escuelaRepository.findOne({
        where: {
            id
        }
    })
    if(!escuela){
        return new HttpException('Escuela not found', HttpStatus.NOT_FOUND);
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

  async remove(id: number) {
    try {
      const result = await this.escuelaRepository.delete({id});

      if(result.affected === 0){
          return new HttpException('Escuela not found', HttpStatus.NOT_FOUND);
      }

      return 'Escuela: ' + id + ' Eliminado';

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
