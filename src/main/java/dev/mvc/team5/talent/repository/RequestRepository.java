package dev.mvc.team5.talent.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.mvc.team5.talent.entity.Request;
import dev.mvc.team5.talent.entity.RequestStatus;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {
	// 특정 재능의 요청 목록 조회
	List<Request> findByTalent_talentno(Long talent);

	
	// 특정 회원의 요청 목록 조회
	// List<Request> findByUser_Userno(Long userno);

  // 상태별 요청 조회
  List<Request> findByStatus(String status);
}
