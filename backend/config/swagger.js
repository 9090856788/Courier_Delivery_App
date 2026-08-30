import swaggerJSDoc from "swagger-jsdoc";

/* -------------------------------------------------------------------------- */
/*                          Swagger Definition                                */
/* -------------------------------------------------------------------------- */

const swaggerDefinition = {
  openapi: "3.0.0",

  info: {
    title: "Courier Service Delivery Application API",
    version: "1.0.0",
    description:
      "API documentation for the Courier Service Delivery Application.",
  },

  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3000}`,
      description: "Development server",
    },
  ],

  /* ------------------------------------------------------------------------ */
  /*                          Authentication                                  */
  /* ------------------------------------------------------------------------ */

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description:
          "Enter your JWT token. Example: Bearer eyJhbGciOiJIUzI1NiIs...",
      },
    },
  },

  /* ------------------------------------------------------------------------ */
  /*                         Global Security                                  */
  /* ------------------------------------------------------------------------ */

  security: [
    {
      bearerAuth: [],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*                              Swagger Options                               */
/* -------------------------------------------------------------------------- */

const options = {
  swaggerDefinition,

  apis: ["./routes/*.js"],
};

/* -------------------------------------------------------------------------- */
/*                              Swagger Spec                                  */
/* -------------------------------------------------------------------------- */

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
