package dev.mvc.team5.talents;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/talent")
public class TalentController {

    @Autowired
    private TalentService service;

    /** 
     * 등록(Create)
     * @param entity 등록할 Talent 객체
     * @return 저장된 Talent 객체
     */
    @PostMapping("/save")
    public ResponseEntity<Talent> createTalent(@RequestBody Talent entity) {
        Talent saved = service.save(entity);
        return ResponseEntity.ok(saved);
    }

    /** 
     * 전체 조회(Read)
     * @return Talent 전체 목록
     */
    @GetMapping("/list")
    public ResponseEntity<List<Talent>> getAllTalents() {
        List<Talent> list = service.findAll();
        return ResponseEntity.ok(list);
    }

    /** 
     * 단건 조회(Read)
     * @param talentno 재능 고유번호
     * @return 해당 Talent 객체
     */
    @GetMapping("/{talentno}")
    public ResponseEntity<Talent> getTalent(@PathVariable Long talentno) {
        Optional<Talent> optionalTalent = service.findById(talentno);

        if (optionalTalent.isPresent()) {
            return ResponseEntity.ok(optionalTalent.get());
        } else {
            return ResponseEntity.notFound().build(); // 404 응답
        }
    }

    
    

    /** 
     * 수정(Update)
     * @param entity 수정할 Talent 객체
     * @return 수정된 Talent 객체
     */
    @PutMapping("/update")
    public ResponseEntity<Talent> updateTalent(@RequestBody Talent entity) {
        Talent updated = service.save(entity); // save로 처리 가능
        return ResponseEntity.ok(updated);
    }

    /** 
     * 삭제(Delete)
     * @param talentno 삭제할 재능 고유번호
     * @return 상태 메시지
     */
    @DeleteMapping("/delete/{talentno}")
    public ResponseEntity<String> deleteTalent(@PathVariable Long talentno) {
        service.delete(talentno);
        return ResponseEntity.ok("삭제 완료");
    }
}
