package rs.ac.bg.fon.music_festival_backend.domain;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    USER,
    ORGANIZER,
    ADMIN;

    @Override
    public String getAuthority() {
        return name();
    }
}
