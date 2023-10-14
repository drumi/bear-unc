package com.example.bear.controllers;

import com.example.bear.dto.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class HomeController {

    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public Message message(Message message) {
        return new Message(
            HtmlUtils.htmlEscape(message.getMessage())
        );
    }
}
