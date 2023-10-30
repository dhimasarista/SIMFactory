package config

import (
	"database/sql"
	"log"
)

func GetDBConnect() *sql.DB {
	// Membuat koneksi database dengan database pooling
	db, err := sql.Open("mysql", "dev_user:vancouver@tcp(localhost:3306)/simfactory?parseTime=true")
	if err != nil {
		log.Fatal(err)
	}

	// Set maximum open connections and maximum idle connections
	db.SetMaxOpenConns(10) // Atur jumlah maksimum koneksi terbuka
	db.SetMaxIdleConns(5)  // Atur jumlah maksimum koneksi yang tetap terbuka

	// Pastikan koneksi database ditutup saat selesai
	return db
}
