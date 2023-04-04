package main

import (
	"github.com/TheSphere/go-chain/backend/blockchain"
	"github.com/gorilla/mux"
	"log"
	"net/http"
)

var bc *blockchain.Blockchain

func main() {
	bc = blockchain.NewBlockchain()

	router := mux.NewRouter()
	router.HandleFunc("/blocks", GetBlocks).Methods("GET")
	router.HandleFunc("/addBlock", AddBlock).Methods("POST")

	log.Fatal(http.ListenAndServe(":8000", router))
}

func GetBlocks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(bc.Blocks)
}

func AddBlock(w http.ResponseWriter, r *http.Request) {
	var data struct {
		Data string `json:"data"`
	}

	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	bc.AddBlock(data.Data)

	w.WriteHeader(http.StatusCreated)
}
