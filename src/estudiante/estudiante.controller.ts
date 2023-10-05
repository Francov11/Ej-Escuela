import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteDto,  } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

//Rutas
@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post('agregarClase')
  async addClase(@Body() body:any):Promise<any>{
    return await this.estudianteService.addClase(body);
  }

  @Post('agregarEstudiante')
  async create(@Body() estudianteDto: EstudianteDto) {
    return await this.estudianteService.create(estudianteDto);
  }

  @Get()
  findAll() {
    return this.estudianteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudianteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() estudiante: UpdateEstudianteDto){
      return this.estudianteService.update(id,estudiante);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number){
      return this.estudianteService.remove(id);
  }
}
