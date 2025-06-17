package dev.mvc.team5.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.mvc.team5.entity.talents.Request;
import dev.mvc.team5.entity.talents.RequestStatus;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {
	// 특정 재능의 요청 목록 조회
	List<Request> findByTalent_TalentNo(Long talentNo);
	
	// 특정 회원의 요청 목록 조회
	// List<Request> findByUser_UserNo(Long userNo);

  // 상태별 요청 조회
  List<Request> findByStatus(RequestStatus status);
}
