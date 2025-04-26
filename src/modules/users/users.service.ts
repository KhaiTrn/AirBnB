import { Injectable, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseSuccess } from 'src/common/decorators/response-success.decorator';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    const users = await this.prisma.users.findMany();
    return users;
  }
  findOne(id: number) {
    const user = this.prisma.users.findUnique({ where: { user_id: id } });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async findBySearch(query: any) {
    let { page, pageSize, search } = query;
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 10;
    search = search || '';
    const where = search.trim() !== '' ? { contains: search } : {};
    const totalItem = await this.prisma.users.count({
      where: { email: where },
    });
    const totalPage = Math.ceil(totalItem / pageSize);
    const skip = (page - 1) * pageSize;
    const users = await this.prisma.users.findMany({
      take: pageSize,
      skip: skip,
      where: { email: where },
    });
    return {
      page,
      pageSize,
      totalPage,
      totalItem,
      users: users || [],
    };
  }
}
