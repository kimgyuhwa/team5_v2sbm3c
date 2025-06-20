package dev.mvc.team5.talents;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import dev.mvc.team5.talents.talentdto.TalentCreateDTO;
import dev.mvc.team5.talents.talentdto.TalentListDTO;
import dev.mvc.team5.talents.talentdto.TalentResponseDTO;
import dev.mvc.team5.talents.talentdto.TalentUpdateDTO;
import jakarta.servlet.http.HttpSession;

import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<TalentResponseDTO> createTalent(@RequestBody TalentCreateDTO dto) {
        TalentResponseDTO savedDto = service.save(dto);
        return ResponseEntity.ok(savedDto);
    }


    /** 
     * 전체 조회(Read)
     * @return Talent 전체 목록
     */
    @GetMapping("/list")
    public ResponseEntity<List<TalentListDTO>> getAllTalents() {
        List<TalentListDTO> list = service.findAll();
        return ResponseEntity.ok(list);
    }

    /** 
     * 단건 조회(Read)
     * @param talentno 재능 고유번호
     * @return 해당 Talent 객체
     */
    @GetMapping("/{talentno}")
    public ResponseEntity<TalentResponseDTO> getTalent(@PathVariable(name="talentno") Long talentno) {
        Optional<TalentResponseDTO> optionalDto = service.findById(talentno);

        if (optionalDto.isPresent()) {
            return ResponseEntity.ok(optionalDto.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    
    

    /** 
     * 수정(Update)
     * @param entity 수정할 Talent 객체
     * @return 수정된 Talent 객체
     */
    @PutMapping("/update")
    public ResponseEntity<TalentResponseDTO> updateTalent(
            @RequestBody TalentUpdateDTO dto,
            HttpSession session) {

        Long loggedInUserNo = (Long) session.getAttribute("userno");

        if (loggedInUserNo == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        TalentResponseDTO updatedDto = service.update(dto, loggedInUserNo);
        return ResponseEntity.ok(updatedDto);
    }



    /** 
     * 삭제(Delete)
     * @param talentno 삭제할 재능 고유번호
     * @return 상태 메시지
     */
    @DeleteMapping("/delete/{talentno}")
    public ResponseEntity<String> deleteTalent(@PathVariable(name="talentno") Long talentno) {
        service.delete(talentno);
        return ResponseEntity.ok("삭제 완료");
    }
}