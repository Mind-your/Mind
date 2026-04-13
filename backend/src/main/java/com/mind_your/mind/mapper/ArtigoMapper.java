package com.mind_your.mind.mapper;

import com.mind_your.mind.dto.request.ArtigoRequestDTO;
import com.mind_your.mind.dto.request.ArtigoUpdateRequestDTO;
import com.mind_your.mind.dto.response.ArtigoResponseDTO;
import com.mind_your.mind.models.Artigo;

import java.time.LocalDateTime;

public class ArtigoMapper {

    public static ArtigoResponseDTO toResponseDTO(Artigo artigo) {
        if (artigo == null) {
            return null;
        }
        ArtigoResponseDTO dto = new ArtigoResponseDTO();
        dto.setId(artigo.getId());
        dto.setTitulo(artigo.getTitulo());
        dto.setCorpo(artigo.getCorpo());
        dto.setAutorNome(artigo.getAutorNome());
        dto.setAutorAvatar(artigo.getAutorAvatar());
        dto.setPsicologoId(artigo.getPsicologoId());
        dto.setImagem(artigo.getImagem());
        dto.setLikes(artigo.getLikes());
        dto.setViews(artigo.getViews());
        dto.setPublicado(artigo.isPublicado());
        dto.setDataCriacao(artigo.getDataCriacao());
        dto.setDataAtualizacao(artigo.getDataAtualizacao());
        dto.setReferencias(artigo.getReferencias());
        return dto;
    }

    public static void updateArtigoFromDTO(ArtigoUpdateRequestDTO dto, Artigo artigo) {
        if (dto.getTitulo() != null) {
            artigo.setTitulo(dto.getTitulo());
        }
        if (dto.getCorpo() != null) {
            artigo.setCorpo(dto.getCorpo());
        }
        if (dto.getPublicado() != null) {
            artigo.setPublicado(dto.getPublicado());
        }
        if (dto.getReferencias() != null) {
            artigo.setReferencias(dto.getReferencias());
        }
        artigo.setDataAtualizacao(LocalDateTime.now());
    }
}
