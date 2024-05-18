import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tickets {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column()
  origin_airport: string;

  @Column()
  destination_airport: string;

  @Column()
  price: number;

  @Column()
  airline: string;

  @Column()
  flight_number: string;

  @Column()
  departure_at: string;

  @Column({ nullable: true })
  return_at?: string;

  @Column()
  transfers: number;

  @Column({ nullable: true })
  return_transfers?: number;

  @Column()
  duration: number;

  @Column()
  duration_to: number;

  @Column({ nullable: true })
  duration_back?: number;

  @Column()
  link: string;

  constructor(partial: Partial<Tickets>) {
    Object.assign(this, partial);
  }
}
