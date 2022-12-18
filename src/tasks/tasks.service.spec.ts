import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaClient } from '@prisma/client';

describe('TaskService', () => {
  let taskService: TasksService;

  //テストを実行する前にテストで使用するデータを投入します。
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, PrismaClient],
    }).compile();

    taskService = module.get<TasksService>(TasksService);

    console.log('💫 seed executing ...');

    await taskService.prisma.task.create({
      data: {
        id: 1,
        name: 'タスク1',
      },
    });

    console.log('💫 seed finished.');
  });
  it('getTask', async () => {
    //任意の値でテストを通したいプロパティにexpect.anyを使っています。
    const expectedResult = {
      id: 1,
      name: 'タスク1',
      isCompleted: false,
    };

    const actualResult = await taskService.getTask(1);
    expect(expectedResult).toEqual(actualResult);
  });

  // //テスト実行後、投入したデータを削除します。
  afterAll(async () => {
    await taskService.prisma.task.deleteMany();
    await taskService.prisma.$disconnect();
  });
});
