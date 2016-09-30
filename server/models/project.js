import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Project Schema
 */
const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: false
  },
  img_id: {
    type: Number,
    default: 0
  },
  suites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Suite'
  }],
  status: {
    type: String,
    enum: ['Active', 'Archived'],
    default: 'Active'
  },
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
ProjectSchema.method({
});

/**
 * Statics
 */
ProjectSchema.statics = {
  /**
   * Get project
   * @param {ObjectId} id - The objectId of project.
   * @returns {Promise<Project, APIError>}
   */
  get(id) {
    return this.findById(id)
      .populate('suites')
      .populate('suites.testCases')
      .execAsync().then((project) => {
        if (project) {
          return project;
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
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('suites')
      .populate('suites.testCases')
      .execAsync();
  }
};

/**
 * @typedef Project
 */
export default mongoose.model('Project', ProjectSchema);
