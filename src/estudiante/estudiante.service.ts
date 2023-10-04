import { Injectable , HttpException, HttpStatus} from '@nestjs/common';
import { EstudianteDto } from './dto/create-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';
import { Clase } from 'src/clases/entities/clase.entity';
import { EstudianteClase } from './entities/estudiante_clase.entity';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';



@Injectable()
export class EstudianteService {

  constructor(@InjectRepository(Estudiante)
              private estudianteRepository:Repository<Estudiante>,
              @InjectRepository(Clase)
              private claseRepository:Repository<Clase>,
              @InjectRepository(EstudianteClase)
              private estudianteClaseRepository:Repository<EstudianteClase>)
  {}


  async create(estudianteDto: EstudianteDto) {
    //const fecha = new Date();
    const estudiante : Estudiante = await this.estudianteRepository.save(new Estudiante(estudianteDto.nombre,estudianteDto.apellido,estudianteDto.fecha_nacimiento))
    if(estudiante)
      return `se creo estudiante ${estudiante.nombre}`;
    else
      return 'no se creo estudiante';
  }

  async addClase(body):Promise<any>{
    const {claseId,estudianteId} = body;
    const estudiante = await this.estudianteRepository.findOne({where:{id:estudianteId}})
    if(!estudiante)
      return `error - no se encontre el estudiante con id ${estudianteId}`;
    const clase = await this.claseRepository.findOne({where:{id:claseId}})
    if(!clase)
      return 'error - no se encontro esa clase';
    const clase_estudiante = await this.estudianteClaseRepository.findOne({where:{claseId:claseId,estudianteId:estudianteId}})
    if(clase_estudiante)
      return 'error - el estudiante ya tiene asignada esa clase';
    return await this.estudianteClaseRepository.save(new EstudianteClase(estudianteId,claseId));
  }


  findAll() {
    try {
      return this.estudianteRepository.find()
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
      const estudiante = await this.estudianteRepository.findOne({
        where: {
            id
        }
    });
    if(!estudiante){
        return new HttpException('Estudiante not found', HttpStatus.NOT_FOUND);
    }

    return estudiante;

    } catch {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error - findOne : ' + Error,
        },
        HttpStatus.NOT_FOUND,
    );
    }
  }

  async update(id: number, UpdateEstudianteDto: UpdateEstudianteDto) {
    try {
      const estudiante = await this.estudianteRepository.findOne({
        where: {
            id
        }
    })
    if(!estudiante){
        return new HttpException('Profesor not found', HttpStatus.NOT_FOUND);
    }
    console.log(estudiante)
    const updateEstudiante = Object.assign(estudiante, UpdateEstudianteDto)
    console.log(updateEstudiante)
    return this.estudianteRepository.save(updateEstudiante)

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
      const result = await this.estudianteRepository.delete({id});

      if(result.affected === 0){
          return new HttpException('Estudiante not found', HttpStatus.NOT_FOUND);
      }

      return 'Estudiante: ' + id + ' Eliminado';

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
