# xSOR Plugin Example
A simple xSOR plugin example.

Be sure to create tests for your plugin!

## Getting Started
You first must get access to the `xSORDevEnvironment` plugin development environment. Once the Docker containers are running. You can follow the example here.

Create a new project somewhere else in your filesystem and initialize a typical NodeJS/TypeScript project. You can do this by running:
```console
npm init
tsc --init
```

Once the project has been initialized, install the necessary modules to create a plugin:
```console
npm install @fernhillcorp/exchange-connector
npm install @fernhillcorp/xsor
```

The plugin you're creating ASSUMES that the exchanges have started, and that any users that have connected to the system have been successfully authenticated using their provided JWT tokens.

Once setup, look at `./src/ExamplePlugin.ts` on how to create a plugin. 

## Testing
To test, you must have built your project successfully in TypeScript. Edit your `docker-compose.yaml` in your `xSORDevEnvironment` repo, and add a new mount to your plugin's `build/` path that leads to the xsor or exchange-connector service. Example
```
version: "3.8"
services:
  xsor:
    image: ${XSOR_IMAGE}:${XSOR_IMAGE_VERSION}
    networks:
      - xsor-network
    healthcheck:
      test: ["CMD", "/app/docker/xsor/app/healthcheck.sh", "http://127.0.0.1:5000"]
      retries: 10
      timeout: 10s
    volumes:
      - "./config.yaml:/app/config.yaml"
      - "/home/cowboy/xSORPluginExample/:/app/plugins/xSORPluginExample/"
    ports:
      - "${XSOR_HTTP_PORT}:5000"
    environment:
      SERVER_TYPE: api
      LOG_LEVEL: all
...
```

Be sure that the `config.yaml` line remains. Once added, stop and start your containers and you should see your plugin running!