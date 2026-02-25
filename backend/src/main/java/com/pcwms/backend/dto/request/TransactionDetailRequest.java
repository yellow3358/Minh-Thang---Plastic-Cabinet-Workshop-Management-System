package com.pcwms.backend.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TransactionDetailRequest {
    @JsonProperty("materialId")
    private Long MaterialId;

    @JsonProperty("quantity")
    private Integer quantity;

    public TransactionDetailRequest() {
    }

    public Long getMaterialId() {
        return MaterialId;
    }

    public void setMaterialId(Long materialId) {
        MaterialId = materialId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}


