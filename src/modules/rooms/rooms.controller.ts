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
  Req,
  Query,
  Put,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ResponseSuccess } from 'src/common/decorators/response-success.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
@ApiBearerAuth()
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}
  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Post()
  create(@Body() createRoomDto: CreateRoomDto, @Req() req: any) {
    return this.roomsService.create(createRoomDto, req);
  }
  @Get('lay-phong-theo-vi-tri')
  async findByLocation(@Query('maViTri') maViTri: number) {
    return await this.roomsService.findByLocation(maViTri);
  }

  @Get('phan-trang-tim-kiem')
  @ApiQuery({ name: 'pageIndex', type: 'integer', required: false })
  @ApiQuery({ name: 'pageSize', type: 'integer', required: false })
  @ApiQuery({ name: 'keyword', type: 'string', required: false })
  @Get(':id')
  async findBySearch(@Query() query: any) {
    return await this.roomsService.findBySearch(query);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.roomsService.remove(+id);
  }
  @Post('upload-hinh-phong')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        room: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('room'))
  async uploadFileImage(
    @Query('maPhong') maPhong: string,
    @UploadedFile() file: any,
  ) {
    return await this.roomsService.uploadImage(file, +maPhong);
  }
}
