import Test from '../models/test';
import Suite from '../models/suite';

/**
 * Load project and suite and append to req.
 */
function load(req, res, next, id) {
  Test.get(id).then((test) => {
    req.test = test;		// eslint-disable-line no-param-reassign
    return next();
  }).error((e) => next(e));
}

/**
 * Get suite
 * @returns {Suite}
 */
function get(req, res) {
  return res.json(req.test);
}

/**
 * Create new project
 * @property {string} req.body.name - The name of project.
 * @property {string} req.body.description - The description of project.
 * @returns {Project}
 */
function create(req, res, next) {
  const test = new Test({
    name: req.body.name,
    description: req.body.description,
    suite: req.params.suiteId
  });

  test.saveAsync()
    .then((savedTest) => {
      Suite.get(req.params.suiteId).then((suite) => {
        suite.testCases.push(savedTest._id); // eslint-disable-line no-param-reassign
        suite.saveAsync()
        .error((e) => next(e));
      });
      res.json(savedTest);
    })
    .error((e) => next(e));
}

/**
 * Update existing project
 * @property {string} req.body.name - The name of project.
 * @property {string} req.body.description - The description of project.
 * @returns {Project}
 */
function update(req, res, next) {
  const test = req.test;
  test.name = req.body.name;
  test.description = req.body.description;
  test.suite = req.body.suite;

  test.saveAsync()
    .then((savedTest) => res.json(savedTest))
    .error((e) => next(e));
}

/**
 * Get project list.
 * @property {number} req.query.skip - Number of projects to be skipped.
 * @property {number} req.query.limit - Limit number of projects to be returned.
 * @returns {Projects[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  const suiteId = req.param('suiteId');
  Test.list(suiteId, { limit, skip }).then((test) =>	res.json(test))
    .error((e) => next(e));
}

/**
 * Delete project.
 * @returns {Project}
 */
function remove(req, res, next) {
  const test = req.test;
  test.removeAsync()
    .then((deletedTest) => res.json(deletedTest))
    .error((e) => next(e));
}

export default { load, get, create, update, list, remove };
