package com.mind_your.mind.dto.request;

public class PsicologoCadastroRequestDTO {

    private String nome;
    private String sobrenome;
    private String email;
    private String login;
    private String senha;
    private String crp;
    private String especialidade;

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getSobrenome() { return sobrenome; }
    public void setSobrenome(String sobrenome) { this.sobrenome = sobrenome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }

    public String getCrp() { return crp; }
    public void setCrp(String crp) { this.crp = crp; }

    public String getEspecialidade() { return especialidade; }
    public void setEspecialidade(String especialidade) { this.especialidade = especialidade; }
}