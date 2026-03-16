package com.mind_your.mind.dto.response;

import java.time.LocalDate;

public class PacienteResponseDTO {
    private String id;
    private String nome;
    private String sobrenome;
    private String email;
    private String login;
    private String imgPerfil;
    private LocalDate dtNascimento;
    private String genero;
    private String telefone;
    private String endereco;
    private String sobreMim;
    private String medicamentos;
    private String preferencias;

    public PacienteResponseDTO(String id, String nome, String sobrenome, String email, String login,
                                String imgPerfil, LocalDate dtNascimento, String genero, String telefone,
                                String endereco, String sobreMim, String medicamentos, String preferencias) {
        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.login = login;
        this.imgPerfil = imgPerfil;
        this.dtNascimento = dtNascimento;
        this.genero = genero;
        this.telefone = telefone;
        this.endereco = endereco;
        this.sobreMim = sobreMim;
        this.medicamentos = medicamentos;
        this.preferencias = preferencias;
    }

    public String getId() { return id; }
    public String getNome() { return nome; }
    public String getSobrenome() { return sobrenome; }
    public String getEmail() { return email; }
    public String getLogin() { return login; }
    public String getImgPerfil() { return imgPerfil; }
    public LocalDate getDtNascimento() { return dtNascimento; }
    public String getGenero() { return genero; }
    public String getTelefone() { return telefone; }
    public String getEndereco() { return endereco; }
    public String getSobreMim() { return sobreMim; }
    public String getMedicamentos() { return medicamentos; }
    public String getPreferencias() { return preferencias; }
}