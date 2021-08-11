const express = require("express");
const swaggerUi = require(`swagger-ui-express`);

const routes = require("./routes");

const app = express();
const swaggerDoc = require(`./swagger.json`);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(`/api-docs`,swaggerUi.serve,swaggerUi.setup(swaggerDoc));

app.use(routes);

const port = 3000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
