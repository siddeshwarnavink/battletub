package com.sidd33.battletub.core.authentication;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.sidd33.battletub.core.exception.NotFoundException;
import com.sidd33.battletub.core.player.Player;
import com.sidd33.battletub.core.player.PlayerRepository;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class AuthenticationControllerTest {
    @Mock
    private PlayerRepository playerRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtService jwtService;
    @InjectMocks
    private AuthenticationController authenticationController;

    @Test
    public void shouldThrowExceptionIfInvalidNameInAuthentication() {
        doReturn(Optional.empty()).when(playerRepository).findByName(anyString());
        assertThrows(NotFoundException.class, () -> authenticationController.authenticate("sid", "sid"));
    }

    @Test
    public void shouldThrowExceptionIfInvalidPasswordInAuthentication() {
        final Player player = Player.builder()
            .name("sid")
            .password("sid")
            .build();

        doReturn(Optional.of(player)).when(playerRepository).findByName(anyString());
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(false);

        assertThrows(NotFoundException.class, () -> authenticationController.authenticate("sid", "sid"));
    }

    @Test
    public void shouldGenerateJwtIfValidCredentialsAreProvided() {
        final Player player = Player.builder()
            .name("sid")
            .password("sid")
            .build();

        doReturn(Optional.of(player)).when(playerRepository).findByName(anyString());
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);

        assertDoesNotThrow(() -> authenticationController.authenticate("sid", "sid"));
        verify(jwtService, times(1)).generateToken(any());
    }

}
