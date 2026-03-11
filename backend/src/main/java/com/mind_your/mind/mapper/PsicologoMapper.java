package com.mind_your.mind.mapper;

import com.mind_your.mind.dto.request.PsicologoUpdateRequestDTO;
import com.mind_your.mind.dto.response.PsicologoCadastroResponseDTO;
import com.mind_your.mind.dto.response.PsicologoResponseDTO;
import com.mind_your.mind.models.Psicologo;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PsicologoMapper {

    public static PsicologoResponseDTO toResponseDTO(Psicologo p) {
        return new PsicologoResponseDTO(
                p.getId(),
                p.getNome(),
                p.getSobrenome(),
                p.getEmail(),
                p.getLogin(),
                p.getImgPerfil(),
                p.getCrp(),
                p.getEspecialidade(),
                p.getGenero(),
                p.getTelefone(),
                p.getEndereco(),
                p.getSobreMim()
        );
    }

    public static PsicologoCadastroResponseDTO toCadastroResponseDTO(Psicologo p) {
        return new PsicologoCadastroResponseDTO(
                p.getId(),
                p.getNome(),
                p.getEmail(),
                p.getLogin(),
                p.getCrp(),
                p.getEspecialidade()
        );
    }

    public static void updatePsicologoFromDTO(PsicologoUpdateRequestDTO dto, Psicologo psicologo, PasswordEncoder encoder) {
        if (dto.getNome() != null) psicologo.setNome(dto.getNome());
        if (dto.getSobrenome() != null) psicologo.setSobrenome(dto.getSobrenome());
        if (dto.getLogin() != null) psicologo.setLogin(dto.getLogin());
        if (dto.getEmail() != null) psicologo.setEmail(dto.getEmail());
        if (dto.getSenha() != null) psicologo.setSenha(encoder.encode(dto.getSenha()));
        if (dto.getDtNascimento() != null) psicologo.setDtNascimento(dto.getDtNascimento());
        if (dto.getGenero() != null) psicologo.setGenero(dto.getGenero());
        if (dto.getTelefone() != null) psicologo.setTelefone(dto.getTelefone());
        if (dto.getEndereco() != null) psicologo.setEndereco(dto.getEndereco());
        if (dto.getImgPerfil() != null) psicologo.setImgPerfil(dto.getImgPerfil());
        if (dto.getSobreMim() != null) psicologo.setSobreMim(dto.getSobreMim());
        if (dto.getMedicamentos() != null) psicologo.setMedicamentos(dto.getMedicamentos());
        if (dto.getPreferencias() != null) psicologo.setPreferencias(dto.getPreferencias());
        if (dto.getCrp() != null) psicologo.setCrp(dto.getCrp());
        if (dto.getEspecialidade() != null) psicologo.setEspecialidade(dto.getEspecialidade());
    }
}