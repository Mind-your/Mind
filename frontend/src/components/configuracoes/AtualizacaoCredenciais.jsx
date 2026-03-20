export default function AtualizacaoCredenciais({ formData, handleChange }) {
  return (
    <>
        <div className="container-input-2">
            <div className="input-e-span">
                <span className="login-titulo"><label>Nome do login</label></span>
                <input 
                    id="loginEdit" 
                    type="text"
                    name="login" 
                    className="form-control" 
                    placeholder="Login"
                    value={formData.login}
                    onChange={handleChange}
                />
            </div>
            <div className="input-e-span">
                <span className="login-titulo"><label>E-mail</label></span>
                <input 
                    id="emailEdit" 
                    type="email"
                    name="email"
                    className="form-control" 
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div className="input-e-span">
                <span className="login-titulo"><label>Nova Senha (deixe em branco para manter)</label></span>
                <input 
                    id="senhaEdit" 
                    type="password"
                    name="senha" 
                    className="form-control" 
                    placeholder="Nova senha"
                    value={formData.senha}
                    onChange={handleChange}
                />    
            </div>
        </div>
    </>
  )
}