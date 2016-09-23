import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Suite Schema
 */
const SuiteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  project: {
    type: String
  },
  testCases: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
SuiteSchema.method({
});

/**
 * Statics
 */
SuiteSchema.statics = {
  /**
   * Get project
   * @param {ObjectId} id - The objectId of project.
   * @returns {Promise<Project, APIError>}
   */
  get(id) {
    return this.findById(id)
      .populate('testCases')
      .execAsync().then((suite) => {
        if (suite) {
          return suite;
        }
        const err = new APIError('No such project exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List projects in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of projects to be skipped.
   * @param {number} limit - Limit number of projects to be returned.
   * @returns {Promise<Project[]>}
   */
  list(projId, { skip = 0, limit = 50 } = {}) {
    return this.find({ project: projId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('testCases')
      .execAsync();
  }
};

/**
 * @typedef Project
 */
export default mongoose.model('Suite', SuiteSchema);
