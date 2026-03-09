package com.pcwms.backend.services;

// 👉 GOM GỌN CÁC IMPORT VÀO ĐÂY CHO ĐẸP MẮT
import com.pcwms.backend.dto.request.BomCreateRequest;
import com.pcwms.backend.dto.request.BomDetailRequest;
import com.pcwms.backend.dto.response.BomResponse;
import com.pcwms.backend.entity.BillOfMaterial;
import com.pcwms.backend.entity.BillOfMaterialDetail;
import com.pcwms.backend.entity.Material;
import com.pcwms.backend.entity.Product;
import com.pcwms.backend.repository.BillOfMaterialRepository;
import com.pcwms.backend.repository.MaterialRepository;
import com.pcwms.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BomService {

    @Autowired
    private BillOfMaterialRepository bomRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private MaterialRepository materialRepository;

    public List<BomResponse> getAllBoms() {
        return bomRepository.findAll().stream()
                .map(BomResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public BomResponse createBom(BomCreateRequest request) {

        // 1. Kiểm tra Thành phẩm có tồn tại không
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Thành phẩm với ID: " + request.getProductId()));

        // 2. Tạo BOM Cha
        BillOfMaterial bom = new BillOfMaterial();
        bom.setProduct(product);
        bom.setVersion(request.getVersion());
        bom.setIsApproved(false);
        bom.setIsActive(true);

        // 3. Kiểm tra list Vật tư rỗng
        if (request.getDetails() == null || request.getDetails().isEmpty()) {
            throw new RuntimeException("Định mức phải có ít nhất 1 nguyên vật liệu!");
        }

        // 👉 NGHIỆP VỤ MỚI: Dùng Set để theo dõi và chặn Vật tư bị khai báo trùng lặp trong cùng 1 BOM
        Set<Long> materialIds = new HashSet<>();

        // 4. Lặp qua từng vật tư
        for (BomDetailRequest detailReq : request.getDetails()) {

            // Check trùng lặp
            if (!materialIds.add(detailReq.getMaterialId())) {
                throw new RuntimeException("Vật tư có ID " + detailReq.getMaterialId() + " bị trùng lặp trong danh sách!");
            }

            if (detailReq.getQuantityRequired() == null || detailReq.getQuantityRequired().compareTo(BigDecimal.ZERO) <= 0) {
                throw new RuntimeException("Số lượng vật tư phải lớn hơn 0!");
            }

            Material material = materialRepository.findById(detailReq.getMaterialId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy Nguyên vật liệu với ID: " + detailReq.getMaterialId()));

            // Tạo dòng chi tiết
            BillOfMaterialDetail detail = new BillOfMaterialDetail();
            detail.setMaterial(material);
            detail.setQuantityRequired(detailReq.getQuantityRequired());

            // Gắn Con vào Cha
            bom.addBomDetail(detail);
        }

        // 5. Lưu 1 phát ăn luôn cả Cha lẫn Con
        BillOfMaterial savedBom = bomRepository.save(bom);

        // 6. Trả về cho FE
        return new BomResponse(savedBom);
    }
}