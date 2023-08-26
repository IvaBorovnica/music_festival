package rs.ac.bg.fon.music_festival_backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.music_festival_backend.domain.Concert;
import rs.ac.bg.fon.music_festival_backend.service.ConcertService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/concerts")
@CrossOrigin
@RequiredArgsConstructor
public class ConcertController {

    private final ConcertService concertService;

    @GetMapping
    public Page<Concert> getAll(Pageable pageable) {
        return concertService.getAll(pageable);
    }

    @GetMapping("/{id}")
    public Concert getById(@PathVariable Long id) {
        return concertService.getById(id);
    }
    @PostMapping
    public Concert addConcert(@RequestBody Concert concert) {
        return concertService.addConcert(concert);
    }


}
