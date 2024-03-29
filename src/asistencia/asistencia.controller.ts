import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';

//Rutas
@Controller('asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  @Post()
  async create(@Body() createAsistenciaDto: CreateAsistenciaDto):Promise<any> {
    return await this.asistenciaService.create(createAsistenciaDto);
  }

  @Get()
  findAll() {
    return this.asistenciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asistenciaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() asistencia: UpdateAsistenciaDto){
      return this.asistenciaService.update(id,asistencia);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number){
      return this.asistenciaService.remove(id);
  }
}
