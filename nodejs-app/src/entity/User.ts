import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50 })
  firstName!: string;

  @Column({ type: 'varchar', length: 50 })
  lastName!: string;

  @Column({ type: 'varchar', length: 110, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 80 })
  password!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  token?: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  tokenCreatedAt?: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)', nullable: true })
  updatedAt?: Date;
}
