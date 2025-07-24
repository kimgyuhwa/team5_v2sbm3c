package dev.mvc.team5.request;

import dev.mvc.team5.request.requestdto.RequestCreateDTO;
import dev.mvc.team5.request.requestdto.RequestListDTO;
import dev.mvc.team5.request.requestdto.RequestResponseDTO;
import dev.mvc.team5.tool.RequestStatus;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor  
@RequestMapping("/request")
public class RequestController {

    private final RequestService service;
    private final RequestRepository requestRepository;

    /**
     * 요청 생성
     */
    @PostMapping(path="save")
    public ResponseEntity<RequestResponseDTO> createRequest(@RequestBody RequestCreateDTO dto) {
        System.out.println("받은 요청 DTO: " + dto);
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
            @RequestParam(name="searchType", required = false) String searchType,
            @RequestParam(name="keyword", required = false) String keyword,
            @RequestParam(name="page", defaultValue = "0") int page,
            @RequestParam(name="size", defaultValue = "10") int size,
            @RequestParam(name="sort", defaultValue = "requestno") String sort,   // requestno 내림차순 기본
            @RequestParam(name="direction", defaultValue = "DESC") String direction) {

        Sort.Direction sortDirection = Sort.Direction.fromString(direction);
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sort));

        Page<RequestListDTO> resultPage = service.searchRequests(searchType, keyword, pageable);
        return ResponseEntity.ok(resultPage);
    }
    
    /**
     * 요청 상태 변경
     * @param requestno
     * @param status
     * @return
     */
    @PatchMapping("/status/{requestno}")
    public ResponseEntity<String> updateStatus(
            @PathVariable(name="reqeustno") Long requestno,
            @RequestParam(name="status") String status) {

        service.updateStatus(requestno, status);
        return ResponseEntity.ok("상태가 변경되었습니다.");
    }
    
    @PatchMapping("/{requestno}/accept")
    public ResponseEntity<Void> acceptRequest(@PathVariable(name="requestno") Long requestno) {
        service.updateStatus(requestno, RequestStatus.ACCEPTED);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{requestno}/reject")
    public ResponseEntity<Void> rejectRequest(@PathVariable(name="requestno") Long requestno) {
        service.updateStatus(requestno, RequestStatus.REJECTED);
        return ResponseEntity.ok().build();
    }
    
//    // 채팅방 번호로 요청 조회
//    @GetMapping("/chatroom/{chatRoomno}")
//    public ResponseEntity<RequestResponseDTO> getRequestByChatRoom(@PathVariable(name="chatRoomno") Long chatRoomno) {
//        Request request = requestRepository.findByChatRoom_ChatRoomno(chatRoomno)
//            .orElseThrow(() -> new RuntimeException("해당 채팅방에 요청 없음"));
//        return ResponseEntity.ok(new RequestResponseDTO(request));
//    }
    
    @GetMapping("/chatroom/{chatRoomno}")
    public ResponseEntity<RequestResponseDTO> getLatestRequestByChatRoom(@PathVariable(name="chatRoomno") Long chatRoomno) {
        Request request = requestRepository.findTopByChatRoom_ChatRoomnoOrderByCreatedAtDesc(chatRoomno)
            .orElseThrow(() -> new RuntimeException("요청이 존재하지 않습니다."));
        
        return ResponseEntity.ok(new RequestResponseDTO(request));
    }

    // 구매내역
    @GetMapping("/requests/purchases/{userno}")
    public List<Request> getPurchases(@PathVariable Long userno) {
        return requestRepository.findByGiverUserno(userno);
    }

    
    //판매내역
    @GetMapping("/requests/sales/{userno}")
    public List<Request> getSales(@PathVariable Long userno) {
        return requestRepository.findByReceiverUserno(userno);
    }


}
