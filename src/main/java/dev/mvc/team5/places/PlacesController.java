package dev.mvc.team5.places;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/places")
@RequiredArgsConstructor
public class PlacesController {

    private final PlacesService placesService;

    // 등록
    @PostMapping
    public ResponseEntity<?> create(@RequestBody PlacesDTO dto) {
        Places saved = placesService.save(dto);
        return ResponseEntity.ok(saved);
    }

    // 전체 조회
    @GetMapping
    public ResponseEntity<List<Places>> listAll() {
        return ResponseEntity.ok(placesService.findAll());
    }

    // 단건 조회
    @GetMapping("/{id}")
    public ResponseEntity<?> read(@PathVariable Long id) {
        return placesService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    // 수정
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody PlacesDTO dto) {
        return ResponseEntity.ok(placesService.update(id, dto));

    }
//    /**
//     * 강의실 수정
//     * PUT /places/{placeno}
//     */
//    @PutMapping("/{placeno}")
//    public ResponseEntity<Places> update(@PathVariable Long placeno,
//                                         @RequestBody Places places) {
//        places.setPlaceno(placeno); // ID 설정
//        Places updated = placesService.update(places);
//        return ResponseEntity.ok(updated);
//>>>>>>> d84a898d99543eab75b87ee034a50c7cec714df6
//    }

    // 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        placesService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    // 키워드 검색 (예: placename에 특정 글자가 포함된 강의실 조회)
    @GetMapping("/search")
    public ResponseEntity<List<Places>> search(@RequestParam String keyword) {
        return ResponseEntity.ok(placesService.searchByPlacename(keyword));
    }

    // 특정 학교관에 속한 강의실만 조회
    @GetMapping("/schoolgwan/{schoolgwanno}")
    public ResponseEntity<List<Places>> listBySchoolGwan(@PathVariable Long schoolgwanno) {
        return ResponseEntity.ok(placesService.findBySchoolGwanNo(schoolgwanno));
    }
    
}
