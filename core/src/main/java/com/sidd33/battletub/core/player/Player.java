package com.sidd33.battletub.core.player;

import java.util.Collection;
import java.util.List;

import com.sidd33.battletub.core.game.Position2D;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Player implements UserDetails {
    @Id
    private String id;
    private String name;
    private String password;
    @Builder.Default
    private Float score = 0f;
    @Builder.Default
    private Position2D position = new Position2D(4, 4);

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getUsername() {
        return name;
    }
}
