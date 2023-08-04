package rs.ac.bg.fon.music_festival_backend.auth;

import lombok.*;
import rs.ac.bg.fon.music_festival_backend.domain.Role;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class AuthenticationResponse {

  private String token;
  private Role role;
}
