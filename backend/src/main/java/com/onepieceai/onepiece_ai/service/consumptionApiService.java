package com.onepieceai.onepiece_ai.service;

import com.onepieceai.onepiece_ai.service.dtos.CharacterRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class consumptionApiService {

    private final RestTemplate restTemplate;


    public consumptionApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String OnePieceApi(CharacterRequest request) {
        String url = "https://api.api-onepiece.com/v2/characters/en/search?name=" + request.name();
        try {
            Object response = restTemplate.getForObject(url, Object.class);
            return (response != null) ? response.toString() : "Personagem não encontrado";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

}
