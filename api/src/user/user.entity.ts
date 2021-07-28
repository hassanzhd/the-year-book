import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  email: string;

  @Column('varchar', { length: 72 })
  password: string;

  @Column()
  handle: string;

  @Column()
  fullName: string;

  @Column()
  university: string;

  @Column('varchar', { length: 160 })
  shortBio: string;

  @Column()
  batch: number;

  @Column('text')
  imageLink: string;

  @Column('boolean', { default: false })
  verified: boolean;

  @Column('varchar', { length: '60' })
  verificationHash: string;
}
