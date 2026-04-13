package com.onepieceai.onepiece_ai.controller;

import com.onepieceai.onepiece_ai.service.ConversationAiService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("ai")
public class AiController {

    private final ConversationAiService conversationAiService;

    public AiController(ConversationAiService conversationAiService) {
        this.conversationAiService = conversationAiService;
    }

    @GetMapping("normal-conversations")
    public String conversations(@RequestParam String prompt) {
        return conversationAiService.getResponse(prompt);
    }

}
