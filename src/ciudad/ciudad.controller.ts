import { Body, Controller, Delete, Get, Param, Post, Patch, ParseIntPipe } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';

//Rutas
@Controller('ciudad')
export class CiudadController {

    constructor(private readonly ciudadService: CiudadService){}

    @Post()
    create(@Body() createCiudadDto: CreateCiudadDto) {
      return this.ciudadService.create(createCiudadDto);
    }
  
    @Get()
    findAll() {
      return this.ciudadService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.ciudadService.findOne(+id);
    }
  
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() ciudad: UpdateCiudadDto){
        return this.ciudadService.update(id,ciudad);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number){
        return this.ciudadService.remove(id);
    }
}
