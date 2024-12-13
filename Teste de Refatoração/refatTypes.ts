import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectPool, PgConnectionPool } from 'nestjs-pg';

@Injectable()
export class UserService {
  constructor(
    @InjectPool() private readonly pool: PgConnectionPool,
  ) {}

  async getUser(id: string): Promise<any> {
    try {
      const result = await this.pool.query('SELECT * FROM users WHERE id = $1', [id]);

      if (result.rows.length === 0) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
      }

      return result.rows[0];
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao buscar o usuário.');
    }
  }
}
