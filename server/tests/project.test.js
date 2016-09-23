import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

describe('## Project APIs', () => {
  let project = {
    name: 'Test Project',
    description: 'Test Project Description'
  };

  let suite = {
    name: 'Test Suite',
    description: 'Test Suite Description'
  };

  describe('# POST /api/projects', () => {
    it('should create a new project', (done) => {
      request(app)
        .post('/api/projects')
        .send(project)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.name).to.equal(project.name);
          expect(res.body.description).to.equal(project.description);
          project = res.body;
          done();
        });
    });
  });

  describe('# GET /api/projects/:projId', () => {
    it('should get project details', (done) => {
      request(app)
        .get(`/api/projects/${project._id}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.name).to.equal(project.name);
          expect(res.body.description).to.equal(project.description);
          done();
        });
    });

    it('should report error with message - Not found, when project does not exists', (done) => {
      request(app)
        .get('/api/projects/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.message).to.equal('Not Found');
          done();
        });
    });
  });

  describe('# PUT /api/projects/:projId', () => {
    it('should update project details', (done) => {
      project.name = 'new name';
      request(app)
        .put(`/api/projects/${project._id}`)
        .send(project)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.name).to.equal('new name');
          expect(res.body.description).to.equal(project.description);
          done();
        });
    });

    describe('# POST /api/projects/:projId/suites', () => {
      it('should create a new suite', (done) => {
        request(app)
          .post(`/api/projects/${project._id}/suites`)
          .send(suite)
          .expect(httpStatus.OK)
          .then(res => {
            expect(res.body.name).to.equal(suite.name);
            expect(res.body.description).to.equal(suite.description);
            suite = res.body;
            done();
          });
      });
    });

    describe('# GET /api/projects/:projId/suites', () => {
      it('should get project details', (done) => {
        request(app)
          .get(`/api/projects/${project._id}/suites/${suite._id}`)
          .expect(httpStatus.OK)
          .then(res => {
            expect(res.body.name).to.equal(suite.name);
            expect(res.body.description).to.equal(suite.description);
            done();
          });
      });

      it('should report error with message - Not found, when suite does not exists', (done) => {
        request(app)
          .get(`/api/projects/${project._id}/suites/432890563245`)
          .expect(httpStatus.NOT_FOUND)
          .then(res => {
            expect(res.body.message).to.equal('Not Found');
            done();
          });
      });
    });
  });

  describe('# GET /api/projects/', () => {
    it('should get all projects', (done) => {
      request(app)
        .get('/api/projects')
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('# DELETE /api/projects/', () => {
    it('should delete project', (done) => {
      request(app)
        .delete(`/api/projects/${project._id}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.name).to.equal('new name');
          expect(res.body.description).to.equal(project.description);
          done();
        });
    });
  });
});
