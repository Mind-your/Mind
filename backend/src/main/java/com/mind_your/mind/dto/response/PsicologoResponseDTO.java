package com.mind_your.mind.dto.response;

public class PsicologoResponseDTO {

    private String id;
    private String nome;
    private String sobrenome;
    private String email;
    private String login;
    private String imgPerfil;
    private String crp;
    private String especialidade;
    private String genero;
    private String telefone;
    private String endereco;
    private String sobreMim;

    public PsicologoResponseDTO(String id, String nome, String sobrenome, String email, String login,
                                 String imgPerfil, String crp, String especialidade,
                                 String genero, String telefone, String endereco, String sobreMim) {
        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.login = login;
        this.imgPerfil = imgPerfil;
        this.crp = crp;
        this.especialidade = especialidade;
        this.genero = genero;
        this.telefone = telefone;
        this.endereco = endereco;
        this.sobreMim = sobreMim;
    }

    public String getId() { return id; }
    public String getNome() { return nome; }
    public String getSobrenome() { return sobrenome; }
    public String getEmail() { return email; }
    public String getLogin() { return login; }
    public String getImgPerfil() { return imgPerfil; }
    public String getCrp() { return crp; }
    public String getEspecialidade() { return especialidade; }
    public String getGenero() { return genero; }
    public String getTelefone() { return telefone; }
    public String getEndereco() { return endereco; }
    public String getSobreMim() { return sobreMim; }
}