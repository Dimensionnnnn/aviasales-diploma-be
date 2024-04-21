import { Exclude } from 'class-transformer';
import { UUID } from 'crypto';
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Users {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  constructor(partial: Partial<Users>) {
    Object.assign(this, partial);
  }
}

export default Users;
