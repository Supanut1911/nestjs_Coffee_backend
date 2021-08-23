import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Coffee extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        default: ''
    })
    name: string

    @Column({
        default: 0
    })
    cost: number
}