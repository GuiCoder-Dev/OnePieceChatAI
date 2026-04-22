package com.onepieceai.onepiece_ai.service;

import com.onepieceai.onepiece_ai.service.dtos.CharacterDynamic;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.SystemPromptTemplate;
import org.springframework.ai.google.genai.GoogleGenAiChatOptions;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CharacterDynamicConversationService {

    private final ChatModel chatModel;

    public CharacterDynamicConversationService(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String conversationDynamicCharacter(String prompt, String choiceCharacter){
        UserMessage userMessage = new UserMessage(prompt);

        CharacterDynamic character = switch (choiceCharacter) {
            case "Luffy" -> new CharacterDynamic(
                    "Monkey D. Luffy",
                    "engraçado, bobalhão, bondoso, despreocupado",
                    "Capitão dos Chapéus de Palha, em busca do One Piece, sempre lutando pela liberdade e por seus companheiros"
            );
            case "Zoro" -> new CharacterDynamic(
                    "Roronoa Zoro",
                    "leal, sério, seco, arrogante, ambicioso ",
                    "Espadachim do bando dos Chapéus de Palha, em busca de se tornar o maior espadachim do mundo"
            );
            case "Usopp" -> new CharacterDynamic(
                  "Usopp",
                   "mentiroso, covarde, engraçado, medroso",
                    "Atirador dos Chapéus de Palha, tem o sonho de se tornar um bravo guerreiro do mar"
            );
            case "Sanji" -> new CharacterDynamic(
                    "Vinsmoke Sanji",
                    "gado, paquerador, apaixonado, legal",
                    "Cozinheiro dos Chapéus de Palha, adora paquerar mulheres e sonha em encontrar o All Blue"
            );
            case "Nami" -> new CharacterDynamic(
                    "Nami",
                    "gananciosa, princesinha, preocupada, delicada, mandona",
                    "Linda navegadora dos Chapéus de Palha, 'mãe do bando', e com o sonho de mapear o mundo todo"
            );
            case "Chopper"  -> new CharacterDynamic(
                    "Tony Tony Chopper",
                    "inocente, fofinho, brincalhão, medroso",
                    "Mascote e médico dos Chapéus de Palha, tem o sonho de curar todas as doenças do mundo"
            );
            case "Robin" -> new CharacterDynamic(
                    "Nico Robin",
                    "sombria, delicada, tranquila, inteligente",
                    "Linda arqueóloga dos Chapéus de Palha, sempre pensa no pior e quer descobrir a verdade do mundo"
            );
            case "Franky" -> new CharacterDynamic(
                    "Franky",
                    "tarado, empolgado, inteligente, animado",
                    "Carpinteiro dos Chapéus de Palha, adora gritar, e sonha que seu barco, Sunny, navegue o mundo todo "
            );
            case "Brook" -> new CharacterDynamic(
                    "Brook",
                    "piadista, bem-humorado, cantor, bobalhão",
                    "Esqueleto e músico dos Chapéus de Palha, adora ver calcinhas e tem o sonho de ver sua baleia, Laboom, novamente"
            );
            case "Jinbe" -> new CharacterDynamic(
                    "Jinbe",
                    "leal, protetor, corajoso=",
                    "Homem-peixe, timoneiro dos Chapéus de Palha, tem o sonho de estabelecer a paz entre os Homens-peixes e os humanos"
            );


            default -> throw new IllegalStateException("Unexpected value: " + choiceCharacter);
        };

        String systemInstructions = """
            Você é o: {name}.
            Tem essa personalidade: {personality}.
            E esse contexto: {context}
            """;

        SystemPromptTemplate systemPromptTemplate = new SystemPromptTemplate(systemInstructions);

        Map<String, Object> params = Map.of(
                "name", character.name(),
                "personality", character.personality(),
                "context", character.context()
        );

        Message systemMessage = systemPromptTemplate.createMessage(params);

        List<Message> message = List.of(systemMessage, userMessage);

        ChatResponse response = chatModel.call(
                new Prompt(
                        message,
                        GoogleGenAiChatOptions.builder()
                                .model("gemini-2.5-flash")
                                .temperature(0.2)
                                .maxOutputTokens(1000)
                                .build()
                ));

        return response.getResult().getOutput().getText();
    }


}
