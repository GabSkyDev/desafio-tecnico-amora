import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "../models/Users";
import { PropertyList } from "../models/PropertyList";
import { Properties } from "../models/Properties";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "api-imoveis-db",
    synchronize: true,
    logging: false,
    entities: [Users, PropertyList, Properties]
})