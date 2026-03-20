export default function InfosGerais({ formData, handleChange }) {

    const formatarData = (dtNascimento) => {
        if (!dtNascimento) return "";

        // Jackson serializa LocalDate como array [ano, mes, dia]
        if (Array.isArray(dtNascimento)) {
            const [ano, mes, dia] = dtNascimento;
            return `${ano}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
        }

        // Se já vier como string "2000-09-13"
        return dtNascimento;
    };

    return (
        <>
            <div className="container-input-1">
                <div className="input-e-span">
                    <span className="login-titulo">
                        <label htmlFor="nomeConfig">Nome</label>
                    </span>
                    <input
                        id="nomeConfig"
                        type="text"
                        className="form-control"
                        placeholder="Nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-e-span">
                    <span className="login-titulo">
                        <label htmlFor="sobrenomeEdit">Sobrenome</label>
                    </span>
                    <input
                        id="sobrenomeEdit"
                        type="text"
                        name="sobrenome"
                        className="form-control"
                        placeholder="Sobrenome"
                        value={formData.sobrenome}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-e-span">
                    <span className="login-titulo">
                        <label htmlFor="nascimentoEdit">Data de nascimento</label>
                    </span>
                    <input
                        id="nascimentoEdit"
                        type="date"
                        name="dtNascimento"
                        className="form-control"
                        placeholder="Data de nascimento"
                        value={formatarData(formData.dtNascimento)}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-e-span">
                    <span className="login-titulo">
                        <label htmlFor="telefoneEdit">Telefone</label>
                    </span>
                    <input
                        id="telefoneEdit"
                        type="text"
                        name="telefone"
                        className="form-control"
                        placeholder="Telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-e-span">
                    <span className="login-titulo">
                        <label htmlFor="cpfEdit">CPF</label>
                    </span>
                    <input
                        id="cpfEdit"
                        type="text"
                        name="CPF"
                        className="form-control"
                        placeholder="CPF"
                        value={formData.CPF}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-e-span">
                    <span className="login-titulo">
                        <label htmlFor="sexoEdit">Sexo</label>

                    </span>
                    <select
                        id="sexoEdit"
                        className="form-control"
                        name="sexo"
                        value={formData.sexo}
                        onChange={handleChange}
                    >
                        <option value="" disabled hidden>Escolher opções</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Outro">Outro</option>
                    </select>
                </div>

                <div className="input-e-span">
                    <span className="login-titulo">
                        <label htmlFor="cepEdit">CEP</label>
                    </span>
                    <input
                        id="cepEdit"
                        type="text"
                        name="cep"
                        className="form-control"
                        placeholder="00000-000"
                        value={formData.cep}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-e-span">
                    <span className="login-titulo">
                        <label htmlFor="bairroEdit">Bairro</label>
                    </span>
                    <input
                        id="bairroEdit"
                        type="text"
                        name="bairro"
                        className="form-control"
                        placeholder="Bairro"
                        value={formData.bairro}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-e-span">
                    <span className="login-titulo">
                        <label htmlFor="cidadeEdit">Cidade</label>
                    </span>
                    <input
                        id="cidadeEdit"
                        type="text"
                        name="cidade"
                        className="form-control"
                        placeholder="Cidade"
                        value={formData.cidade}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-e-span">
                    <span className="login-titulo">
                        <label htmlFor="ufEdit">UF</label>
                    </span>
                    <input
                        id="ufEdit"
                        type="text"
                        name="uf"
                        className="form-control"
                        placeholder="UF"
                        value={formData.uf}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </>
    );
}