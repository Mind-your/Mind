package com.mind_your.mind.security;

import com.mind_your.mind.models.Paciente;
import com.mind_your.mind.models.Psicologo;
import com.mind_your.mind.repository.PacienteRepository;
import com.mind_your.mind.repository.PsicologoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Collections;
import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private PsicologoRepository psicologoRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Tenta buscar como email ou login nos pacientes
        Optional<Paciente> pacienteOpt = pacienteRepository.findByLogin(username);
        if (pacienteOpt.isEmpty()) {
            pacienteOpt = pacienteRepository.findByEmail(username);
        }


        if (pacienteOpt.isPresent()) {
            Paciente paciente = pacienteOpt.get();
            return org.springframework.security.core.userdetails.User
                    .withUsername(paciente.getLogin())
                    .password(paciente.getSenha())
                    .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_PACIENTE")))
                    .build();
        }

        // Tenta buscar como email ou login nos psicólogos
        Optional<Psicologo> psicologoOpt = psicologoRepository.findByLogin(username);
        if (psicologoOpt.isEmpty()) {
            psicologoOpt = psicologoRepository.findByEmail(username);
        }

        if (psicologoOpt.isPresent()) {
            Psicologo psicologo = psicologoOpt.get();
            return org.springframework.security.core.userdetails.User
                    .withUsername(psicologo.getLogin())
                    .password(psicologo.getSenha())
                    .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_PSICOLOGO")))
                    .build();
        }

        throw new UsernameNotFoundException("Usuário não encontrado: " + username);
    }
}