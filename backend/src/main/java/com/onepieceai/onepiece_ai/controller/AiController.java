package com.onepieceai.onepiece_ai.controller;

import com.onepieceai.onepiece_ai.service.CharacterDynamicConversationService;
import com.onepieceai.onepiece_ai.service.ConversationAiService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("ai")
public class AiController {

    private final ConversationAiService conversationAiService;
    private final CharacterDynamicConversationService characterDynamicConversationService;

    public AiController(ConversationAiService conversationAiService, CharacterDynamicConversationService characterDynamicConversationService) {
        this.conversationAiService = conversationAiService;
        this.characterDynamicConversationService = characterDynamicConversationService;
    }

    @GetMapping("normal-conversations")
    public String conversations(@RequestParam String prompt) {
        return conversationAiService.getResponse(prompt);
    }

    @GetMapping("character-conversations")
    public String characterConversation(@RequestParam String prompt, @RequestParam(defaultValue = "Luffy") String choiceCharacter){
        return characterDynamicConversationService.conversationDynamicCharacter(prompt, choiceCharacter);
    }

}
