import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  Put,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
@ApiBearerAuth()
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  async findAll() {
    return await this.locationsService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('location'))
  async create(@Body() createLocationDto: CreateLocationDto) {
    return await this.locationsService.create(createLocationDto);
  }

  @Get(`phan-trang-tim-kiem`)
  @ApiQuery({ name: 'page', type: 'integer', required: false })
  @ApiQuery({ name: 'pageSize', type: 'integer', required: false })
  @ApiQuery({ name: 'search', type: 'string', required: false })
  async getBySearch(@Query() query: any) {
    return await this.locationsService.findBySearch(query);
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.locationsService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return await this.locationsService.update(+id, updateLocationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.locationsService.remove(+id);
  }
  @Post('upload-hinh-vi-tri')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('location'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadImage(
    @Query('maViTri') maViTri: string,
    @UploadedFile() file: any,
  ) {
    return await this.locationsService.uploadImg(+maViTri, file);
  }
}
