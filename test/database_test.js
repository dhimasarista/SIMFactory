const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app'); // Ganti dengan nama file aplikasi Express Anda
const pool = require('../config/database');   // Ganti dengan nama file konfigurasi database Anda
const expect = chai.expect;

chai.use(chaiHttp);

describe('Pengujian API', () => {
  before((done) => {
    // Tunggu hingga koneksi database berhasil sebelum menjalankan pengujian
    pool.once('open', () => {
      done();
    });
  });

  it('Harus mengembalikan data JSON', (done) => {
    chai.request(app)
      .get('/test/data')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });

  it('Harus memiliki properti yang sesuai', (done) => {
    chai.request(app)
      .get('/test/data')
      .end((err, res) => {
        expect(res.body).to.have.property('data');
        done();
      });
  });

  // Tambahkan pengujian lain sesuai kebutuhan
});
