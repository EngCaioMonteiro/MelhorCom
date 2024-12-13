import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The name of the user' }) // Documentação do campo "name"
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The email of the user', example: 'user@example.com' }) // Adiciona exemplo de valor
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The password of the user (min 6 characters)' })
  @MinLength(6)
  password: string;
}
