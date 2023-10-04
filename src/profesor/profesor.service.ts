import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { Repository } from 'typeorm';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { CiudadProfesor } from 'src/ciudad/entities/ciudad_profesor.entity';

@Injectable()
export class ProfesorService {

  constructor(@InjectRepository(Profesor)
              private readonly profesorRepository:Repository<Profesor>,
              @InjectRepository(Ciudad)
              private readonly ciudadRepository:Repository<Ciudad>,
              @InjectRepository(CiudadProfesor)
              private readonly ciudadProfesorRepository:Repository<CiudadProfesor>
               ){}

  async createDomicilio(body){
    const { ciudadId, profesorId, domicilio} = body;

    const profesor = await this.profesorRepository.findOne({where:{id:profesorId}})
    if(!profesor)
      return 'error - no existe este profesor'
    const ciudad = await this.ciudadRepository.findOne({where:{id:ciudadId}})
    if(!ciudad)
      return 'error - no existe la ciudad para este profesor'
    const nuevo_domicilio = await this.ciudadProfesorRepository.findOne({where:{ciudadId:ciudadId,profesorId:profesorId}})
    if(nuevo_domicilio)
      return 'profesor ya tiene domicilio'
    return await this.ciudadProfesorRepository.save(new CiudadProfesor(ciudadId,profesorId,domicilio))
  }

  async create(createProfesorDto: CreateProfesorDto) {
    try {
      const profesor = await this.profesorRepository.findOne({
        where: {
            id: createProfesorDto.id
        }
    });
    if(profesor){
      return new HttpException('Profesor already exist', HttpStatus.CONFLICT);
    }
    const nuevoProfesor = this.profesorRepository.create(createProfesorDto);
      
    return this.profesorRepository.save(nuevoProfesor);
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
      return this.profesorRepository.find()
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
      const profesor = await this.profesorRepository.findOne({
        where: {
            id
        }
    });
    if(!profesor){
        return new HttpException('Profesor not found', HttpStatus.NOT_FOUND);
    }

    return profesor;

    } catch {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error - findOne : ' + Error,
        },
        HttpStatus.NOT_FOUND,
    );
    }
  }

  async update(id: number, updateProfesorDto: UpdateProfesorDto) {
    try {
      const profesor = await this.profesorRepository.findOne({
        where: {
            id
        }
    })
    if(!profesor){
        return new HttpException('Profesor not found', HttpStatus.NOT_FOUND);
    }
    console.log(profesor)
    const updateProfesor = Object.assign(profesor, updateProfesorDto)
    console.log(updateProfesor)
    return this.profesorRepository.save(updateProfesor)

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
      const result = await this.profesorRepository.delete({id});

      if(result.affected === 0){
          return new HttpException('Profesor not found', HttpStatus.NOT_FOUND);
      }

      return 'Profesor: ' + id + ' Eliminado';

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
