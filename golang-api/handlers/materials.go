package handlers

import (
	"encoding/json"
	"golang-api/auth"
	"golang-api/config"
	"golang-api/models"
	"log"
	"net/http"
)

func GetMaterialsData(w http.ResponseWriter, r *http.Request) {
	// Mendapatkan token dari header request
	tokenString := r.Header.Get("Authorization")

	if !auth.ValidateToken(tokenString) {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Mengambil data pengguna dari database MySQL
	db := config.GetDBConnect()
	script := "SELECT id, name, manufacturer, stocks, updated_by FROM materials"

	// Membuat channel untuk komunikasi antara goroutine
	resultChan := make(chan []models.Material)
	errorChan := make(chan error)

	// Menjalankan goroutine untuk pengambilan data
	var materials []models.Material
	go func() {
		rows, err := db.Query(script)
		if err != nil {
			errorChan <- err
			return
		}
		defer rows.Close()

		for rows.Next() {
			var material models.Material
			err := rows.Scan(&material.ID, &material.Name, &material.Manufacturer, &material.Stocks, &material.UpdatedBy)
			if err != nil {
				errorChan <- err
				return
			}

			materials = append(materials, material)
		}

		resultChan <- materials
	}()

	select {
	case materials := <-resultChan:
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(materials)
	case err := <-errorChan:
		log.Println(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}
}
