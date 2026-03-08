package com.mind_your.mind.dto.response;

public class PacienteResponseDTO {
    private String id;
    private String nome;
    private String email;
    private String login;
    private String imgPerfil;

    public PacienteResponseDTO(String id, String nome, String email, String login, String imgPerfil) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.login = login;
        this.imgPerfil = imgPerfil;
    }

    public String getId() { return id; }
    public String getNome() { return nome; }
    public String getEmail() { return email; }
    public String getLogin() { return login; }
    public String getImgPerfil() { return imgPerfil; }
}