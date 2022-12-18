import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}
  async getTasks(): Promise<Task[]> {
    return await this.prisma.task.findMany();
  }

  async getTask(id: number): Promise<Task> {
    return await this.prisma.task.findFirst({
      where: {
        id: id,
      },
    });
  }
  async createTask(dto: CreateTaskDto) {
    await this.prisma.task.create({
      data: {
        ...dto,
      },
    });
  }

  async updateTask(id: number, dto: UpdateTaskDto) {
    await this.prisma.task.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteTask(id: number) {
    await this.prisma.task.delete({
      where: {
        id: id,
      },
    });
  }
}
