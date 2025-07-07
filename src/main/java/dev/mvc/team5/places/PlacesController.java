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

    @GetMapping("/{placeno}")
    public ResponseEntity<PlacesDTO> read(@PathVariable(name="placeno") Long placeno) {
        return placesService.findByPlaceno(placeno)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }



    // 수정
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody PlacesDTO dto) {
        return ResponseEntity.ok(placesService.update(id, dto));
    }


    // 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        placesService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    // 키워드 검색 (예: placename에 특정 글자가 포함된 강의실 조회)
    @GetMapping("/search")
    public ResponseEntity<List<Places>> search(@RequestParam(name="keyword") String keyword) {
        return ResponseEntity.ok(placesService.searchByPlacename(keyword));
    }

    // 특정 학교관에 속한 강의실만 조회
    @GetMapping("/schoolgwan/{schoolgwanno}")
    public ResponseEntity<List<PlacesDTO>> listBySchoolGwan(@PathVariable(name="schoolgwanno") Long schoolgwanno) {
        return ResponseEntity.ok(placesService.findBySchoolGwanNo(schoolgwanno));
    }
    
    // 1) 특정 학교의 모든 장소 조회
    @GetMapping("/list-by-school/{schoolno}")
    public ResponseEntity<List<PlacesDTO>> getPlacesBySchool(@PathVariable(name="schoolno") Long schoolno) {
        List<PlacesDTO> list = placesService.findBySchoolno(schoolno);
        return ResponseEntity.ok(list);
    }

    
    // 2) 특정 학교의 특정 관(SchoolGwan)에 속한 장소만 조회
    @GetMapping("/list-by-school-and-gwan")
    public ResponseEntity<List<PlacesDTO>> getPlacesBySchoolAndGwan(
            @RequestParam(name = "schoolno") Long schoolno,
            @RequestParam(name = "schoolgwanno") Long schoolgwanno) {
        
        List<PlacesDTO> list = placesService.findBySchoolnoAndSchoolgwanno(schoolno, schoolgwanno);
        return ResponseEntity.ok(list);
    }
    
}
