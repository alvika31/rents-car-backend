import  express  from "express";
import db from "./config/database.js";
import cors from 'cors';
import router from "./routes/routes.js";
import bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const app = express();
const port = 5000;




app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use(express.static('public'));



try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Docs API Of Rent Car Website",
        version: "0.1.0",
        description:
          "This API Created By Alvika Aji Prahasta",
      
      },
      servers: [
        {
          url: "http://localhost:5000/",
        },
      ],
    },
    apis: ["./routes/routes.js"],
  };

const specs = swaggerJSDoc(options)
app.use("/api-docs", 
swaggerUi.serve,
swaggerUi.setup(specs)
)

app.use(router)
app.listen(port, () => {
    console.log(`Server Berjalan pada http://localhost:${port}`)
})