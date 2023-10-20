package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"golang-api/config"
	"log"
	"net/http"
	"time"

	_ "github.com/go-sql-driver/mysql" // Import driver MySQL
	"github.com/gorilla/mux"
)

var db *sql.DB

func main() {
	// Membuat koneksi ke database
	db = config.GetDBConnect()
	defer db.Close()

	fmt.Println("Server is running on http://localhost:8080")

	r := mux.NewRouter()

	// Rute untuk halaman utama
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "Welcome to the main page!")
	}).Methods("GET")

	// Rute untuk data material
	r.HandleFunc("/materials/data", getMaterialsData).Methods("GET")

	http.Handle("/", r)
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}

func ValidateToken(tokenString string) bool {
	return tokenString == "Bearer 210401010174"
}

type Material struct {
	ID             int64         `json:"id"`
	Name           string        `json:"name"`
	UpdatedBy      string        `json:"updatedBy"`
	TargetQuantity int64         `json:"targetQuantity"`
	TotalOutput    sql.NullInt64 `json:"totalOutput"`
	Stocks         sql.NullInt64 `json:"stocks"`
	CreatedAt      time.Time     `json:"createdAt"`
}

func getMaterialsData(w http.ResponseWriter, r *http.Request) {
	// Anda dapat menghapus blok kode berikut yang memeriksa token otorisasi:
	// Mendapatkan token dari header permintaan
	tokenString := r.Header.Get("Authorization")

	if !ValidateToken(tokenString) {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Mengambil data pengguna dari database MySQL
	db := config.GetDBConnect()
	script := "SELECT id, name, updated_by, target_quantity, total_output, stocks, created_at FROM models"
	rows, err := db.Query(script)
	if err != nil {
		log.Println(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var materials []Material

	for rows.Next() {
		var material Material
		err := rows.Scan(&material.ID, &material.Name, &material.UpdatedBy, &material.TargetQuantity, &material.TotalOutput, &material.Stocks, &material.CreatedAt)
		if err != nil {
			log.Println(err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		materials = append(materials, material)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(materials)
}
