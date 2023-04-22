const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Nodejs api project for mongoDB",
            version: '1.0.0'
        },

        servers: [
            {
                url: 'https://nodejs-mongodb.herokuapp.com'
            }
        ],
        paths: {
            "/v1/author?name={Name}": {
                get: {
                    tags: ["Todo CRUD operations"], // operation's tag
                    description: "Search todo with name", // short desc
                    operationId: "search Todo", // unique operation id
                    parameters: [
                        // expected params
                        {
                            name: "Name", // name of param
                            in: "path", // location of param
                            schema: {
                                $ref: "#/components/schemas/name", // id model
                            },
                            required: true, // mandatory
                            description: "search name of author", // short desc.
                        },
                    ],
                    // expected responses
                    responses: {
                        // response code
                        200: {
                            description: "Todo updated successfully", // response desc.
                        },
                        // response code
                        404: {
                            description: "Todo not found", // response desc.
                        },
                        // response code
                        500: {
                            description: "Server error", // response desc.
                        },
                    },
                }
            },
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
                post: {
                    tags: ["Todo CRUD operations"], // operation's tag
                    description: "Create todo", // short desc
                    operationId: "createTodo", // unique operation id
                    parameters: [], // expected params
                    requestBody: {
                        // expected request body
                        content: {
                            // content-type
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/TodoInput", // todo input data model
                                },
                            },
                        },
                    },
                    // expected responses
                    responses: {
                        // response code
                        201: {
                            description: "Todo created successfully", // response desc
                        },
                        // response code
                        500: {
                            description: "Server error", // response desc
                        },
                    },
                },

            },
            "/v1/author/{id}": {
                put: {
                    tags: ["Todo CRUD operations"], // operation's tag
                    description: "Update todo", // short desc
                    operationId: "updateTodo", // unique operation id
                    parameters: [
                        // expected params
                        {
                            name: "id", // name of param
                            in: "path", // location of param
                            schema: {
                                $ref: "#/components/schemas/id", // id model
                            },
                            required: true, // mandatory
                            description: "Id of todo to be updated", // short desc.
                        },
                    ],
                    requestBody: {
                        // expected request body
                        content: {
                            // content-type
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/TodoInput", // todo input data model
                                },
                            },
                        },
                    },
                    // expected responses
                    responses: {
                        // response code
                        200: {
                            description: "Todo updated successfully", // response desc.
                        },
                        // response code
                        404: {
                            description: "Todo not found", // response desc.
                        },
                        // response code
                        500: {
                            description: "Server error", // response desc.
                        },
                    },
                },
                delete: {
                    tags: ["Todo CRUD operations"], // operation's tag
                    description: "Deleting a todo", // short desc
                    operationId: "deleteTodo", // unique operation id
                    parameters: [
                        // expected parameters
                        {
                            name: "id", // name of param
                            in: "path", // location of param
                            schema: {
                                $ref: "#/components/schemas/id", // id model
                            },
                            required: true, // mandatory
                            description: "Deleting a done todo", // param desc
                        },
                    ],
                    // expected responses
                    responses: {
                        // response code
                        200: {
                            description: "Todo deleted successfully", // response desc
                        },
                        // response code
                        404: {
                            description: "Todo not found", // response desc
                        },
                        // response code
                        500: {
                            description: "Server error", // response desc
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
                // Todo input model
                TodoInput: {
                    type: "object", // data type
                    properties: {
                        name: {
                            type: "string", // data type
                            description: "Name of author", // desc
                            example: "Huynh Dang Nghia", // example of a title
                        },
                        year: {
                            type: "string", // data type
                            description: "Birthday of author", // desc
                            example: "1990", // example of a completed value
                        },
                    },
                },
                id: {
                    type: "string", // data type
                    description: "ID of author", // desc
                    example: "64116ac8bc5d2704cc8f1ca8", // example of a title
                },
                name: {
                    type: "string",
                    description: "name of author",
                    example: "Nghia"
                }
            },
        },


    },
    apis: ['./swagger.js']
}
const swaggerSpec = swaggerJSDoc(options)
module.exports = swaggerSpec 