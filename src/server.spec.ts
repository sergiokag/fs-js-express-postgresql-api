import * as http from 'http';
import app from './server';

let server: http.Server;

describe('Server', () => {
    beforeAll((done: DoneFn) => {
        server = app.listen(3333, () => {
            done();
        });
    });

    it('should understand basic mathematical principles', function () {
        expect(5).toBeGreaterThan(3);
    });

    afterAll(() => {
        server.close();
    });
});
