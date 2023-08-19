package rs.ac.bg.fon.music_festival_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.music_festival_backend.domain.Role;
import rs.ac.bg.fon.music_festival_backend.domain.User;
import rs.ac.bg.fon.music_festival_backend.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getCurrentlyLoggedInUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public Role getCurrentlyLoggedInRole() {
        return getCurrentlyLoggedInUser().getRole();
    }



}
