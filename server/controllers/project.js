import Project from '../models/project';

/**
 * Load project and append to req.
 */
function load(req, res, next, id) {
  Project.get(id).then((project) => {
    req.project = project;		// eslint-disable-line no-param-reassign
    return next();
  }).error((e) => next(e));
}

/**
 * Get project
 * @returns {Project}
 */
function get(req, res) {
  return res.json(req.project);
}

/**
 * Create new project
 * @property {string} req.body.name - The name of project.
 * @property {string} req.body.description - The description of project.
 * @returns {Project}
 */
function create(req, res, next) {
  const project = new Project({
    name: req.body.name,
    description: req.body.description,
    img_id: req.body.img_id
  });

  project.saveAsync()
    .then((savedProject) => res.json(savedProject))
    .error((e) => next(e));
}

/**
 * Update existing project
 * @property {string} req.body.name - The name of project.
 * @property {string} req.body.description - The description of project.
 * @returns {Project}
 */
function update(req, res, next) {
  const project = req.project;
  if (req.body.name) {project.name = req.body.name;}
  if (req.body.description) {project.description = req.body.description;}
  if (req.body.status) {project.status = req.body.status;}

  project.saveAsync()
    .then((savedProject) => res.json(savedProject))
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
  Project.list({ limit, skip }).then((projects) =>	res.json(projects))
    .error((e) => next(e));
}

/**
 * Delete project.
 * @returns {Project}
 */
function remove(req, res, next) {
  const project = req.project;
  project.removeAsync()
    .then((deletedProject) => res.json(deletedProject))
    .error((e) => next(e));
}

export default { load, get, create, update, list, remove };
