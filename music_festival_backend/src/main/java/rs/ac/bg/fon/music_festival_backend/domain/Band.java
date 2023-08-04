package rs.ac.bg.fon.music_festival_backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

@Entity

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Band {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private Integer formationYear;

    private String website;

}
