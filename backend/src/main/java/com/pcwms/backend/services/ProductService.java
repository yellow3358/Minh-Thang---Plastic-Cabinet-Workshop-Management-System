package com.pcwms.backend.services;

import com.pcwms.backend.entity.Product;
import com.pcwms.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với ID: " + id));
    }

    public Product createProduct(Product product) {
        // Kiểm tra SKU đã tồn tại chưa
        if (productRepository.existsBySku(product.getSku())) {
            throw new RuntimeException("SKU đã tồn tại. Vui lòng chọn một SKU khác.");
        }
        if (product.getSellingPrice() != null && product.getSellingPrice().doubleValue() < 0) {
            throw new RuntimeException("Giá bán sản phẩm không được là số âm.");
        }
        return productRepository.save(product);
    }
    public Product updateProduct(Long id, Product productDetails) {
        Product existingProduct = productRepository.getProductById(id);

        if(!existingProduct.getSku().equals(productDetails.getSku())
                && productRepository.existsBySku(productDetails.getSku())) {
                throw new RuntimeException("SKU đã tồn tại. Vui lòng chọn một SKU khác.");
        }
        existingProduct.setName(productDetails.getName());
        existingProduct.setSku(productDetails.getSku());
        existingProduct.setSellingPrice(productDetails.getSellingPrice());

        // Lưu lại sản phẩm đã cập nhật
        return productRepository.save(existingProduct);
    }

    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }
}