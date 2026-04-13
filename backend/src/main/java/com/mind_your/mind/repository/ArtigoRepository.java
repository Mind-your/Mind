package com.mind_your.mind.repository;

import com.mind_your.mind.models.Artigo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArtigoRepository extends MongoRepository<Artigo, String> {
    List<Artigo> findByPsicologoId(String psicologoId);
    List<Artigo> findByPublicadoTrue();
    List<Artigo> findByPsicologoIdAndPublicadoTrue(String psicologoId);
}
