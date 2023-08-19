package rs.ac.bg.fon.music_festival_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.music_festival_backend.domain.Ticket;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository  extends JpaRepository<Ticket, Long> {
    Optional<Ticket> findByConcertIdAndBuyerId(Long id, Long id1);
    List<Ticket> findByBuyerId(Long id);
}
