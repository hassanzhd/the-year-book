import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  email: string;

  @Column()
  handle: string;

  @Column()
  university: string;

  @Column()
  shortBio: string;

  @Column()
  batch: number;
}
