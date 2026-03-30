package com.mind_your.email.dto;

public record EmailAtivacaoRequestDTO(
    String email,
    String nome,
    String token,
    String tipo,
    String appUrl
) {}
