const { assert } = require('chai');
const appUtils = require('./express-utils');
const checkRoutes = require('./../src/check-routes');

describe('Testes usando router do express:', () => {
  it('Todas as rotas possuem autenticação', async () => {
    let app = appUtils.configApp();

    const routes = checkRoutes({ app });

    app = null;
    assert.deepEqual(routes.unsafeRoutes, [], 'Unsafe routes list');
    assert.strictEqual(routes.allowedUnsafeCounter, 0, 'Allowed unsafe routes counter assert');
    assert.strictEqual(routes.unsafeCounter, 0, 'Unsafe routes counter assert');
  });

  it('Todas as rotas possuem autenticação, exceto as permitidas', async () => {
    const allowedUnsafe = ['/healthStatus'];
    let app = appUtils.configApp(['/healthStatus']);

    const routes = checkRoutes({ app, allowedUnsafe });

    app = null;
    assert.deepEqual(routes.unsafeRoutes, [], 'Unsafe routes list');
    assert.strictEqual(routes.allowedUnsafeCounter, 1, 'Allowed unsafe routes counter assert');
    assert.strictEqual(routes.unsafeCounter, 0, 'Unsafe routes counter assert');
  });


  it('Todas as rotas possuem autenticação, exceto /postTests', async () => {
    let app = appUtils.configApp(['/postTests']);

    const routes = checkRoutes({ app });

    app = null;
    assert.deepEqual(routes.unsafeRoutes, ['/postTests'], 'Unsafe routes list');
    assert.strictEqual(routes.allowedUnsafeCounter, 0, 'Allowed unsafe routes counter assert');
    assert.strictEqual(routes.unsafeCounter, 1, 'Unsafe routes counter assert');
  });


  it('Todas as rotas possuem autenticação, exceto /postTests e permitida', async () => {
    const allowedUnsafe = ['/healthStatus'];
    let app = appUtils.configApp(['/postTests', '/healthStatus']);

    const routes = checkRoutes({ app, allowedUnsafe });

    app = null;
    assert.deepEqual(routes.unsafeRoutes, ['/postTests'], 'Unsafe routes list');
    assert.strictEqual(routes.allowedUnsafeCounter, 1, 'Allowed unsafe routes counter assert');
    assert.strictEqual(routes.unsafeCounter, 1, 'Unsafe routes counter assert');
  });

  it('Verifica montagem do objeto routes', async () => {
    const allowedUnsafe = ['/healthStatus'];
    let app = appUtils.configApp(['/postTests', '/healthStatus']);

    const routes = checkRoutes({ app, allowedUnsafe });

    app = null;
    assert.deepEqual(routes.allRoutes, [
      { path: '/getTests', method: 'get', hasAuth: true, allowedUnsafe: false },
      { path: '/getTests/:id', method: 'get', hasAuth: true, allowedUnsafe: false },
      { path: '/postTests', method: 'post', hasAuth: false, allowedUnsafe: false },
      { path: '/putTests', method: 'put', hasAuth: true, allowedUnsafe: false },
      { path: '/patchTests', method: 'patch', hasAuth: true, allowedUnsafe: false },
      { path: '/deleteTests/:id', method: 'delete', hasAuth: true, allowedUnsafe: false },
      { path: '/healthStatus', method: 'get', hasAuth: false, allowedUnsafe: true }
    ], 'Unsafe routes list');
  });
});

describe('Testes usando rotas atribuídas diretamente ao express:', () => {
  it('Todas as rotas possuem autenticação', async () => {
    let app = appUtils.configApp([], false);

    const routes = checkRoutes({ app });

    app = null;
    assert.deepEqual(routes.unsafeRoutes, [], 'Unsafe routes list');
    assert.strictEqual(routes.allowedUnsafeCounter, 0, 'Allowed unsafe routes counter assert');
    assert.strictEqual(routes.unsafeCounter, 0, 'Unsafe routes counter assert');
  });

  it('Todas as rotas possuem autenticação, exceto as permitidas', async () => {
    const allowedUnsafe = ['/healthStatus'];
    let app = appUtils.configApp(['/healthStatus'], false);

    const routes = checkRoutes({ app, allowedUnsafe });

    app = null;
    assert.deepEqual(routes.unsafeRoutes, [], 'Unsafe routes list');
    assert.strictEqual(routes.allowedUnsafeCounter, 1, 'Allowed unsafe routes counter assert');
    assert.strictEqual(routes.unsafeCounter, 0, 'Unsafe routes counter assert');
  });


  it('Todas as rotas possuem autenticação, exceto /postTests', async () => {
    let app = appUtils.configApp(['/postTests'], false);

    const routes = checkRoutes({ app });

    app = null;
    assert.deepEqual(routes.unsafeRoutes, ['/postTests'], 'Unsafe routes list');
    assert.strictEqual(routes.allowedUnsafeCounter, 0, 'Allowed unsafe routes counter assert');
    assert.strictEqual(routes.unsafeCounter, 1, 'Unsafe routes counter assert');
  });


  it('Todas as rotas possuem autenticação, exceto /postTests e permitida', async () => {
    const allowedUnsafe = ['/healthStatus'];
    let app = appUtils.configApp(['/postTests', '/healthStatus'], false);

    const routes = checkRoutes({ app, allowedUnsafe });

    app = null;
    assert.deepEqual(routes.unsafeRoutes, ['/postTests'], 'Unsafe routes list');
    assert.strictEqual(routes.allowedUnsafeCounter, 1, 'Allowed unsafe routes counter assert');
    assert.strictEqual(routes.unsafeCounter, 1, 'Unsafe routes counter assert');
  });

  it('Verifica montagem do objeto routes', async () => {
    const allowedUnsafe = ['/healthStatus'];
    let app = appUtils.configApp(['/postTests', '/healthStatus'], false);

    const routes = checkRoutes({ app, allowedUnsafe });

    app = null;
    assert.deepEqual(routes.allRoutes, [
      { path: '/getTests', method: 'get', hasAuth: true, allowedUnsafe: false },
      { path: '/getTests/:id', method: 'get', hasAuth: true, allowedUnsafe: false },
      { path: '/postTests', method: 'post', hasAuth: false, allowedUnsafe: false },
      { path: '/putTests', method: 'put', hasAuth: true, allowedUnsafe: false },
      { path: '/patchTests', method: 'patch', hasAuth: true, allowedUnsafe: false },
      { path: '/deleteTests/:id', method: 'delete', hasAuth: true, allowedUnsafe: false },
      { path: '/healthStatus', method: 'get', hasAuth: false, allowedUnsafe: true }
    ], 'Unsafe routes list');
  });
});