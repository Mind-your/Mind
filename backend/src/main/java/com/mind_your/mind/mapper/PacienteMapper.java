package com.mind_your.mind.mapper;

import com.mind_your.mind.dto.request.PacienteUpdateRequestDTO;
import com.mind_your.mind.dto.response.PacienteCadastroResponseDTO;
import com.mind_your.mind.dto.response.PacienteResponseDTO;
import com.mind_your.mind.models.Paciente;
import org.mapstruct.Mapper;
import org.springframework.security.crypto.password.PasswordEncoder;

@Mapper(componentModel = "spring")
public class PacienteMapper {

    public static PacienteResponseDTO toResponseDTO(Paciente p) {
        return new PacienteResponseDTO(
                p.getId(),
                p.getNome(),
                p.getEmail(),
                p.getLogin(),
                p.getImgPerfil()
        );
    }


    public static void updatePacienteFromDTO(PacienteUpdateRequestDTO dto, Paciente paciente, PasswordEncoder encoder) {

        if (dto.getNome() != null) paciente.setNome(dto.getNome());
        if (dto.getSobrenome() != null) paciente.setSobrenome(dto.getSobrenome());
        if (dto.getLogin() != null) paciente.setLogin(dto.getLogin());
        if (dto.getEmail() != null) paciente.setEmail(dto.getEmail());

        if (dto.getSenha() != null) {
            paciente.setSenha(encoder.encode(dto.getSenha()));
        }

        if (dto.getDtNascimento() != null) paciente.setDtNascimento(dto.getDtNascimento());
        if (dto.getGenero() != null) paciente.setGenero(dto.getGenero());
        if (dto.getTelefone() != null) paciente.setTelefone(dto.getTelefone());
        if (dto.getEndereco() != null) paciente.setEndereco(dto.getEndereco());
        if (dto.getImgPerfil() != null) paciente.setImgPerfil(dto.getImgPerfil());
        if (dto.getSobreMim() != null) paciente.setSobreMim(dto.getSobreMim());
        if (dto.getMedicamentos() != null) paciente.setMedicamentos(dto.getMedicamentos());
        if (dto.getPreferencias() != null) paciente.setPreferencias(dto.getPreferencias());
    }

    public static PacienteCadastroResponseDTO toCadastroResponseDTO(Paciente paciente) {
    return new PacienteCadastroResponseDTO(
            paciente.getId(),
            paciente.getNome(),
            paciente.getEmail(),
            paciente.getLogin()
    );
}
    
}