package com.pcwms.backend.config;

import com.pcwms.backend.entity.Material;
import com.pcwms.backend.entity.Role;
import com.pcwms.backend.entity.Staff;
import com.pcwms.backend.entity.User;
import com.pcwms.backend.repository.MaterialRepository;
import com.pcwms.backend.repository.RoleRepository;
import com.pcwms.backend.repository.StaffRepository;
import com.pcwms.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

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

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("=== BẮT ĐẦU KIỂM TRA & TẠO DỮ LIỆU MẪU ===");

        // 1. TẠO DANH SÁCH QUYỀN (ROLES)
        List<String> roles = List.of(
                "ROLE_ADMIN", "ROLE_DIRECTOR", "ROLE_SALES_MANAGER",
                "ROLE_SALES_STAFF", "ROLE_WAREHOUSE_MANAGER",
                "ROLE_PRODUCTION_MANAGER", "ROLE_ACCOUNTANT", "ROLE_CUSTOMER"
        );

        for (String roleName : roles) {
            if (!roleRepository.existsByRoleName(roleName)) {
                Role role = new Role();
                role.setRoleName(roleName);
                roleRepository.save(role);
            }
        }

        // 2. TẠO TÀI KHOẢN VÀ HỒ SƠ NHÂN VIÊN TƯƠNG ỨNG
        if (userRepository.count() == 0) {
            String defaultPassword = passwordEncoder.encode("123456");

            // 👉 ĐÃ SỬA: Bơm thêm số điện thoại vào tham số cuối cùng
            createStaffUser("admin", defaultPassword, "ROLE_ADMIN", "Nguyễn Quản Trị", "Ban Giám Đốc", "EMP-001", "admin_system@gmail.com", "0988000001");
            createStaffUser("director", defaultPassword, "ROLE_DIRECTOR", "Trần Giám Đốc", "Ban Giám Đốc", "EMP-002", "director@gmail.com", "0988000002");
            createStaffUser("sales_manager", defaultPassword, "ROLE_SALES_MANAGER", "Lê Trưởng Phòng Sale", "Phòng Kinh Doanh", "EMP-003", "sales_manager@gmail.com", "0988000003");
            createStaffUser("sale_staff_1", defaultPassword, "ROLE_SALES_STAFF", "Phạm Nhân Viên Sale", "Phòng Kinh Doanh", "EMP-004", "salestaff@gmail.com", "0988000004");

            // 👉 TÀI KHOẢN DÙNG ĐỂ TEST
            createStaffUser("warehouse_manager", defaultPassword, "ROLE_WAREHOUSE_MANAGER", "Hoàng Thủ Kho", "Phòng Kho", "EMP-005", "locchac5@gmail.com", "0988000005");

            createStaffUser("production_manager", defaultPassword, "ROLE_PRODUCTION_MANAGER", "Đinh Quản Đốc", "Xưởng Sản Xuất", "EMP-006", "production@gmail.com", "0988000006");
            createStaffUser("accountant", defaultPassword, "ROLE_ACCOUNTANT", "Vũ Kế Toán", "Phòng Kế Toán", "EMP-007", "accountant@gmail.com", "0988000007");

            // Khách hàng (Không có hồ sơ Staff nên không cần số điện thoại)
            createCustomerUser("customer_1", defaultPassword, "ROLE_CUSTOMER", "customer@gmail.com");

            System.out.println("-> Đã tạo 8 User (có kèm Email & SĐT) và các hồ sơ Staff thành công!");
        }

        // 3. TẠO NGUYÊN VẬT LIỆU MẪU ĐỂ TEST NHẬP KHO
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

            System.out.println("-> Đã tạo 2 Nguyên vật liệu mẫu (ID 1: Gỗ Sồi, ID 2: Đinh ốc).");
        }

        System.out.println("=== KẾT THÚC SEEDER ===");
    }

    // 👉 ĐÃ SỬA: Thêm String phoneNumber vào chữ ký hàm
    private void createStaffUser(String username, String encodedPassword, String roleName, String fullName, String department, String employeeId, String email, String phoneNumber) {
        Role role = roleRepository.findByRoleName(roleName)
                .orElseThrow(() -> new RuntimeException("Lỗi Seeder: Không tìm thấy Role " + roleName));

        // Lưu User trước
        User user = new User();
        user.setUsername(username);
        user.setPassword(encodedPassword);
        user.setRole(role);
        user.setEmail(email);
        User savedUser = userRepository.save(user);

        // Tạo hồ sơ Staff nối với User vừa lưu
        Staff staff = new Staff();
        staff.setUser(savedUser);
        staff.setFullname(fullName);
        staff.setDepartment(department);
        staff.setEmployeeId(employeeId);

        // 👉 ĐÃ SỬA: Gắn số điện thoại vào đây
        staff.setPhoneNumber(phoneNumber);

        staffRepository.save(staff);
    }

    private void createCustomerUser(String username, String encodedPassword, String roleName, String email) {
        Role role = roleRepository.findByRoleName(roleName)
                .orElseThrow(() -> new RuntimeException("Lỗi Seeder: Không tìm thấy Role " + roleName));

        User user = new User();
        user.setUsername(username);
        user.setPassword(encodedPassword);
        user.setRole(role);
        user.setEmail(email);
        userRepository.save(user);
    }
}