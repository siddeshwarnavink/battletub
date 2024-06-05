package com.sidd33.battletub.core.player;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.Data;

@Document
@Data
@Builder
public class Player {
    @Id
    private String id;
    private String name;
    private String password;
    @Builder.Default
    private Float score = 0f;
}
