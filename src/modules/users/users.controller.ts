import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import uploadLocal from 'src/common/multer/local.multer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Public()
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }
  @Post()
  @UseInterceptors(FileInterceptor('avatar', uploadLocal))
  async create(
    @UploadedFile() file: any,
    @Body() createUserDto: CreateUserDto,
    @Req() req: any,
  ) {
    return await this.usersService.create(createUserDto, file, req);
  }
  @Get(`phan-trang-tim-kiem`)
  async findBySearch(@Query() query: any) {
    return await this.usersService.findBySearch(query);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
