package com.sidd33.battletub.core.authentication;

import com.sidd33.battletub.core.player.Player;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationResponse {
    private String token;
    private long expiresIn;
    private Player player;
}
