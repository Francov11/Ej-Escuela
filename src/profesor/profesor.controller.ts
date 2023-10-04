import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post('agregarDomicilio')
  async addDomicilio(@Body() body: any):Promise<any> {
    return this.profesorService.createDomicilio(body);
  }

  @Post('crearProfesor')
  create(@Body() createProfesorDto: CreateProfesorDto) {
    return this.profesorService.create(createProfesorDto);
  }

  @Get('getAllProfesores')
  findAll() {
    return this.profesorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profesorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() profesor: UpdateProfesorDto){
      return this.profesorService.update(id,profesor);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number){
      return this.profesorService.remove(id);
  }
}
