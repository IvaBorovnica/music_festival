package rs.ac.bg.fon.music_festival_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.music_festival_backend.domain.Concert;
import rs.ac.bg.fon.music_festival_backend.domain.Role;
import rs.ac.bg.fon.music_festival_backend.domain.Ticket;
import rs.ac.bg.fon.music_festival_backend.domain.User;
import rs.ac.bg.fon.music_festival_backend.repository.TicketRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final ConcertService concertService;
    private final TicketRepository ticketRepository;
    private final UserService userService;

    public List<Ticket> getAll() {
        Role currentlyLoggedInRole = userService.getCurrentlyLoggedInRole();
        if (currentlyLoggedInRole.equals(Role.ADMIN) || currentlyLoggedInRole.equals(Role.ORGANIZER)) {
            return ticketRepository.findAll();
        }
        return ticketRepository.findByBuyerId(userService.getCurrentlyLoggedInUser().getId());
    }

    public Ticket getById(Long id) {
        Role currentlyLoggedInRole = userService.getCurrentlyLoggedInRole();
        User currentlyLoggedInUser = userService.getCurrentlyLoggedInUser();
        Ticket ticket = ticketRepository.findById(id).orElseThrow(NoSuchElementException::new);
        if (currentlyLoggedInRole.equals(Role.USER) && !ticket.getBuyer().equals(currentlyLoggedInUser)) {
            throw new IllegalStateException("User " + currentlyLoggedInUser + " is not the buyer of that ticket");
        }
        return ticket;
    }

    public Ticket buyTicket(Ticket ticket) {
        Concert concert = concertService.getById(ticket.getConcert().getId());
        ticket.setPrice(concert.getPrice());
        User currentlyLoggedInUser = userService.getCurrentlyLoggedInUser();
        ticket.setBuyer(currentlyLoggedInUser);
        if (userAlreadyHasTicket(currentlyLoggedInUser, ticket.getConcert())) {
            throw new IllegalStateException("User already has a Ticket for that concert");
        }
        return ticketRepository.save(ticket);
    }

    private boolean userAlreadyHasTicket(User user, Concert concert) {
        return ticketRepository.findByConcertIdAndBuyerId(concert.getId(), user.getId()).isPresent();
    }
}
