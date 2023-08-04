package rs.ac.bg.fon.music_festival_backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Entity

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Song {

    @Id
    @GeneratedValue
    private Long id;

    private String title;

    private Integer length;

    @ManyToOne
    private Band band;

}
