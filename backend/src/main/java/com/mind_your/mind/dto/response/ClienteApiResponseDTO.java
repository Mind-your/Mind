package com.mind_your.mind.dto.response;

import com.mind_your.mind.models.Endereco;

public class ClienteApiResponseDTO {
    private String status;
    private Endereco data;
    private String message;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Endereco getData() {
        return data;
    }

    public void setData(Endereco data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
