import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Users } from "./Users";
import { Properties } from "./Properties";

@Entity()
export class PropertyList {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @ManyToOne(() => Users, (user) => user.propertyLists)
    user!: Users;

    @OneToMany(() => Properties, (property) => property.propertyList)
    properties!: Properties[];
}