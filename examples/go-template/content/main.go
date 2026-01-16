package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

type Response struct {
	Message string `json:"message"`
	Service string `json:"service"`
	Version string `json:"version"`
}

type HealthResponse struct {
	Status  string `json:"status"`
	Service string `json:"service"`
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "${{ values.port }}"
	}

	r := mux.NewRouter()

	// Routes
	r.HandleFunc("/", homeHandler).Methods("GET")
	r.HandleFunc("/health", healthHandler).Methods("GET")
	r.HandleFunc("/api/v1/info", infoHandler).Methods("GET")

	// Start server
	fmt.Printf("🚀 ${{ values.name }} is running on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	response := Response{
		Message: "Welcome to ${{ values.name }}!",
		Service: "${{ values.name }}",
		Version: "1.0.0",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	response := HealthResponse{
		Status:  "healthy",
		Service: "${{ values.name }}",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func infoHandler(w http.ResponseWriter, r *http.Request) {
	response := Response{
		Message: "${{ values.description }}",
		Service: "${{ values.name }}",
		Version: "1.0.0",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
