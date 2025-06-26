package dev.mvc.team5.places;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PlacesRepository extends JpaRepository<Places, Long> {

    // 1. 예약 시간 겹침 확인
    @Query("SELECT p FROM Places p WHERE p.schoolGwan.schoolgwanno = :schoolgwanno " +
           "AND ((p.start_time < :endTime AND p.end_time > :startTime))")
    List<Places> findOverlappingPlaces(
        @Param("schoolgwanno") Long schoolgwanno,
        @Param("startTime") LocalDateTime startTime,
        @Param("endTime") LocalDateTime endTime
    );

    // 2. 이름 키워드 검색
    List<Places> findByPlacenameContaining(String keyword);

    // 3. 학교관 번호로 강의실 조회
    List<Places> findBySchoolGwan_Schoolgwanno(Long schoolgwanno);
}
