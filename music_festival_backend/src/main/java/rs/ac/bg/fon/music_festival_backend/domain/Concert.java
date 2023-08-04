package rs.ac.bg.fon.music_festival_backend.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Concert {

    @Id
    @GeneratedValue
    private Long id;

    private String location;

    @ManyToOne
    private Band band;

    @OneToMany
    private List<Song> setlist;

}
