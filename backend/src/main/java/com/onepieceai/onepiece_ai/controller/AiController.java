package com.onepieceai.onepiece_ai.controller;

import com.onepieceai.onepiece_ai.Enum.FruitType;
import com.onepieceai.onepiece_ai.service.CharacterDynamicConversationService;
import com.onepieceai.onepiece_ai.service.ConversationAiService;
import com.onepieceai.onepiece_ai.service.FruitCreatorService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("ai")
public class AiController {

    private final ConversationAiService conversationAiService;
    private final CharacterDynamicConversationService characterDynamicConversationService;
    private final FruitCreatorService fruitCreatorService;

    public AiController(ConversationAiService conversationAiService, CharacterDynamicConversationService characterDynamicConversationService, FruitCreatorService fruitCreatorService) {
        this.conversationAiService = conversationAiService;
        this.characterDynamicConversationService = characterDynamicConversationService;
        this.fruitCreatorService = fruitCreatorService;
    }

    @GetMapping("normal-conversations")
    public String conversations(@RequestParam String prompt) {
        return conversationAiService.getResponse(prompt);
    }

    @GetMapping("character-conversations")
    public String characterConversation(@RequestParam String prompt, @RequestParam(defaultValue = "Luffy") String choiceCharacter){
        return characterDynamicConversationService.conversationDynamicCharacter(prompt, choiceCharacter);
    }

    @GetMapping("create-fruit")
    public String createFruit(@RequestParam FruitType fruitType, @RequestParam String power){
        return fruitCreatorService.createFruit(fruitType, power);
    }

}
