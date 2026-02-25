package com.pcwms.backend.controller;

import com.pcwms.backend.dto.response.ResponseObject;
import com.pcwms.backend.entity.Product;
import com.pcwms.backend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.parser.Entity;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Tất cả người dùng đều có thể xem danh sách sản phẩm
    @GetMapping
    public ResponseEntity<ResponseObject> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(new ResponseObject("success", "Lấy danh sách sản phẩm thành công", products));
    }
    // Tất cả người dùng đều có thể xem chi tiết sản phẩm
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ResponseObject> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(
                new ResponseObject("SUCESS", "Lấy chi tiết sản phẩm thành công", productService.getProductById(id))
        );
    }
    // Chỉ STAFF hoặc ADMIN mới được tạo sản phẩm
    @PostMapping
    @PreAuthorize("hasRole('STAFF') or hasRole('ADMIN') or hasRole('PRODUCTION_MANAGER')")
    public ResponseEntity<ResponseObject> create(@RequestBody Product product) {
        return ResponseEntity.ok(
                new ResponseObject("SUCESS", "Tạo sản phẩm thành công", productService.createProduct(product))
        );
    }

    //update san pham
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('STAFF') or hasRole('ADMIN') or hasRole('PRODUCTION_MANAGER')")
    public ResponseEntity<ResponseObject> update(@PathVariable Long id, @RequestBody Product product) {
        return ResponseEntity.ok(
                new ResponseObject("SUCESS", "Cập nhật sản phẩm thành công", productService.updateProduct(id, product))
        );
    }

        //delete san pham
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('STAFF') or hasRole('ADMIN') or hasRole('PRODUCTION_MANAGER')")
    public ResponseEntity<ResponseObject> delete(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(
                new ResponseObject("SUCESS", "Xóa sản phẩm thành công", null)
        );
    }
}