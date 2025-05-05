import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    const users = await this.prisma.comments.findMany();
    return users;
  }

  async create(createCommentDto: CreateCommentDto) {
    try {
      let { user_id, room_id, content, saoBinhLuan } = createCommentDto;
      content = content || '';
      const commentNew = await this.prisma.comments.create({
        data: {
          user_id,
          room_id,
          content,
          saoBinhLuan,
        },
      });

      return commentNew;
    } catch (error) {
      if (error.code === 'P2003') {
        throw new NotFoundException('room_id hoặc user_id không có');
      }
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    try {
      const { content, saoBinhLuan } = updateCommentDto;
      console.log(updateCommentDto);
      const updateComment = await this.prisma.comments.update({
        where: { comment_id: id },
        data: {
          content,
          saoBinhLuan,
        },
      });
      return updateComment;
    } catch (error) {
      if (error.code === 'P2025')
        throw new NotFoundException('Không tìm thấy comment');
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.comments.delete({
        where: { comment_id: id },
      });
      return 'Xóa comment thành công';
    } catch (error) {
      console.log(error);
      if (error.code === 'P2025')
        throw new NotFoundException('Không tìm thấy comment để xóa');
    }
  }

  async findOne(id: number) {
    const comment = await this.prisma.comments.findMany({
      where: { room_id: id },
    });

    return comment;
  }
}
