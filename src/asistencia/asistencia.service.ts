import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { Repository } from 'typeorm';
import { EstudianteClase } from 'src/estudiante/entities/estudiante_clase.entity';

@Injectable()
export class AsistenciaService {

  constructor(@InjectRepository(Asistencia)
              private readonly asistenciaRepository:Repository<Asistencia>,
              @InjectRepository(EstudianteClase)
              private readonly estudianteClaseRepository:Repository<EstudianteClase>)
              {}

  //Agregar asistencia      
  async create(createAsistenciaDto: CreateAsistenciaDto) {
    const { estudianteId,claseId} = createAsistenciaDto;
    const asistencia_estudiante = await this.estudianteClaseRepository.findOne({where:{estudianteId:estudianteId,claseId:claseId}});
    if(!asistencia_estudiante)
      return 'no existe estudiante/clase'
    return await this.asistenciaRepository.save(new Asistencia(claseId,estudianteId));
  }

  //Buscar todas las asistencias
  findAll() {
    try {
      return this.asistenciaRepository.find()
    } catch {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error - findAll : ' + Error,
        },
        HttpStatus.NOT_FOUND,
    );
    }
  }

  //Buscar una asistencia
  async findOne(claseId: number) {
    try {
      const asistencia = await this.asistenciaRepository.findOne({
        where: {
          claseId
        }
    });
    if(!asistencia){
        return new HttpException('Asistencia no encontrada', HttpStatus.NOT_FOUND);
    }

    return asistencia;

    } catch {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error - findOne : ' + Error,
        },
        HttpStatus.NOT_FOUND,
    );
    }
  }

  //Actualizar una asistencia
  async update(claseId: number, updateAsistenciaDto : UpdateAsistenciaDto) {
    try {
      const asistencia = await this.asistenciaRepository.findOne({
        where: {
          claseId
        }
    })
    if(!asistencia){
        return new HttpException('Asistencia no encontrada', HttpStatus.NOT_FOUND);
    }

    const updateAsistencia = Object.assign(asistencia, updateAsistenciaDto)
    console.log(updateAsistencia)

    return this.asistenciaRepository.save(updateAsistencia)

    } catch {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error - update : ' + Error,
        },
        HttpStatus.NOT_FOUND,
    );
    }
  }

  //Eliminar asistencia
  async remove(claseId: number) {
    try {
      const result = await this.asistenciaRepository.delete({claseId});

      if(result.affected === 0){
          return new HttpException('Asistencia no encontrada', HttpStatus.NOT_FOUND);
      }

      return 'Asistencia: ' + claseId + ' Eliminade';

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
