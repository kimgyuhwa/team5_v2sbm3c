package dev.mvc.team5.request;

import dev.mvc.team5.request.requestdto.RequestCreateDTO;
import dev.mvc.team5.request.requestdto.RequestListDTO;
import dev.mvc.team5.request.requestdto.RequestResponseDTO;
import dev.mvc.team5.tool.RequestStatus;
import dev.mvc.team5.talents.TalentRepository;
import dev.mvc.team5.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

    /**
     * Request 엔티티를 RequestResponseDTO로 변환하는 헬퍼 메서드
     * @param request 변환할 Request 엔티티
     * @return 응답용 DTO 객체
     */
    private RequestResponseDTO toRequestResponseDTO(Request request) {
      return new RequestResponseDTO(
          request.getRequestno(),
          request.getTalent() != null ? request.getTalent().getTalentno() : null,
          request.getTalent() != null ? request.getTalent().getTitle() : null,
          request.getUser() != null ? request.getUser().getName() : null,
          request.getStatus(),
          request.getMessage(),
          request.getCreatedAt()
      );
  }


    /**
     * 요청 등록
     */
    public RequestResponseDTO save(RequestCreateDTO dto) {
        Request request = dto.toEntity();
        Request saved = requestRepository.save(request);
            
        return toRequestResponseDTO(saved);
    }

    /**
     * 요청 삭제
     */
    public void delete(Long requestno) {
        if (!requestRepository.existsById(requestno)) {
            throw new RuntimeException("요청이 존재하지 않습니다.");
        }
        requestRepository.deleteById(requestno);
    }


    /**
     * 검색 유형(searchType)에 따라 keyword로 검색 + 페이징 + 정렬 후 RequestListDTO로 변환 반환
     * 
     * @param searchType 검색할 필드명 (예: "talentTitle", "userName", "status", "message")
     * @param keyword 검색어
     * @param pageable 페이징 + 정렬 정보
     * @return 검색 결과의 DTO 페이지 리스트
     */
    public Page<RequestListDTO> searchRequests(String searchType, String keyword, Pageable pageable) {
        Page<Request> page;

        if (keyword == null || keyword.trim().isEmpty()) {
            // 검색어 없으면 전체 리스트 조회
            page = requestRepository.findAll(pageable);
        } else {
            switch (searchType) {
                case "talentTitle":
                    page = requestRepository.findByTalent_TitleContaining(keyword, pageable);
                    break;
                case "userName":
                    page = requestRepository.findByUser_NameContaining(keyword, pageable);
                    break;
                case "status":
                    page = requestRepository.findByStatusContaining(keyword, pageable);
                    break;
                case "message":
                    page = requestRepository.findByMessageContaining(keyword, pageable);
                    break;
                default:
                    // 기본 전체 조회 (또는 예외 처리)
                    page = requestRepository.findAll(pageable);
                    break;
            }
        }

        // Entity -> DTO 변환
        return page.map(r -> new RequestListDTO(
                r.getRequestno(),
                r.getTalent().getTalentno(),
                r.getTalent().getTitle(),
                r.getStatus(),
                r.getCreatedAt()
        ));
    }
}
