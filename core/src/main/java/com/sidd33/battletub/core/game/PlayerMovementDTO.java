package com.sidd33.battletub.core.game;

import lombok.Data;

@Data
public class PlayerMovementDTO {
    private String playerId;
    private Position2D position;
}
