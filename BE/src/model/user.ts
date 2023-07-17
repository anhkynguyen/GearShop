import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column({
    default: "https://cdn-icons-png.flaticon.com/512/666/666201.png",
  })
  avatar: string;
  @Column()
  phone: string;
  @Column({ default: "user" })
  role: string;
}
