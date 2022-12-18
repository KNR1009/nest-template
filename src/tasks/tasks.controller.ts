import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<void> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.getTasks();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTask(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.updateTask(Number(id), dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tasksService.deleteTask(Number(id));
  }
}
