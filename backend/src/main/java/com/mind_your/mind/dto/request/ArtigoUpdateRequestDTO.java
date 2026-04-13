package com.mind_your.mind.dto.request;

import com.mind_your.mind.models.Artigo;
import java.util.List;

public class ArtigoUpdateRequestDTO {
    private String titulo;
    private String corpo;
    private Boolean publicado;
    private List<Artigo.Referencia> referencias;

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

    public Boolean getPublicado() {
        return publicado;
    }

    public void setPublicado(Boolean publicado) {
        this.publicado = publicado;
    }

    public List<Artigo.Referencia> getReferencias() {
        return referencias;
    }

    public void setReferencias(List<Artigo.Referencia> referencias) {
        this.referencias = referencias;
    }
}
