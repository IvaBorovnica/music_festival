package rs.ac.bg.fon.music_festival_backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.music_festival_backend.domain.Song;
import rs.ac.bg.fon.music_festival_backend.service.SongService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/songs")
@CrossOrigin
@RequiredArgsConstructor
public class SongController {

    private final SongService songService;

    @GetMapping
    public List<Song> getAll() {
        return songService.getAll();
    }

    @GetMapping("/{id}")
    public Song getById(@PathVariable Long id) {
        return songService.getById(id);
    }

    @PostMapping
    public Song addSong(@RequestBody Song song) {
        return songService.addSong(song);
    }
}
