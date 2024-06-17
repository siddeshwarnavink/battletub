package com.sidd33.battletub.core.game;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class GameControllerTest {
    @InjectMocks
    private GameController gameController;

    @Test
    void shouldMovePlayerWhenMovePlayerRequestWasMade() {
        Position2D position = new Position2D();
        position.setX(30.3f);
        position.setX(12.5f);

        Position2D response = gameController.movePlayer(position);
        assertEquals(response, position);
    }
}
