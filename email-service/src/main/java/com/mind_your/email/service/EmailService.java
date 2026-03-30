package com.mind_your.email.service;

import com.mind_your.email.dto.EmailAtivacaoRequestDTO;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Value("${app.mail.from}")
    private String remetente;

    @Async
    public void enviarEmailAtivacao(EmailAtivacaoRequestDTO request) {
        System.out.println("[email-service] Iniciando envio para: " + request.email());
        try {
            String linkAtivacao = request.appUrl() + "/api/auth/ativar?token=" + request.token() + "&tipo="
                    + request.tipo();

            Context context = new Context();
            context.setVariable("nome", request.nome());
            context.setVariable("link", linkAtivacao);

            String htmlContent = templateEngine.process("email-ativacao", context);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(remetente, "Mind Your Mind");
            helper.setTo(request.email());
            helper.setSubject("Bem-vindo(a)! Ative sua conta no Mind");
            helper.setText(htmlContent, true);

            mailSender.send(message);
            System.out.println("[email-service] E-mail enviado com SUCESSO para: " + request.email() + " (Verifique o Mailtrap!)");

        } catch (Exception e) {
            System.err.println("[email-service] ERRO ao enviar e-mail: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
