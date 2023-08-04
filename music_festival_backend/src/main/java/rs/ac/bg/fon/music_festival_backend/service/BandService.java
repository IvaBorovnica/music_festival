package rs.ac.bg.fon.music_festival_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.music_festival_backend.domain.Band;
import rs.ac.bg.fon.music_festival_backend.domain.Song;
import rs.ac.bg.fon.music_festival_backend.repository.BandRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class BandService {

    private final BandRepository bandRepository;
    private final SongService songService;

    public List<Band> getAll() {
        return bandRepository.findAll();
    }

    public Band getById(Long id) {
        return bandRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public Band addBand(Band band) {
        return bandRepository.save(band);
    }

    public List<Song> getSongs(Long bandId) {
        Band band = getById(bandId);
        return songService.getAll()
                .stream()
                .filter(song -> song.getBand().equals(band))
                .toList();
    }
}
