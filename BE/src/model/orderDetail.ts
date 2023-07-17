import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  orderDetailId: number;
  @Column()
  gearId: number;
  @Column()
  orderId: number;
  @Column()
  startTime: string;
  @Column()
  endTime: string;
  @Column()
  total: number;
}
