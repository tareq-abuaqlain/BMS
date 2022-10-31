import request from 'supertest';
import app from '../server/app';
import insertDB from '../server/database/config/build';
import sequelize from '../server/database/config/connection';

beforeAll(insertDB);

describe('Flats API', () => {
    test('Flats -put api/v1/flats/:id', async () => {
      const response = await request(app)
        .put('/api/v1/flats/1')
        .send({
            user_id: 2,
        })
        .expect(200);
      expect(response.body.msg).toBe("Updated Successfully");
    });
    test('Flats -put api/v1/flats/:id', async () => {
      const response = await request(app)
        .put('/api/v1/flats/1')
        .send({
            user_id: 1,
        })
        .expect(200);
      expect(response.body.msg).toBe("Updated Successfully");
    });
    test('Flats -put api/v1/flats/:id', async () => {
      const response = await request(app)
        .put('/api/v1/flatsnotFound/1')
        .send({
            user_id: 1,
        })
        .expect(404);
      expect(response.body.message).toBe("Not Found");
    });
    test('Flats -put api/v1/flats/:id', async () => {
        const response = await request(app)
          .put('/api/v1/flats/1')
          .send({
              user_id: 1,
          })
          .expect(200);
        expect(response.body.data[0].id).toBe(1);
      });
  });

afterAll(async () => sequelize.close());