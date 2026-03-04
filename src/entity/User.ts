import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TMESTAMP" })
  createdAt!: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TMESTAMP",
    onUpdated: "CURRENT_TMESTAMP",
  })
  updatedAt!: Date;
}
