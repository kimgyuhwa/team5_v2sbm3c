package dev.mvc.team5.places;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlacesServiceImpl implements PlacesService {

    private final PlacesRepository placesRepository;

    @Override
    public Places create(Places places) {
        return placesRepository.save(places);
    }

    @Override
    public Optional<Places> read(Long placeno) {
        return placesRepository.findById(placeno);
    }

    @Override
    public List<Places> listAll() {
        return placesRepository.findAll();
    }

    @Override
    public Places update(Places places) {
        return placesRepository.save(places);
    }

    @Override
    public void delete(Long placeno) {
        placesRepository.deleteById(placeno);
    }
}
