const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const autherRoute = require("./routes/author");
const bookRoute = require("./routes/book");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");

dotenv.config()
//CONNECT Database
mongoose.set("strictQuery", false);
myDbConnection()
async function myDbConnection() {
    try {
        await mongoose.connect(process.env.mongoDB_URL, { useNewUrlParser: true });
        console.log('Connected Successfully')
        // mongoose.connection.useDb('authors');
    } catch (error) {
        console.log('Error connecting to DB ::', error);
    }
}

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Nodejs api project for mongoDB",
            version: '1.0.0'
        },

        servers: [
            {
                url: 'http://localhost:8000'
            }
        ],
        tags: [
            {
                name: "Todo CRUD operations", // name of a tag
                description: "Operations for managing Todos" // description of the tag
            }
        ],
        paths: {
            "/v1/author": {
                get: {
                    tags: ["Todo CRUD operations"], // operation's tag.
                    description: "Get todos", // operation's desc.
                    operationId: "getTodos", // unique operation id.
                    parameters: [], // expected params.
                    // expected responses
                    responses: {
                        // response code
                        200: {
                            description: "Todos were obtained", // response desc.
                            content: {
                                // content-type
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Todo", // Todo model
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        components: {
            schemas: {
                Todo: {
                    type: "object", // data type
                    properties: {
                        id: {
                            type: "string", // data-type
                            description: "Todo identification number", // desc
                            example: "ytyVgh", // example of an id
                        },
                        title: {
                            type: "string", // data-type
                            description: "Todo's title", // desc
                            example: "Coding in JavaScript", // example of a title
                        },
                        completed: {
                            type: "boolean", // data type
                            description: "The status of the todo", // desc
                            example: false, // example of a completed value
                        },
                    },
                },
            },
        },

    },
    apis: ['./index.js']
}

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get("/api", (req, res) => {
    res.status(200).json("hello");
})

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

//routers
app.use("/v1/author", autherRoute);

app.use("/v1/book", bookRoute);

app.listen(8000, () => {
    console.log("Server is running...");
})
