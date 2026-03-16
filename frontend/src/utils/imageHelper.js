const API_URL = "http://localhost:8080";

// Imagem SVG padrão em base64 como fallback absoluto
const DEFAULT_AVATAR_BASE64 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNlMGUwZTAiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iNDAiIGZpbGw9IiM5OTkiLz48ZWxsaXBzZSBjeD0iMTAwIiBjeT0iMTYwIiByeD0iNjAiIHJ5PSI0MCIgZmlsbD0iIzk5OSIvPjwvc3ZnPg==";

/**
 * Retorna a URL completa para uma imagem de perfil
 * @param {string} imgPerfil - Nome do arquivo (ex: "perfil-snoopy.png")
 * @returns {string} URL completa da imagem
 */
export function getImageUrl(imgPerfil) {
    // Se não houver imagem ou for string vazia, retorna imagem padrão do servidor
    if (!imgPerfil || imgPerfil.trim() === "" || imgPerfil === "null" || imgPerfil === "undefined") {
        return `${API_URL}/api/images/default`;
    }

    // Se já for uma URL completa, retorna como está
    if (imgPerfil.startsWith('http://') || imgPerfil.startsWith('https://')) {
        return imgPerfil;
    }

    // Se for um blob URL (preview local), retorna como está
    if (imgPerfil.startsWith('blob:')) {
        return imgPerfil;
    }

    // Se for data URL (base64), retorna como está
    if (imgPerfil.startsWith('data:')) {
        return imgPerfil;
    }

    // Retorna a URL do endpoint de imagens
    return `${API_URL}/api/images/${imgPerfil}`;
}

/**
 * Retorna a imagem padrão em base64 (nunca falha)
 * @returns {string} Data URL da imagem padrão
 */
export function getDefaultAvatar() {
    return DEFAULT_AVATAR_BASE64;
}

/**
 * Retorna a URL para upload de imagem
 * @param {string} id - ID do usuário
 * @param {string} tipo - Tipo do usuário ("paciente" ou "psicologo")
 * @returns {string} URL do endpoint de upload
 */
export function getUploadUrl(id, tipo) {
    const endpoint = tipo === "psicologo" ? "psicologos" : "pacientes";
    return `${API_URL}/${endpoint}/${id}/imagem`;
}

/**
 * Handler para erro de imagem (usa como onError)
 * @param {Event} e - Evento de erro da imagem
 */
export function handleImageError(e) {
    console.warn('Erro ao carregar imagem, usando default');
    e.target.src = getDefaultAvatar();
    e.target.onerror = null;
}