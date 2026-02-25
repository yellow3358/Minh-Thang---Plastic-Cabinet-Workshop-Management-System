package com.pcwms.backend.controller;

import com.pcwms.backend.dto.response.ResponseObject;
import com.pcwms.backend.entity.Material;
import com.pcwms.backend.services.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/materials")
public class MaterialController {

    @Autowired
    private MaterialService materialService;

    // Bất kỳ ai ĐÃ ĐĂNG NHẬP đều được xem danh sách (Sale cần xem để biết còn hàng không, Kế toán cần xem...)
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ResponseObject> getAllMaterials() {
        return ResponseEntity.ok(
                new ResponseObject("SUCCESS", "Lấy danh sách thành công", materialService.getAllMaterials())
        );
    }

    // Tương tự, ai cũng xem được chi tiết
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ResponseObject> getMaterialById(@PathVariable Long id) {
        return ResponseEntity.ok(
                new ResponseObject("SUCCESS", "Lấy chi tiết thành công", materialService.getMaterialById(id))
        );
    }

    // CHỈ CÓ Admin, Giám đốc, hoặc Quản lý kho mới được TẠO nguyên liệu mới
    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('DIRECTOR') or hasRole('WAREHOUSE_MANAGER')")
    public ResponseEntity<ResponseObject> createMaterial(@RequestBody Material material) {
        return ResponseEntity.ok(
                new ResponseObject("SUCCESS", "Tạo nguyên vật liệu thành công", materialService.createMaterial(material))
        );
    }

    // CHỈ CÓ Admin, Giám đốc, hoặc Quản lý kho mới được SỬA
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DIRECTOR') or hasRole('WAREHOUSE_MANAGER')")
    public ResponseEntity<ResponseObject> updateMaterial(@PathVariable Long id, @RequestBody Material material) {
        return ResponseEntity.ok(
                new ResponseObject("SUCCESS", "Cập nhật thành công", materialService.updateMaterial(id, material))
        );
    }

    // Việc XÓA cực kỳ nguy hiểm -> CHỈ ADMIN và DIRECTOR
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DIRECTOR')")
    public ResponseEntity<ResponseObject> deleteMaterial(@PathVariable Long id) {
        materialService.deleteMaterial(id);
        return ResponseEntity.ok(
                new ResponseObject("SUCCESS", "Xóa thành công", null)
        );
    }
}