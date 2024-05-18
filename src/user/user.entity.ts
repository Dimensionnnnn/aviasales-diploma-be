import { Exclude } from 'class-transformer';
import { Tickets } from 'src/tickets/tickets.entity';
import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Users {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  constructor(partial: Partial<Users>) {
    Object.assign(this, partial);
  }
}

export default Users;
