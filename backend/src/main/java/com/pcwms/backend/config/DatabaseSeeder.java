package com.pcwms.backend.config;

import com.pcwms.backend.entity.*;
import com.pcwms.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private MaterialRepository materialRepository;

    // 👉 BƠM THÊM 2 REPO MỚI
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("=== BẮT ĐẦU KIỂM TRA & TẠO DỮ LIỆU MẪU ===");

        // 1. TẠO DANH SÁCH QUYỀN (ROLES) - Đã xóa ROLE_CUSTOMER
        List<String> roles = List.of(
                "ROLE_ADMIN", "ROLE_DIRECTOR", "ROLE_SALES_MANAGER",
                "ROLE_SALES_STAFF", "ROLE_WAREHOUSE_MANAGER",
                "ROLE_PRODUCTION_MANAGER", "ROLE_ACCOUNTANT"
        );

        for (String roleName : roles) {
            if (!roleRepository.existsByRoleName(roleName)) {
                Role role = new Role();
                role.setRoleName(roleName);
                roleRepository.save(role);
            }
        }

        // 2. TẠO TÀI KHOẢN VÀ HỒ SƠ NHÂN VIÊN NỘI BỘ
        if (userRepository.count() == 0) {
            String defaultPassword = passwordEncoder.encode("123456");

            createStaffUser("admin", defaultPassword, "ROLE_ADMIN", "Nguyễn Quản Trị", "Ban Giám Đốc", "EMP-001", "admin_system@gmail.com", "0988000001");
            createStaffUser("director", defaultPassword, "ROLE_DIRECTOR", "Trần Giám Đốc", "Ban Giám Đốc", "EMP-002", "director@gmail.com", "0988000002");
            createStaffUser("sales_manager", defaultPassword, "ROLE_SALES_MANAGER", "Lê Trưởng Phòng Sale", "Phòng Kinh Doanh", "EMP-003", "sales_manager@gmail.com", "0988000003");
            createStaffUser("sale_staff_1", defaultPassword, "ROLE_SALES_STAFF", "Phạm Nhân Viên Sale", "Phòng Kinh Doanh", "EMP-004", "salestaff@gmail.com", "0988000004");
            createStaffUser("warehouse_manager", defaultPassword, "ROLE_WAREHOUSE_MANAGER", "Hoàng Thủ Kho", "Phòng Kho", "EMP-005", "locchac5@gmail.com", "0988000005");
            createStaffUser("production_manager", defaultPassword, "ROLE_PRODUCTION_MANAGER", "Đinh Quản Đốc", "Xưởng Sản Xuất", "EMP-006", "production@gmail.com", "0988000006");
            createStaffUser("accountant", defaultPassword, "ROLE_ACCOUNTANT", "Vũ Kế Toán", "Phòng Kế Toán", "EMP-007", "accountant@gmail.com", "0988000007");

            System.out.println("-> Đã tạo 7 User nội bộ và các hồ sơ Staff thành công!");
        }

        // 3. TẠO KHÁCH HÀNG (CRM MẪU) ĐỘC LẬP
        if (customerRepository.count() == 0) {
            createCustomer("Công ty TNHH Khách Hàng VIP", "vip@gmail.com", "0911222333", "123 Đường ABC, Hà Nội", "0101234567", new BigDecimal("50000000"));
            createCustomer("Anh Tuấn Mua Lẻ", "tuan.anh@gmail.com", "0988777666", "456 Phố XYZ, HCM", null, BigDecimal.ZERO);
            System.out.println("-> Đã tạo 2 Khách hàng CRM mẫu.");
        }

        // 4. TẠO VẬT TƯ & THÀNH PHẨM MẪU ĐỂ TEST KHO
        if (materialRepository.count() == 0) {
            Material m1 = new Material();
            m1.setName("Gỗ Sồi Nga");
            m1.setUnit("Khối");
            m1.setMinStockLevel(50);
            m1.setCurrentStock(0);
            materialRepository.save(m1);

            Material m2 = new Material();
            m2.setName("Đinh ốc 5 phân");
            m2.setUnit("Hộp");
            m2.setMinStockLevel(100);
            m2.setCurrentStock(0);
            materialRepository.save(m2);

            System.out.println("-> Đã tạo 2 Nguyên vật liệu mẫu.");
        }

        if (productRepository.count() == 0) {
            Product p1 = new Product();
            p1.setName("Bàn làm việc Gỗ Sồi");
            p1.setSku("SP-BAN-001");
            p1.setSellingPrice(new BigDecimal("1500000"));
            p1.setCurrentStock(15); // Có sẵn 15 cái trong kho
            productRepository.save(p1);

            System.out.println("-> Đã tạo 1 Thành phẩm mẫu.");
        }

        System.out.println("=== KẾT THÚC SEEDER ===");
    }

    private void createStaffUser(String username, String encodedPassword, String roleName, String fullName, String department, String employeeId, String email, String phoneNumber) {
        Role role = roleRepository.findByRoleName(roleName)
                .orElseThrow(() -> new RuntimeException("Lỗi Seeder: Không tìm thấy Role " + roleName));

        User user = new User();
        user.setUsername(username);
        user.setPassword(encodedPassword);
        user.setRole(role);
        user.setEmail(email);
        User savedUser = userRepository.save(user);

        Staff staff = new Staff();
        staff.setUser(savedUser);
        staff.setFullname(fullName);
        staff.setDepartment(department);
        staff.setEmployeeId(employeeId);
        staff.setPhoneNumber(phoneNumber);
        staffRepository.save(staff);
    }

    // 👉 HÀM MỚI: TẠO KHÁCH HÀNG CRM
    private void createCustomer(String name, String email, String phone, String address, String taxCode, BigDecimal creditLimit) {
        Customer customer = new Customer();
        customer.setName(name);
        customer.setEmail(email);
        customer.setPhoneNumber(phone);
        customer.setAddress(address);
        customer.setTaxCode(taxCode);
        customer.setCreditLimit(creditLimit);
        customer.setCurrentDebt(BigDecimal.ZERO);
        customerRepository.save(customer);
    }
}