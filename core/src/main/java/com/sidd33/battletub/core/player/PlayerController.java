package com.sidd33.battletub.core.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;

import com.sidd33.battletub.core.exception.InvalidInputException;
import com.sidd33.battletub.core.exception.NotFoundException;

@Controller
public class PlayerController {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private PlayerRepository playerRepository;

    @QueryMapping
    public Player playerById(@Argument String id) throws Exception {
        return playerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Player not found"));
    }

    @MutationMapping
    public Player createPlayer(@Argument String name, @Argument String password) throws Exception {  
        if (playerRepository.findByName(name).isPresent()) {
            throw new InvalidInputException("Player with name already exist");
        }

        Player player = Player.builder()
                .name(name)
                .password(passwordEncoder.encode(password))
                .build();

       return playerRepository.save(player);
    }

    @QueryMapping
    @Secured("ROLE_USER")
    public Player profile(@AuthenticationPrincipal Player player) {
        return player;
    }
}
