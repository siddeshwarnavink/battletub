package com.sidd33.battletub.core.player;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.sidd33.battletub.core.exception.InvalidInputException;
import com.sidd33.battletub.core.exception.NotFoundException;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class PlayerControllerTest {
    @Mock
    private PlayerRepository playerRepository;
    @MockBean
    private PasswordEncoder passwordEncoder;
    @InjectMocks
    private PlayerController playerController;

    @Test
    public void shouldThrowExceptionIfPlayerWithIdNotFound() {
        final String playerId = "abc";

        doReturn(Optional.empty()).when(playerRepository).findById(playerId);

        assertThrows(NotFoundException.class, () -> playerController.playerById(playerId));
    }

    @Test
    public void shouldThrowExceptionIfNameAlreadyTakeInCreate() {
        final String name = "sidd33";

        doReturn(Optional.of(new Player())).when(playerRepository).findByName(name);

        assertThrows(InvalidInputException.class, () -> playerController.createPlayer(name, name));
        verify(playerRepository, never()).save(any());
    }

    @Test
    public void shouldSavePlayerIfNameIsNotTake() {
        final String name = "sidd33";

        doReturn(Optional.empty()).when(playerRepository).findByName(name);

        assertDoesNotThrow(() -> {
            playerController.createPlayer(name, name);
        });
        verify(passwordEncoder, times(1)).encode(any());
        verify(playerRepository, times(1)).save(any());
    }
}
