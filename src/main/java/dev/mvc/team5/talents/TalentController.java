package dev.mvc.team5.talents;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import dev.mvc.team5.talents.talentdto.TalentCreateDTO;
import dev.mvc.team5.talents.talentdto.TalentDetailDTO;
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
     * @param dto 등록할 TalentCreateDTO 객체 (fileInfos 포함 가능)
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

//    /** 
//     * 수정(Update)
//     * @param dto 수정할 TalentUpdateDTO 객체 (fileInfos 포함 가능)
//     * @param session 로그인 사용자 정보가 담긴 HttpSession
//     * @return 수정된 TalentResponseDTO 객체 또는 401 Unauthorized
//     */
//    @PutMapping("/update")
//    public ResponseEntity<?> updateTalent(
//            @RequestBody TalentUpdateDTO dto,
//            HttpSession session) {
//
//        Long loggedInUserNo = (Long) session.getAttribute("userno");
//
//        if (loggedInUserNo == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 후 이용해주세요.");
//        }
//
//        try {
//            TalentResponseDTO updatedDto = service.update(dto, loggedInUserNo);
//            return ResponseEntity.ok(updatedDto);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
//        } catch (SecurityException e) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
//        }
//    }

    /** 
     * 삭제(Delete)
     * @param talentno 삭제할 재능 고유번호
     * @return 삭제 성공 메시지 또는 404 Not Found
     */
    @DeleteMapping("/delete/{talentno}")
    public ResponseEntity<String> deleteTalent(
            @PathVariable(name = "talentno") Long talentno,
            HttpSession session) {

        Long loggedInUserNo = (Long) session.getAttribute("userno");
        if (loggedInUserNo == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 후 이용해주세요.");
        }

        try {
            service.delete(talentno, loggedInUserNo);
            return ResponseEntity.ok("삭제 완료");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }


    // 특정 학교 글만 보여주기
    @GetMapping("/list-by-school/{schoolno}")
    public ResponseEntity<List<TalentListDTO>> getTalentsBySchool(@PathVariable(name="schoolno") Long schoolno) {
        List<TalentListDTO> list = service.findBySchoolno(schoolno);
        return ResponseEntity.ok(list);
    }
    
    // 특정 학교의 특정 카테고리 글만 보여주기
    @GetMapping("/list-by-school-and-category")
    public ResponseEntity<List<TalentListDTO>> getTalentsBySchoolAndCategory(
            @RequestParam(name = "schoolno") Long schoolno,
            @RequestParam(name = "categoryno") Long categoryno) {
        List<TalentListDTO> list = service.findBySchoolnoAndCategoryno(schoolno, categoryno);
        return ResponseEntity.ok(list);
    }
    
    // 상세 페이지 목록 (디테일 DTO 반환)
    @GetMapping("/detail/{talentno}")
    public ResponseEntity<TalentDetailDTO> getTalentDetail(@PathVariable(name="talentno") Long talentno) {
        try {
            TalentDetailDTO dto = service.getTalentDetailWithFiles(talentno);
            return ResponseEntity.ok(dto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * 검색 + 페이징 + 정렬 처리된 재능 목록 조회
     * @param keyword 검색 키워드 (title 또는 description)
     * @param page 0부터 시작하는 페이지 번호 (기본 0)
     * @param size 페이지 당 항목 수 (기본 10)
     * @return 페이징된 재능 목록 DTO
     */
    @GetMapping("/search")
    public ResponseEntity<Page<TalentListDTO>> searchTalents(
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "categoryno", required = false) Long categoryno,
            @RequestParam(name = "schoolno", required = false) Long schoolno,  // 추가
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size
            ,HttpSession session) {
    	 Long loggedInUserno = (Long) session.getAttribute("userno");
    	 //System.out.println("DEBUG: TalentController - loggedInUserno from session: " + loggedInUserno);
        Page<TalentListDTO> resultPage = service.searchTalents(keyword, categoryno, schoolno, page, size,loggedInUserno);
        return ResponseEntity.ok(resultPage);
    }
    
    @PutMapping("/update/{talentno}")
    public ResponseEntity<?> updateTalent(
        @PathVariable(name="talentno") Long talentno,
        @RequestBody TalentUpdateDTO dto,
        HttpSession session) {
        
        Long loggedInUserNo = (Long) session.getAttribute("userno");

        if (loggedInUserNo == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 후 이용해주세요.");
        }

        // PathVariable로 받은 talentno를 강제로 DTO에 세팅 (안 할 시 null일 수 있음)
        dto.setTalentno(talentno);

        try {
            TalentResponseDTO updatedDto = service.update(dto, loggedInUserNo);
            return ResponseEntity.ok(updatedDto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }
    
    /**
     * 마이페이지 - 로그인한 사용자의 재능 목록 조회 (검색 + 카테고리 + 학교 + 페이징 + 정렬)
     * @param keyword 검색 키워드 (title 또는 description)
     * @param categoryno 카테고리 번호
     * @param schoolno 학교 번호
     * @param page 0부터 시작하는 페이지 번호 (기본 0)
     * @param size 페이지 당 항목 수 (기본 10)
     * @return 페이징된 재능 목록 DTO (로그인한 사용자만)
     */
    @GetMapping("/my-talents")
    public ResponseEntity<Page<TalentListDTO>> getMyTalents(
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "categoryno", required = false) Long categoryno,
            @RequestParam(name = "schoolno", required = false) Long schoolno,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            HttpSession session) {

        Long loggedInUserno = (Long) session.getAttribute("userno");
        if (loggedInUserno == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Page<TalentListDTO> resultPage = service.searchMyTalents(keyword, categoryno, schoolno, page, size, loggedInUserno);
        return ResponseEntity.ok(resultPage);
    }
    
    // 사용자의 게시물 개수 (프로필용)
    @GetMapping("/count-by-user")
    public ResponseEntity<Long> getTalentCountByUser(@RequestParam("userno") Long userno) {
        long count = service.countTalentsByUserno(userno);
        return ResponseEntity.ok(count);
    }


    
    
}
