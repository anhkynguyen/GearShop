import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;
  @Column()
  userId: number;
  @Column()
  gearId: number;
  @Column({ default: "Check" })
  statusOrder: string;
}
