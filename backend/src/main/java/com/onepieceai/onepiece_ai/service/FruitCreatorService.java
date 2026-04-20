package com.onepieceai.onepiece_ai.service;

import com.onepieceai.onepiece_ai.Enum.FruitType;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.google.genai.GoogleGenAiChatOptions;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class FruitCreatorService {

   private final ChatModel chatModel;

    public FruitCreatorService(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String createFruit(FruitType fruitType, String power) {

        String template = """
            Você vai criar uma Akuma no Mi (universo de One Piece) para o usuário.
            Crie uma Akuma no Mi do tipo {type}
            que tenha esse poder {power}.
            Retorne diretamente o nome da fruta e o que ela faz, sem enrolação
            """;

        PromptTemplate promptTemplate = new PromptTemplate(template);

        Map<String, Object> params = Map.of(
                "type", fruitType.getName(),
                "power", power
        );

        var options = GoogleGenAiChatOptions.builder()
                .model("gemini-2.5-flash")
                .temperature(0.2)
                .maxOutputTokens(750)
                .build();

        Prompt prompt = promptTemplate.create(params, options);

        ChatResponse response = chatModel.call(prompt);

        return response.getResult().getOutput().getText();
    }

}
