const Hapi = require("@hapi/hapi");
const routes = require("./routes");

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
    routes: {
      cors: {
        origin: ['*'], // Allow all origins
        //headers: ['Accept', 'Content-Type'], // Specify which headers can be accepted
        // exposedHeaders: ['Accept', 'Content-Type'], // Specify which headers are exposed
        // additionalExposedHeaders: ['X-Custom-Header'], // Any additional headers you want to expose
        // maxAge: 60,
        // credentials: true // If you need to include credentials like cookies in CORS requests
      }
    }
  });

  server.route(routes);

  await server.start();
  console.log(`Server Running on ${server.info.uri}`);
};

init();