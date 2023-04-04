package api

import (
	"encoding/json"
	"net/http"

	"github.com/TheSphere/go-chain/backend/blockchain"
)

func GetBlockchain() (*blockchain.Blockchain, error) {
	// TODO: Implement logic to retrieve blockchain from local node.
	return nil, nil
}

func GetBlocks(w http.ResponseWriter, r *http.Request) {
	bc, err := GetBlockchain()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(bc.Blocks)
}

func AddBlock(w http.ResponseWriter, r *http.Request) {
	bc, err := GetBlockchain()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var data struct {
		Data string `json:"data"`
	}

	err = json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	bc.AddBlock(data.Data)

	w.WriteHeader(http.StatusCreated)
}
