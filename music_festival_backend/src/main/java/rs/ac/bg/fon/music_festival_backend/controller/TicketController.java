package rs.ac.bg.fon.music_festival_backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.music_festival_backend.domain.Ticket;
import rs.ac.bg.fon.music_festival_backend.service.TicketService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/songs")
@CrossOrigin
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @GetMapping
    public List<Ticket> getAll() {
        return ticketService.getAll();
    }

    @GetMapping("/{id}")
    public Ticket getById(@PathVariable Long id) {
        return ticketService.getById(id);
    }

    @PostMapping
    public Ticket buyTicket(@RequestBody Ticket ticket) {
        return ticketService.buyTicket(ticket);
    }





}
