package com.sidd33.battletub.core.authentication;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Collection;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class JwtAuthenticationFilterTest {
    @Mock
    private HttpServletRequest request;
    @Mock
    private HttpServletResponse response;
    @Mock
    private FilterChain filterChain;
    @Mock
    private JwtService jwtService;
    @Mock
    private UserDetailsService userDetailsService;
    @InjectMocks
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Test
    void shouldPassFilterIfNoAuthHeaderPresent() {
        when(request.getHeader("Authorization")).thenReturn(null);

        assertDoesNotThrow(() -> jwtAuthenticationFilter.doFilter(request, response, filterChain));
        assertDoesNotThrow(() -> verify(filterChain, times(1)).doFilter(request, response));
    }

    @Test
    void shouldAuthenticateIfValidTokenProvided() {
        UserDetails userDetails = new UserDetails() {
            @Override
            public String getUsername() {
                return "sid";
            }

            @Override
            public String getPassword() {
                return "test123";
            }

            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return List.of(new SimpleGrantedAuthority("ROLE_USER"));
            }
        };

        when(request.getHeader("Authorization")).thenReturn("Bearer xxx");
        when(jwtService.extractUsername("xxx")).thenReturn("sid");
        when(userDetailsService.loadUserByUsername("sid")).thenReturn(userDetails);
        when(jwtService.isTokenValid("xxx", userDetails)).thenReturn(true);

        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(null);
        SecurityContextHolder.setContext(securityContext);

        assertDoesNotThrow(() -> jwtAuthenticationFilter.doFilter(request, response, filterChain));
        assertDoesNotThrow(() -> verify(securityContext, times(1)).getAuthentication());
        assertDoesNotThrow(() -> verify(userDetailsService, times(1)).loadUserByUsername("sid"));
        assertDoesNotThrow(() -> verify(jwtService, times(1)).isTokenValid("xxx", userDetails));
        assertDoesNotThrow(() -> verify(securityContext, times(1)).setAuthentication(any()));
        assertDoesNotThrow(() -> verify(filterChain, times(1)).doFilter(request, response));
    }
}
