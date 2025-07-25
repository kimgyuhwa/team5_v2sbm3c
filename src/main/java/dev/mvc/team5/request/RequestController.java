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

/**
 * 요청 관련 API 컨트롤러
 * - 요청 생성, 삭제, 상태 변경
 * - 요청 목록 검색/페이징
 * - 채팅방 기반 요청 조회
 * - 구매/판매 내역 조회
 */
@RestController
@RequiredArgsConstructor  
@RequestMapping("/request")
public class RequestController {

    private final RequestService service;
    private final RequestRepository requestRepository;

    /**
     * 요청 생성
     * @param dto 생성할 요청 정보
     * @return 저장된 요청 DTO
     */
    @PostMapping(path="save")
    public ResponseEntity<RequestResponseDTO> createRequest(@RequestBody RequestCreateDTO dto) {
        System.out.println("받은 요청 DTO: " + dto);
        RequestResponseDTO savedDto = service.save(dto);
        return ResponseEntity.ok(savedDto);
    }

    /**
     * 요청 삭제
     * @param requestno 삭제할 요청 번호
     * @return 삭제 결과 메시지
     */
    @DeleteMapping("/delete/{requestno}")
    public ResponseEntity<String> deleteRequest(@PathVariable(name="requestno") Long requestno) {
        service.delete(requestno);
        return ResponseEntity.ok("삭제 성공");
    }

    /**
     * 요청 목록 조회 + 검색 + 페이징 + 정렬
     * 기본 정렬: requestno 내림차순(최신순)
     * 
     * @param searchType 검색 필드 (talentTitle, userName, status, message)
     * @param keyword 검색어 (없으면 전체)
     * @param page 페이지 번호 (0부터 시작)
     * @param size 페이지 크기
     * @param sort 정렬 기준 필드명
     * @param direction 정렬 방향 (ASC or DESC)
     * @return 페이지 형태의 요청 목록
     */
    @GetMapping("/list")
    public ResponseEntity<Page<RequestListDTO>> listRequests(
            @RequestParam(name="searchType", required = false) String searchType,
            @RequestParam(name="keyword", required = false) String keyword,
            @RequestParam(name="page", defaultValue = "0") int page,
            @RequestParam(name="size", defaultValue = "10") int size,
            @RequestParam(name="sort", defaultValue = "requestno") String sort,
            @RequestParam(name="direction", defaultValue = "DESC") String direction) {

        Sort.Direction sortDirection = Sort.Direction.fromString(direction);
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sort));

        Page<RequestListDTO> resultPage = service.searchRequests(searchType, keyword, pageable);
        return ResponseEntity.ok(resultPage);
    }

    /**
     * 요청 상태 직접 변경
     * @param requestno 요청 번호
     * @param status 변경할 상태 (e.g., ACCEPTED, REJECTED)
     * @return 상태 변경 결과 메시지
     */
    @PatchMapping("/status/{requestno}")
    public ResponseEntity<String> updateStatus(
            @PathVariable(name="reqeustno") Long requestno,
            @RequestParam(name="status") String status) {

        service.updateStatus(requestno, status);
        return ResponseEntity.ok("상태가 변경되었습니다.");
    }

    /**
     * 요청 수락 처리
     * @param requestno 수락할 요청 번호
     * @return 성공 응답
     */
    @PatchMapping("/{requestno}/accept")
    public ResponseEntity<Void> acceptRequest(@PathVariable(name="requestno") Long requestno) {
        service.updateStatus(requestno, RequestStatus.ACCEPTED);
        return ResponseEntity.ok().build();
    }

    /**
     * 요청 거절 처리
     * @param requestno 거절할 요청 번호
     * @return 성공 응답
     */
    @PatchMapping("/{requestno}/reject")
    public ResponseEntity<Void> rejectRequest(@PathVariable(name="requestno") Long requestno) {
        service.updateStatus(requestno, RequestStatus.REJECTED);
        return ResponseEntity.ok().build();
    }

    /**
     * 채팅방 번호로 가장 최근 요청 조회
     * @param chatRoomno 채팅방 번호
     * @return 가장 최근 요청 or 204 (없을 경우)
     */
    @GetMapping("/chatroom/{chatRoomno}")
    public ResponseEntity<?> getLatestRequestByChatRoom(@PathVariable(name="chatRoomno") Long chatRoomno) {
        return requestRepository.findTopByChatRoom_ChatRoomnoOrderByCreatedAtDesc(chatRoomno)
            .map(request -> ResponseEntity.ok(new RequestResponseDTO(request)))
            .orElse(ResponseEntity.noContent().build());
    }

    /**
     * 특정 사용자의 구매 내역 조회
     * @param userno 사용자 번호
     * @return 요청 목록 (giver = user)
     */
    @GetMapping("/requests/purchases/{userno}")
    public List<Request> getPurchases(@PathVariable Long userno) {
        return requestRepository.findByGiverUserno(userno);
    }

    /**
     * 특정 사용자의 판매 내역 조회
     * @param userno 사용자 번호
     * @return 요청 목록 (receiver = user)
     */
    @GetMapping("/requests/sales/{userno}")
    public List<Request> getSales(@PathVariable Long userno) {
        return requestRepository.findByReceiverUserno(userno);
    }
} 
