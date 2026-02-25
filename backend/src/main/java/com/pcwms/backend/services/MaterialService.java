package com.pcwms.backend.services;

import com.pcwms.backend.entity.Material;
import com.pcwms.backend.repository.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialService {

    @Autowired
    private MaterialRepository materialRepository;

    // Lấy toàn bộ danh sách
    public List<Material> getAllMaterials() {
        return materialRepository.findAll();
    }

    // Lấy chi tiết 1 mã
    public Material getMaterialById(Long id) {
        return materialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Nguyên vật liệu với ID: " + id));
    }

    // Thêm mới
    public Material createMaterial(Material material) {
        if (materialRepository.existsByName(material.getName())) {
            throw new RuntimeException("Tên nguyên vật liệu đã tồn tại trong hệ thống!");
        }
        if (material.getMinStockLevel() < 0 || material.getCurrentStock() < 0) {
            throw new RuntimeException("Số lượng tồn kho không được để số âm!");
        }
        return materialRepository.save(material);
    }

    // Sửa thông tin (Ngoại trừ số lượng tồn kho)
    public Material updateMaterial(Long id, Material materialDetails) {
        Material existingMaterial = getMaterialById(id);

        // Chỉ cập nhật các thông tin cơ bản
        existingMaterial.setName(materialDetails.getName());
        existingMaterial.setUnit(materialDetails.getUnit());
        existingMaterial.setMinStockLevel(materialDetails.getMinStockLevel());

        // KHÔNG cập nhật currentStock ở đây. Nó phải được quản lý bởi Warehouse Transaction!
        return materialRepository.save(existingMaterial);
    }

    // Xóa
    public void deleteMaterial(Long id) {
        Material material = getMaterialById(id);
        // Lưu ý: Nếu nguyên liệu này đã có trong BOM hoặc đã từng nhập/xuất kho,
        // Database sẽ báo lỗi khóa ngoại khi xóa. Ở các bước sau mình sẽ xử lý chặn xóa mềm (Soft Delete) sau.
        materialRepository.delete(material);
    }
}