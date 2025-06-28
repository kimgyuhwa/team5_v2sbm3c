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
     * @param dto 등록할 TalentCreateDTO 객체
     * @return 저장된 TalentResponseDTO 객체
     */    
    @PostMapping("/save")
    public ResponseEntity<TalentResponseDTO> createTalent(@RequestBody TalentCreateDTO dto) {
        TalentResponseDTO savedDto = service.save(dto);
        return ResponseEntity.ok(savedDto);
    }

    /** 
     * 전체 조회(Read)
     * @return Talent 전체 목록 (List<TalentListDTO>)
     */
    @GetMapping("/list")
    public ResponseEntity<List<TalentListDTO>> getAllTalents() {
        List<TalentListDTO> list = service.findAll();
        return ResponseEntity.ok(list);
    }

    /** 
     * 단건 조회(Read)
     * @param talentno 재능 고유번호
     * @return 해당 TalentResponseDTO 객체 또는 404 Not Found
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
     * @param dto 수정할 TalentUpdateDTO 객체
     * @param session 로그인 사용자 정보가 담긴 HttpSession
     * @return 수정된 TalentResponseDTO 객체 또는 401 Unauthorized
     */
    @PutMapping("/update")
    public ResponseEntity<?> updateTalent(
            @RequestBody TalentUpdateDTO dto,
            HttpSession session) {

        Long loggedInUserNo = (Long) session.getAttribute("userno");

        // 로그인 안 되어 있으면 401 Unauthorized 반환
        if (loggedInUserNo == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 후 이용해주세요.");
        }

        try {
            TalentResponseDTO updatedDto = service.update(dto, loggedInUserNo);
            return ResponseEntity.ok(updatedDto);
        } catch (IllegalArgumentException e) {
            // 재능이 존재하지 않는 경우 404 반환
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (SecurityException e) {
            // 권한이 없을 경우 403 Forbidden 반환
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    /** 
     * 삭제(Delete)
     * @param talentno 삭제할 재능 고유번호
     * @return 삭제 성공 메시지 또는 404 Not Found
     */
    @DeleteMapping("/delete/{talentno}")
    public ResponseEntity<String> deleteTalent(@PathVariable(name="talentno") Long talentno) {
        try {
            service.delete(talentno);
            return ResponseEntity.ok("삭제 완료");
        } catch (IllegalArgumentException e) {
            // 삭제할 재능이 없을 때 404 반환
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
