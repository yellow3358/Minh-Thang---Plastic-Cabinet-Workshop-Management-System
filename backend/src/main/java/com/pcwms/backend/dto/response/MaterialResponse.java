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

    // 👉 1. Khai báo thêm biến description
    private String description;

    // 👉 Tự động tính toán để Frontend hiện màu đỏ nếu true
    private boolean isLowStock;

    public MaterialResponse(Material m) {
        this.id = m.getId();
        this.name = m.getName();
        this.sku = m.getSku();
        this.unit = m.getUnit();

        // 👉 BẢO VỆ DỮ LIỆU: Đề phòng DB có giá trị null, ta ép về 0 để không bị lỗi
        this.currentStock = m.getCurrentStock() != null ? m.getCurrentStock() : 0;
        this.minStockLevel = m.getMinStockLevel() != null ? m.getMinStockLevel() : 0;

        // 👉 2. Map giá trị description từ Entity sang DTO
        this.description = m.getDescription();

        // Logic: Nếu tồn <= ngưỡng báo động thì đánh dấu là thấp (Dùng biến nội bộ this để an toàn)
        this.isLowStock = this.currentStock <= this.minStockLevel;
    }
}