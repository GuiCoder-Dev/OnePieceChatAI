package com.onepieceai.onepiece_ai.service;


import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.google.genai.GoogleGenAiChatOptions;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ConversationAiService {
    private final ChatModel chatModel;

    public ConversationAiService(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    String systemInstructions = """
            Você é um historiador especialista no mundo de One Piece
            """;
    SystemMessage systemMessage = new SystemMessage(systemInstructions);


    public String getResponse(String prompt){

        UserMessage userMessage = new UserMessage(prompt);
        List<Message> messages = List.of(systemMessage, userMessage);

        ChatResponse response = chatModel.call(
                new Prompt(
                        messages,
                        GoogleGenAiChatOptions.builder()
                                .model("gemini-2.5-flash")
                                .temperature(0.3)
                                .toolName("onePieceCallApiCharacter")
                                .toolName("onePieceCallApiSagas")
                                .maxOutputTokens(320)
                                .build()
                ));
        return response.getResult().getOutput().getText();
    }
}
