package rs.ac.bg.fon.music_festival_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.music_festival_backend.domain.Band;

@Repository
public interface BandRepository extends JpaRepository<Band, Long> {
}
