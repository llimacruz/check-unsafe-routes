const express = require('express');

const configApp = (unsafeRoutes, useRouter = true) => {
  let app = express();
  setRouter(app, useRouter, unsafeRoutes);

  return app;
}

const setRouter = (app, useRouter, unsafeRoutes) => {
  if (useRouter) {
    const router = express.Router();
    addRoutes(unsafeRoutes, router)
    app.use('/', router);
  } else {
    addRoutes(unsafeRoutes, app);
  }
}

const addRoutes = (unsafeRoutes, routerEntity) => {
  routerEntity.get("/getTests",
    applySafety(unsafeRoutes, '/getTests'),
    async (req, res) => res.sendStatus(200));

  routerEntity.get("/getTests/:id",
    applySafety(unsafeRoutes, '/getTests/:id'),
    async (req, res) => res.sendStatus(products));

  routerEntity.post("/postTests",
    applySafety(unsafeRoutes, '/postTests'),
    async (req, res) => res.sendStatus(201));

  routerEntity.put("/putTests",
    applySafety(unsafeRoutes, '/putTests'),
    async (req, res) => res.sendStatus(200));

  routerEntity.patch("/patchTests",
    applySafety(unsafeRoutes, '/patchTests'),
    async (req, res) => res.sendStatus(201));

  routerEntity.delete("/deleteTests/:id",
    applySafety(unsafeRoutes, '/deleteTests/:id'),
    (req, res) => res.sendStatus(200));

  routerEntity.get("/healthStatus",
    applySafety(unsafeRoutes, '/healthStatus'),
    async (req, res) => res.sendStatus(200));
};

const applySafety = (unsafeRoutes, route) => {
  const routes = unsafeRoutes || [];
  if (routes.includes(route)) {
    return unsafe = () => true;
  }
  return authenticate = () => true;
}

module.exports = {
  configApp
};
