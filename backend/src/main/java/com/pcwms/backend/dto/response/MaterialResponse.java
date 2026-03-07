package com.pcwms.backend.dto.response;

import com.pcwms.backend.entity.Material;
import lombok.Data;

@Data
public class MaterialResponse {
    private Long id;
    private String name;
    private String sku;
    private String unit;
    private Integer currentStock;
    private Integer minStockLevel;

    // 👉 Tự động tính toán để Frontend hiện màu đỏ nếu true
    private boolean isLowStock;

    public MaterialResponse(Material m) {
        this.id = m.getId();
        this.name = m.getName();
        this.sku = m.getSku();
        this.unit = m.getUnit();
        this.currentStock = m.getCurrentStock();
        this.minStockLevel = m.getMinStockLevel();
        // Logic: Nếu tồn <= ngưỡng báo động thì đánh dấu là thấp
        this.isLowStock = m.getCurrentStock() <= m.getMinStockLevel();
    }
}
