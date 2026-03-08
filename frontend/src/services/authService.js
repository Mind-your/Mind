const API_URL = "http://localhost:8080";

export const authService = {

    // Login — chama o endpoint correto baseado no tipo
    async login(login, senha, tipo) {
        const endpoint = tipo === "psicologo" ? "/psicologos/login" : "/pacientes/login";

        const res = await fetch(`${API_URL}${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ login, senha }),
        });

        if (!res.ok) {
            throw new Error("Login ou senha inválidos");
        }

        const data = await res.json();
        // data = { token, type, username, tipo }

        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("tipo", data.tipo);

        return data;
    },

    // Busca dados completos do usuário após o login
    async getUserData(username, tipo) {
        const token = this.getToken();
        const endpoint = tipo === "psicologo" ? "psicologos" : "pacientes";

        const res = await fetch(`${API_URL}/${endpoint}/login/${username}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) throw new Error("Erro ao buscar dados do usuário");

        const data = await res.json();
        return { ...data, tipo };
    },

    // Cadastrar paciente
    async registerPaciente(userData) {
        const res = await fetch(`${API_URL}/pacientes/cadastrar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!res.ok) throw new Error("Erro ao cadastrar paciente");
        return res.json();
    },

    // Cadastrar psicólogo
    async registerPsicologo(userData) {
        const res = await fetch(`${API_URL}/psicologos/cadastrar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!res.ok) throw new Error("Erro ao cadastrar psicólogo");
        return res.json();
    },

    // Cadastrar voluntário
    async registerVoluntario(userData) {
        const res = await fetch(`${API_URL}/voluntarios/cadastrar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!res.ok) throw new Error("Erro ao cadastrar voluntário");
        return res.json();
    },

    // Logout
    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("tipo");
        localStorage.removeItem("user");
    },

    // Verificar se está autenticado
    isAuthenticated() {
        return !!this.getToken();
    },

    // Getters
    getToken() {
        return localStorage.getItem("token");
    },

    getUsername() {
        return localStorage.getItem("username");
    },

    getTipo() {
        return localStorage.getItem("tipo");
    },

    // Requisição autenticada
    async authenticatedFetch(url, options = {}) {
        const token = this.getToken();

        if (!token) {
            throw new Error("Não autenticado");
        }

        const headers = {
            ...options.headers,
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        };

        const res = await fetch(url, { ...options, headers });

        if (res.status === 401) {
            this.logout();
            throw new Error("Sessão expirada. Faça login novamente.");
        }

        return res;
    },
};