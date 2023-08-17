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
        
        expect(isMatch).to.equal(true, "Password hashing did not match.");
      });
    });