import { User } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'refresh_token' })
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.refreshToken, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  user: User;

  @Column({ name: 'code', type: 'text', nullable: true })
  code: string;

  @Column({ name: 'expired_at', type: 'datetime', nullable: true })
  expiredAt: Date;
}
