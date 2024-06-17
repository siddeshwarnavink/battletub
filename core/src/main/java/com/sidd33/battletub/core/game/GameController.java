package com.sidd33.battletub.core.game;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GameController {
    @MessageMapping("/game.movePlayer")
    @SendTo("/topic/public")
    public Position2D movePlayer(@Payload Position2D position) {
        return position;
    }
}
