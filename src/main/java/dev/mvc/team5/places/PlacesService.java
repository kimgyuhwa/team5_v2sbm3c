package dev.mvc.team5.places;



import java.util.List;
import java.util.Optional;

/**
 * PlacesService
 * 강의실(장소) 관련 기능들의 인터페이스 정의.
 * 컨트롤러는 이 인터페이스를 통해 서비스 계층을 호출함.
 */
public interface PlacesService {

    /**
     * 강의실 등록
     * @param places 등록할 Places 객체
     * @return 저장된 Places 객체
     */
    Places create(Places places);

    /**
     * 특정 강의실 조회
     * @param placeno PK (장소 번호)
     * @return 해당 placeno에 대한 Places 객체 (Optional로 감쌈)
     */
    Optional<Places> read(Long placeno);

    /**
     * 전체 강의실 목록 조회
     * @return 모든 Places 리스트
     */
    List<Places> listAll();

    /**
     * 강의실 정보 수정
     * @param places 수정할 객체
     * @return 수정된 Places 객체
     */
    Places update(Places places);

    /**
     * 강의실 삭제
     * @param placeno 삭제할 장소 번호
     */
    void delete(Long placeno);
}
