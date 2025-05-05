import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
@ApiBearerAuth()
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }
  @Get('phan-trang-tim-kiem')
  @ApiQuery({
    description: 'search email or phone',
    name: 'search',
    type: 'string',
    required: false,
  })
  @ApiQuery({
    name: 'pageIndex',
    type: 'integer',
    format: 'int32',
    required: false,
  })
  @ApiQuery({
    name: 'pageSize',
    type: 'integer',
    format: 'int32',
    required: false,
  })
  async getByUserID(@Query() query: any) {
    return this.bookingService.getByUserID(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
