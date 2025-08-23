
import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./repository/data-source";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Banco conectado!");
        app.use("/api", userRoutes);
        app.listen(3000, () => console.log("Server running on http://localhost:3000"));
    })
    .catch((error) => console.error("Erro ao conectar com o banco de dados", error));