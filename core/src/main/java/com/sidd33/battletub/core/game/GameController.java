package com.sidd33.battletub.core.game;

import com.sidd33.battletub.core.exception.NotFoundException;
import com.sidd33.battletub.core.player.Player;
import com.sidd33.battletub.core.player.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GameController {
    @Autowired
    private PlayerRepository playerRepository;

    @MessageMapping("/game.movePlayer")
    @SendTo("/topic/public")
    public Position2D movePlayer(@Payload PlayerMovementDTO data) throws Exception {
        Player player = playerRepository.findById(data.getPlayerId())
                .orElseThrow(() -> new NotFoundException("Player with ID not found"));
        player.setPosition(data.getPosition());
        playerRepository.save(player);

        return player.getPosition();
    }
}
