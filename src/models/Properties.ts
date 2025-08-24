import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { PropertyList } from "./PropertyList";

@Entity()
export class Properties {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    title!: string;

    @Column("decimal")
    price!: number;

    @Column()
    adress!: string;

    @Column()
    url!: string;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt!: Date;

    @Column()
    comments!: string;

    @ManyToOne(() => PropertyList, (propertyList) => propertyList.properties)
    propertyList!: PropertyList;
}