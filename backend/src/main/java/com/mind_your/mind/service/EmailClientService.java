package com.mind_your.mind.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.http.MediaType;

@Service
public class EmailClientService {

    private final RestClient restClient;

    @Value("${email.service.url}")
    private String emailServiceUrl;

    @Value("${app.url}")
    private String appUrl;

    public EmailClientService(@Value("${email.service.url}") String baseUrl) {
        this.restClient = RestClient.builder()
                .baseUrl(baseUrl)
                .build();
    }

    public void enviarEmailAtivacao(String email, String nome, String token, String tipo) {
        EmailAtivacaoRequest request = new EmailAtivacaoRequest(email, nome, token, tipo, appUrl);

        try {
            System.out.println("[backend] Chamando microserviço de e-mail para: " + email);
            restClient.post()
                    .uri("/api/email/ativar")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(request)
                    .retrieve()
                    .toBodilessEntity();
            System.out.println("[backend] Chamada ao microserviço realizada com sucesso.");
        } catch (Exception e) {
            System.err.println("[backend] ERRO ao chamar microserviço de e-mail: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private record EmailAtivacaoRequest(
        String email,
        String nome,
        String token,
        String tipo,
        String appUrl
    ) {}
}
