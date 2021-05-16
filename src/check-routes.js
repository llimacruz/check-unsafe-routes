const getMethod = (route) => {
  let method;
  Object.keys(route.methods).forEach((key) => {
    if (key === 'get') method = key;
    if (key === 'post') method = key;
    if (key === 'patch') method = key;
    if (key === 'put') method = key;
    if (key === 'delete') method = key;
  });
  return method;
};

const checkRoutes = (params) => {
  if (!params.app) throw new Error('Express server must be present on app parameter');
  const allowedUnsafe = params.allowedUnsafe || [];

  const routes = [];
  const router = params.app._router.stack.find((element) => element.name === 'router');
  if (router) {
    router.handle.stack.forEach((element) => {
      const route = {
        path: element.route.path,
        method: getMethod(element.route),
        hasAuth: !!element.route.stack.find((stackRouteItem) => stackRouteItem.name === 'authenticate'),
        allowedUnsafe: allowedUnsafe.includes(element.route.path)
      };
      routes.push(route);
    });
  } else {
    const rootRouter = params.app._router.stack.filter((element) => element.name === 'bound dispatch');
    rootRouter.forEach((element) => {
        const route = {
          path: element.route.path,
          method: getMethod(element.route),
          hasAuth: !!element.route.stack.find((stackRouteItem) => stackRouteItem.name === 'authenticate'),
          allowedUnsafe: allowedUnsafe.includes(element.route.path)
        };
        routes.push(route);
      });
  }

  return {
    unsafeCounter: routes.filter((route) => !route.hasAuth && !route.allowedUnsafe).length || 0,
    allowedUnsafeCounter: routes.filter((route) => !route.hasAuth && route.allowedUnsafe).length || 0,
    unsafeRoutes: routes.filter((route) => !route.hasAuth && !route.allowedUnsafe).map((route) => route.path),
    allRoutes: routes
  };
};

module.exports = checkRoutes;
