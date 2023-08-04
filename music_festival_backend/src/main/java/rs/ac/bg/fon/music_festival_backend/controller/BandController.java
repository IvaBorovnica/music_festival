package rs.ac.bg.fon.music_festival_backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.music_festival_backend.domain.Band;
import rs.ac.bg.fon.music_festival_backend.domain.Song;
import rs.ac.bg.fon.music_festival_backend.service.BandService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bands")
@CrossOrigin
@RequiredArgsConstructor
public class BandController {

    private final BandService bandService;

    @GetMapping
    public List<Band> getAll() {
        return bandService.getAll();
    }

    @GetMapping("/{id}")
    public Band getById(@PathVariable Long id) {
        return bandService.getById(id);
    }

    @PostMapping
    public Band addBand(@RequestBody Band band) {
        return bandService.addBand(band);
    }

    @GetMapping("/{bandId}/songs")
    public List<Song> getSongs(@PathVariable Long bandId) {
        return bandService.getSongs(bandId);
    }



}
