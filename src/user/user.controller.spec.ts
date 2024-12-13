import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

const mockUserService = {
  findAll: jest.fn().mockResolvedValue([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
  ]),
  create: jest.fn().mockResolvedValue({ id: 1, name: 'John Doe', email: 'john@example.com' }),
  update: jest.fn().mockResolvedValue({ id: 1, name: 'John Doe', email: 'john@example.com' }),
  remove: jest.fn().mockResolvedValue({ id: 1, name: 'John Doe', email: 'john@example.com' }),
};

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should return a list of users', async () => {
    const result = await userController.findAll();
    expect(result).toEqual([
      { id: 1, name: 'John Doe', email: 'john@example.com' },
    ]);
  });

  it('should create a new user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    };
    const result = await userController.create(createUserDto);
    expect(result).toEqual({ id: 1, name: 'John Doe', email: 'john@example.com' });
  });

  it('should update an existing user', async () => {
    const updateUserDto: UpdateUserDto = {
      name: 'Jane Doe',
      email: 'jane@example.com',
    };
    const result = await userController.update('1', updateUserDto);
    expect(result).toEqual({ id: 1, name: 'John Doe', email: 'john@example.com' });
  });

  it('should delete a user', async () => {
    const result = await userController.remove('1');
    expect(result).toEqual({ id: 1, name: 'John Doe', email: 'john@example.com' });
  });

  it('should throw NotFoundException when user is not found', async () => {
    mockUserService.update.mockRejectedValueOnce(new NotFoundException('User not found'));
    
    try {
      await userController.update('999', { name: 'Nonexistent User', email: 'nonexistent@example.com' });
    } catch (error) {
      expect(error.response.message).toBe('User not found');
    }
  });

  it('should throw BadRequestException for invalid input', async () => {
    try {
      await userController.create({} as CreateUserDto);
    } catch (error) {
      expect(error instanceof BadRequestException).toBe(true);
    }
  });
});
