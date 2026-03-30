package com.mind_your.email.controller;

import com.mind_your.email.dto.EmailAtivacaoRequestDTO;
import com.mind_your.email.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/ativar")
    public ResponseEntity<String> enviarEmailAtivacao(@RequestBody EmailAtivacaoRequestDTO request) {
        emailService.enviarEmailAtivacao(request);
        return ResponseEntity.ok("E-mail de ativação enfileirado com sucesso.");
    }
}
