package com.pcwms.backend.dto.response;

import lombok.Data;
import lombok.AllArgsConstructor;
@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String role;

    public JwtResponse(String accessToken,Long id ,String username, String role) {
        this.token = accessToken;
        this.username = username;
        this.role = role;
        this.id = id;
    }
}
