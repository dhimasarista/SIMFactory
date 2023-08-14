const bcrypt = require("bcrypt");
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai; // Atau menggunakan asserstions lain dari chai
const express = require('express');
const app = express();

chai.use(chaiHttp);

  describe("Password Hashing", () => {
      it("Should bcrypt is ok", async () => {
        // const username = "dhimasarista";
        const password = "dhimas12345";
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const isMatch = await bcrypt.compare(password, hashedPassword);
        
        // Menggunakan asersi untuk menampilkan pesan error jika tidak sesuai
        expect(isMatch).to.equal(true, "Password hashing did not match.");
      });
    });

  // Test untuk autentikasi
  describe('Authentication', () => {
    it('should respond with status 200 after successful login', async () => {
      const response = await chai.request('http://localhost:3000')
        .post('/login')
        .send({ username: 'admin', password: 'vancouver' }); // Ganti dengan informasi otentikasi yang sesuai
      expect(response).to.have.status(200);

      // Setelah login, coba akses halaman yang memerlukan otentikasi
      const securedResponse = await chai.request(app).get('http://localhost:3000'); // Ganti dengan rute yang sesuai
      expect(securedResponse).to.have.status(200);
    });
  });