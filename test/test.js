const bcrypt = require("bcrypt");
const { expect } = require("chai");

describe("Password Hashing", () => {
    it("should hash the password correctly", async () => {
      const username = "dhimasarista";
      const password = "dhimas12345";
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const isMatch = await bcrypt.compare(password, hashedPassword);
      
      // Menggunakan asersi untuk menampilkan pesan error jika tidak sesuai
      expect(isMatch).to.equal(true, "Password hashing did not match.");
    });
  });