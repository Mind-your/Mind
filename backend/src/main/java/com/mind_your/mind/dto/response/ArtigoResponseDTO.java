package com.mind_your.mind.dto.response;

import java.time.LocalDateTime;
import java.util.List;
import com.mind_your.mind.models.Artigo;

public class ArtigoResponseDTO {
    private String id;
    private String titulo;
    private String corpo;
    private String autorNome;
    private String autorAvatar;
    private String psicologoId;
    private String imagem;
    private int likes;
    private int views;
    private boolean publicado;
    private LocalDateTime dataCriacao;
    private LocalDateTime dataAtualizacao;
    private List<Artigo.Referencia> referencias;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getCorpo() {
        return corpo;
    }

    public void setCorpo(String corpo) {
        this.corpo = corpo;
    }

    public String getAutorNome() {
        return autorNome;
    }

    public void setAutorNome(String autorNome) {
        this.autorNome = autorNome;
    }

    public String getPsicologoId() {
        return psicologoId;
    }

    public void setPsicologoId(String psicologoId) {
        this.psicologoId = psicologoId;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    public boolean isPublicado() {
        return publicado;
    }

    public void setPublicado(boolean publicado) {
        this.publicado = publicado;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public LocalDateTime getDataAtualizacao() {
        return dataAtualizacao;
    }

    public void setDataAtualizacao(LocalDateTime dataAtualizacao) {
        this.dataAtualizacao = dataAtualizacao;
    }

    public List<Artigo.Referencia> getReferencias() {
        return referencias;
    }

    public void setReferencias(List<Artigo.Referencia> referencias) {
        this.referencias = referencias;
    }

    public String getAutorAvatar() {
        return autorAvatar;
    }

    public void setAutorAvatar(String autorAvatar) {
        this.autorAvatar = autorAvatar;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public int getViews() {
        return views;
    }

    public void setViews(int views) {
        this.views = views;
    }
}
