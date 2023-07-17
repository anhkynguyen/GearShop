import { text } from "express";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Gear {
  @PrimaryGeneratedColumn()
  gearId: number;
  @Column()
  gearName: string;
  @Column({ type: "text" })
  description: string;
  @Column()
  price: number;
  @Column()
  categoryId: number;
  @Column({ type: "text" })
  image: string;
  @Column()
  userId: number;
}
