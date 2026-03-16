package com.mind_your.mind.dto.response;

public class PsicologoCadastroResponseDTO {

    private String id;
    private String nome;
    private String email;
    private String login;
    private String crp;
    private String especialidade;

    public PsicologoCadastroResponseDTO(String id, String nome, String email, String login,
                                         String crp, String especialidade) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.login = login;
        this.crp = crp;
        this.especialidade = especialidade;
    }

    public String getId() { return id; }
    public String getNome() { return nome; }
    public String getEmail() { return email; }
    public String getLogin() { return login; }
    public String getCrp() { return crp; }
    public String getEspecialidade() { return especialidade; }
}