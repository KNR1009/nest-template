import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { TasksService } from './tasks.service';

describe('UserService', () => {
  let taskService: TasksService;

  //テストを実行する前にテストで使用するデータを投入します。
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, PrismaService],
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
  it('findOneWithPost', async () => {
    //任意の値でテストを通したいプロパティにexpect.anyを使っています。
    const expectedResult = {
      id: 1,
      name: 'タスク1',
      isCompleted: false,
    };

    const actualResult = await taskService.prisma.task.findFirst({
      where: {
        id: expectedResult.id,
      },
    });

    expect(expectedResult).toEqual(actualResult);
  });

  //テスト実行後、投入したデータを削除します。
  afterAll(async () => {
    await taskService.prisma.task.deleteMany();
    await taskService.prisma.$disconnect();
  });
});
