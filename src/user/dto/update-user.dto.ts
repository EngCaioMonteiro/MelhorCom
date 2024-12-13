import { IsEmail, IsOptional, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'The updated name of the user' }) // Campo opcional
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'The updated email of the user', example: 'updated@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'The updated password of the user (min 6 characters)' })
  @IsOptional()
  @MinLength(6)
  password?: string;
}
