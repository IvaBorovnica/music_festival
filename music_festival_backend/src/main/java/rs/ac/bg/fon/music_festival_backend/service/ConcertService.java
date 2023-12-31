package rs.ac.bg.fon.music_festival_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.music_festival_backend.domain.Concert;
import rs.ac.bg.fon.music_festival_backend.repository.ConcertRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ConcertService {

    private final ConcertRepository concertRepository;

    public Page<Concert> getAll(Pageable pageable) {
        return concertRepository.findAll(pageable);
    }

    public Concert getById(Long id) {
        return concertRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public Concert addConcert(Concert concert) {
        return concertRepository.save(concert);
    }
}
