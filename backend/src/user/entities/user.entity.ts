import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: String })
  @Column()
  firstName: string;

  @ApiProperty({ type: String })
  @Column()
  lastName: string;

  @ApiProperty({ type: String })
  @Column()
  position: string;

  @ApiProperty({ type: String })
  @Column()
  phone: string;

  @ApiProperty({ type: String })
  @Column()
  email: string;
}
