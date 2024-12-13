import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockUserRepository = {
  find: jest.fn().mockResolvedValue([
    { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password' },
  ]),
  save: jest.fn().mockResolvedValue({ id: 1, name: 'John Doe', email: 'john@example.com', password: 'password' }),
  findOne: jest.fn().mockResolvedValue({ id: 1, name: 'John Doe', email: 'john@example.com', password: 'password' }),
  remove: jest.fn().mockResolvedValue({ id: 1, name: 'John Doe', email: 'john@example.com', password: 'password' }),
  create: jest.fn().mockImplementation((user: User) => {
    return { ...user, id: 1 };
  }),
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should return a list of users', async () => {
    const result = await userService.findAll();
    expect(result).toEqual([
      { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password' },
    ]);
  });

  it('should create a new user', async () => {
    const user = { name: 'John Doe', email: 'john@example.com', password: 'password' };
    const result = await userService.create(user as User);
    expect(result).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    });
  });

  it('should update an existing user', async () => {
    const updatedUser = { name: 'Updated Name' };
    mockUserRepository.save.mockResolvedValue({
      ...updatedUser,
      id: 1,
      email: 'john@example.com',
      password: 'password',
    });
    const result = await userService.update(1, updatedUser);
    expect(result).toEqual({ id: 1, name: 'Updated Name', email: 'john@example.com', password: 'password' });
  });

  it('should throw an error if user not found for update', async () => {
    mockUserRepository.findOne.mockResolvedValue(null);
    await expect(userService.update(2, { name: 'Updated Name' })).rejects.toThrowError('User not found');
  });

  it('should remove a user', async () => {
    mockUserRepository.findOne.mockResolvedValue({ id: 1, name: 'John Doe', email: 'john@example.com', password: 'password' });
    const result = await userService.remove(1);
    expect(result).toEqual({ id: 1, name: 'John Doe', email: 'john@example.com', password: 'password' });
  });

  it('should throw an error if user not found for removal', async () => {
    mockUserRepository.findOne.mockResolvedValue(null);
    await expect(userService.remove(2)).rejects.toThrowError('User not found');
  });
});
