import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum Role {
    LEAD = 'lead',
    CORRETOR = 'corretor'
}

@Entity()
export class Users {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.LEAD
    })
    role!: Role;
}