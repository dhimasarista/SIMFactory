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
	var materials []models.Material // Data yang akan dikirim

	// Mendapatkan token dari header request
	tokenString := r.Header.Get("Authorization")

	if !auth.ValidateToken(tokenString) {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Mengambil data pengguna dari database MySQL
	db := config.GetDBConnect()
	script := "SELECT id, name, manufacturer, stocks, updated_by FROM materials"
	rows, err := db.Query(script)
	if err != nil {
		log.Println(err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	for rows.Next() {
		var material models.Material
		err := rows.Scan(&material.ID, &material.Name, &material.Manufacturer, &material.Stocks, &material.UpdatedBy)
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
