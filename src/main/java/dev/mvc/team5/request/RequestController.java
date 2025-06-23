package dev.mvc.team5.request;

import dev.mvc.team5.request.requestdto.RequestCreateDTO;
import dev.mvc.team5.request.requestdto.RequestListDTO;
import dev.mvc.team5.request.requestdto.RequestResponseDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/request")
public class RequestController {

    @Autowired
    private RequestService service;

    /**
     * 요청 생성
     */
    @PostMapping(path="save")
    public ResponseEntity<RequestResponseDTO> createRequest(@RequestBody RequestCreateDTO dto) {
        RequestResponseDTO savedDto = service.save(dto);
        return ResponseEntity.ok(savedDto);
    }

    /**
     * 요청 삭제
     */
    @DeleteMapping("/delete/{requestno}")
    public ResponseEntity<String> deleteRequest(@PathVariable(name="requestno") Long requestno) {
        service.delete(requestno);
        return ResponseEntity.ok("삭제 성공"); // 응답 반환
    }

    /**
     * 요청 목록 조회 + 검색 + 페이징 + 정렬
     *
     * 기본 정렬은 requestno 내림차순(최근순)
     *
     * @param searchType 검색할 필드명 (talentTitle, userName, status, message)
     * @param keyword 검색어 (없으면 전체 조회)
     * @param page 페이지 번호 (0부터 시작)
     * @param size 페이지 크기
     * @param direction 정렬 방향 ASC or DESC
     * @return 페이지 단위 RequestListDTO 리스트
     */
    @GetMapping("/list")
    public ResponseEntity<Page<RequestListDTO>> listRequests(
            @RequestParam(required = false) String searchType,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "requestno") String sort,   // requestno 내림차순 기본
            @RequestParam(defaultValue = "DESC") String direction) {

        Sort.Direction sortDirection = Sort.Direction.fromString(direction);
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sort));

        Page<RequestListDTO> resultPage = service.searchRequests(searchType, keyword, pageable);
        return ResponseEntity.ok(resultPage);
    }

}
