package rs.ac.bg.fon.music_festival_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.music_festival_backend.domain.Song;
import rs.ac.bg.fon.music_festival_backend.repository.SongRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class SongService {

    private final SongRepository songRepository;


    public List<Song> getAll() {
        return songRepository.findAll();
    }

    public Song getById(Long id) {
        return songRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public Song addSong(Song song) {
        return songRepository.save(song);
    }
}
