package dev.mvc.team5.places;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/places")
@RequiredArgsConstructor
public class PlacesController {

    private final PlacesService placesService;

    /**
     * 강의실 등록
     * POST /places
     */
    @PostMapping("")
    public ResponseEntity<Places> create(@RequestBody Places places) {
        Places saved = placesService.create(places);
        return ResponseEntity.ok(saved);
    }

    /**
     * 특정 강의실 조회
     * GET /places/{placeno}
     */
    @GetMapping("/{placeno}")
    public ResponseEntity<Places> read(@PathVariable Long placeno) {
        Optional<Places> placeOpt = placesService.read(placeno);
        return placeOpt.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
    }

    /**
     * 전체 강의실 목록 조회
     * GET /places
     */
    @GetMapping("")
    public ResponseEntity<List<Places>> listAll() {
        List<Places> placesList = placesService.listAll();
        return ResponseEntity.ok(placesList);
    }

    /**
     * 강의실 수정
     * PUT /places/{placeno}
     */
    @PutMapping("/{placeno}")
    public ResponseEntity<Places> update(@PathVariable Long placeno,
                                         @RequestBody Places places) {
        places.setPlace(placeno); // ID 설정
        Places updated = placesService.update(places);
        return ResponseEntity.ok(updated);
    }

    /**
     * 강의실 삭제
     * DELETE /places/{placeno}
     */
    @DeleteMapping("/{placeno}")
    public ResponseEntity<Void> delete(@PathVariable Long placeno) {
        placesService.delete(placeno);
        return ResponseEntity.noContent().build();
    }
}
