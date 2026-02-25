package com.pcwms.backend.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class WarehouseTransactionRequest {
    private String referenceId; // Số tham chiếu (có thể là mã đơn hàng, mã phiếu nhập kho, v.v.)
    private List<TransactionDetailRequest> details;

    public WarehouseTransactionRequest() {
    }

    public String getReferenceId() {
        return referenceId;
    }

    public void setReferenceId(String referenceId) {
        this.referenceId = referenceId;
    }

    public List<TransactionDetailRequest> getDetails() {
        return details;
    }

    public void setDetails(List<TransactionDetailRequest> details) {
        this.details = details;
    }
}
