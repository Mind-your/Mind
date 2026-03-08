package com.mind_your.mind.dto.request;

import java.time.LocalDate;

public class PacienteUpdateRequestDTO {
    private String nome;
    private String sobrenome;
    private String login;
    private String email;
    private String senha;
    private LocalDate dtNascimento;
    private String genero;
    private String telefone;
    private String endereco;
    private String imgPerfil;
    private String sobreMim;
    private String medicamentos;
    private String preferencias;

    // Getters e Setters
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getSobrenome() {
        return sobrenome;
    }
    public void setSobrenome(String sobrenome) {
        this.sobrenome = sobrenome;
    }
    public String getLogin() {
        return login;
    }
    public void setLogin(String login) {
        this.login = login;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getSenha() {
        return senha;
    }
    public void setSenha(String senha) {
        this.senha = senha;
    }
    public LocalDate getDtNascimento() {
        return dtNascimento;
    }
    public void setDtNascimento(LocalDate dtNascimento) {
        this.dtNascimento = dtNascimento;
    }
    public String getGenero() {
        return genero;
    }
    public void setGenero(String genero) {
        this.genero = genero;
    }
    public String getTelefone() {
        return telefone;
    }
    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
    public String getEndereco() {
        return endereco;
    }
    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }
    public String getImgPerfil() {
        return imgPerfil;
    }
    public void setImgPerfil(String imgPerfil) {
        this.imgPerfil = imgPerfil;
    }
    public String getSobreMim() {
        return sobreMim;
    }
    public void setSobreMim(String sobreMim) {
        this.sobreMim = sobreMim;
    }
    public String getMedicamentos() {
        return medicamentos;
    }
    public void setMedicamentos(String medicamentos) {
        this.medicamentos = medicamentos;
    }
    public String getPreferencias() {
        return preferencias;
    }
    public void setPreferencias(String preferencias) {
        this.preferencias = preferencias;
    }


}