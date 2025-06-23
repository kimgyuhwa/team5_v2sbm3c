package dev.mvc.team5.match;

import dev.mvc.team5.match.matchdto.MatchResponseDTO;
import dev.mvc.team5.match.matchdto.MatchCreateDTO;
import dev.mvc.team5.match.matchdto.MatchListDTO;
import dev.mvc.team5.match.MatchRepository;
import dev.mvc.team5.reservations.ReservationsRepository;
import dev.mvc.team5.request.RequestRepository;
import dev.mvc.team5.talents.TalentRepository;
import dev.mvc.team5.user.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MatchService {

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private ReservationsRepository reservationsRepository;

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TalentRepository talentRepository;
    
 // Entity -> DTO 변환 헬퍼 메서드
    private MatchResponseDTO toMatchResponseDTO(Match match) {
        return new MatchResponseDTO(
            match.getMatchno(),
            match.getRequest().getRequestno(),
            match.getGiver().getName(),
            match.getReceiver().getName(),
            match.getTalent().getTitle(),
            match.getReservation() != null ? match.getReservation().getStart_time() : null,
            match.getReservation() != null ? match.getReservation().getEnd_time() : null
        );
    }

    // 매칭 생성
    public MatchResponseDTO save(MatchCreateDTO dto) {
      // DTO -> Entity 변환
      Match match = dto.toEntity();

      // 예약 엔티티 조회 후 세팅
      reservationsRepository.findById(dto.getReservationno())
          .ifPresent(match::setReservation);

      // 요청 상태를 accepted로 바꿔줌
      requestRepository.findById(dto.getRequestno())
          .ifPresent(request -> {
              request.setStatus("accepted"); // 또는 RequestStatus.ACCEPTED
              requestRepository.save(request); // 상태 변경 저장
          });

      Match saved = matchRepository.save(match);

      return toMatchResponseDTO(saved);
  }


//    // 단건 조회
//    public MatchResponseDTO getMatch(Long matchno) {
//        Match match = matchRepository.findById(matchno)
//            .orElseThrow(() -> new RuntimeException("매칭이 존재하지 않습니다."));
//
//        return toMatchResponseDTO(match);
//    }

    // 삭제
    public void deleteMatch(Long matchno) {
        if (!matchRepository.existsById(matchno)) {
            throw new RuntimeException("삭제할 매칭이 없습니다.");
        }
        matchRepository.deleteById(matchno);
    }
    
    // 검색+페이징+정렬
    public Page<MatchListDTO> searchMatches(
            String searchType,
            String keyword,
            Pageable pageable) {

        Page<Match> page;

        if (keyword == null || keyword.trim().isEmpty()) {
            page = matchRepository.findAll(pageable);
        } else {
            switch (searchType) {
                case "requestno":
                    // requestno는 Long 타입이므로 변환 필요
                    try {
                        Long requestno = Long.parseLong(keyword);
                        page = matchRepository.findByRequest_Requestno(requestno, pageable);
                    } catch (NumberFormatException e) {
                        page = Page.empty(pageable);
                    }
                    break;
                case "giverName":
                    page = matchRepository.findByGiver_NameContainingIgnoreCase(keyword, pageable);
                    break;
                case "receiverName":
                    page = matchRepository.findByReceiver_NameContainingIgnoreCase(keyword, pageable);
                    break;
                case "talentTitle":
                    page = matchRepository.findByTalent_TitleContainingIgnoreCase(keyword, pageable);
                    break;
                default:
                    page = matchRepository.findAll(pageable);
                    break;
            }
        }

        // Entity -> DTO 변환
        return page.map(m -> new MatchListDTO(
                m.getMatchno(),
                m.getRequest().getRequestno(),
                m.getGiver().getName(),
                m.getReceiver().getName(),
                m.getTalent().getTitle(),
                m.getReservation().getStart_time(),
                m.getReservation().getEnd_time()
        ));
    }

    
}
