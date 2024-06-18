package com.sidd33.battletub.core.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.sidd33.battletub.core.exception.NotFoundException;
import com.sidd33.battletub.core.player.Player;
import com.sidd33.battletub.core.player.PlayerRepository;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {
    @Autowired
    private PlayerRepository playerRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @QueryMapping
    public AuthenticationResponse authenticate(@Argument String name, @Argument String password) throws Exception {
        final String errorMessage = "Invalid name or password";

        UserDetails authenticatedUser = playerRepository.findByName(name)
                .orElseThrow(() -> new NotFoundException(errorMessage));
        if(!passwordEncoder.matches(password, authenticatedUser.getPassword())) {
            throw new NotFoundException(errorMessage);
        }

        String jwtToken = jwtService.generateToken(authenticatedUser);

        AuthenticationResponse response = AuthenticationResponse.builder()
                .token(jwtToken)
                .player((Player) authenticatedUser)
                .build();
        return response;
    }
}
