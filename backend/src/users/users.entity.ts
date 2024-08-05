import { Role } from 'src/helpers/role/role.enum';
import { RefreshToken } from 'src/refresh-token/refresh-token.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'firstName', nullable: false })
  firstName: string;

  @Column({ name: 'lastName', nullable: false })
  lastName: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @OneToMany(() => RefreshToken, (token) => token.user)
  refreshToken: RefreshToken[];

  @Column({ name: 'password', length: 255 })
  password: string;

  @Column({ name: 'roles', type: 'json', nullable: true })
  roles: Role[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
