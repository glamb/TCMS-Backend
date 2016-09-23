import Suite from '../models/suite';
import Project from '../models/project';

/**
 * Load project and suite and append to req.
 */
function load(req, res, next, id) {
  Suite.get(id).then((suite) => {
    req.suite = suite;		// eslint-disable-line no-param-reassign
    return next();
  }).error((e) => next(e));
}

/**
 * Get suite
 * @returns {Suite}
 */
function get(req, res) {
  return res.json(req.suite);
}

/**
 * Create new project
 * @property {string} req.body.name - The name of project.
 * @property {string} req.body.description - The description of project.
 * @returns {Project}
 */
function create(req, res, next) {
  const suite = new Suite({
    project: req.params.projId,
    name: req.body.name,
    description: req.body.description
  });

  suite.saveAsync()
    .then((savedSuite) => {
      Project.get(req.params.projId).then((project) => {
        project.suites.push(savedSuite._id); // eslint-disable-line no-param-reassign
        project.saveAsync()
        .error((e) => next(e));
      });
      res.json(savedSuite);
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
  const suite = req.suite;
  suite.name = req.body.name;
  suite.description = req.body.description;

  suite.saveAsync()
    .then((savedSuite) => res.json(savedSuite))
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
  const projId = req.param('projId');
  Suite.list(projId, { limit, skip }).then((suites) =>	res.json(suites))
    .error((e) => next(e));
}

/**
 * Delete project.
 * @returns {Project}
 */
function remove(req, res, next) {
  const suite = req.suite;
  suite.removeAsync()
    .then((deletedSuite) => res.json(deletedSuite))
    .error((e) => next(e));
}

export default { load, get, create, update, list, remove };
