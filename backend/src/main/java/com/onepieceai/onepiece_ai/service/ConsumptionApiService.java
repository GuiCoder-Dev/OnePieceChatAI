package com.onepieceai.onepiece_ai.service;

import com.onepieceai.onepiece_ai.service.dtos.CharacterRequest;
import com.onepieceai.onepiece_ai.service.dtos.SagaRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ConsumptionApiService {

    private final RestTemplate restTemplate;


    public ConsumptionApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String OnePieceApiCharacter(CharacterRequest request) {
        String url = "https://api.api-onepiece.com/v2/characters/en/search?name=" + request.name();
        try {
            Object response = restTemplate.getForObject(url, Object.class);
            return (response != null) ? response.toString() : "Personagem não encontrado";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    public String OnePieceApiSagas(SagaRequest request) {
        String url = "https://api.api-onepiece.com/v2/sagas/en/search?title=" + request.saga();
        try {
            Object response = restTemplate.getForObject(url, Object.class);
            return (response != null) ? response.toString() : "Saga não encontrada";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }


}
