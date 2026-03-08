package com.mind_your.mind.dto.response;

public class JwtResponseDTO {
    private String token;
    private String type = "Bearer";
    private String username;
    private String tipo;

    public JwtResponseDTO(String token, String username, String tipo) {
        this.token = token;
        this.username = username;
        this.tipo = tipo;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
}