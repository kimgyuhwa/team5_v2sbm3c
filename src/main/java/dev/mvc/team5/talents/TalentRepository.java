package dev.mvc.team5.talents;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TalentRepository extends JpaRepository<Talent, Long> {
	// 제목에 특정 키워드 포함된 재능 조회
  // List<Talent> findByTitleContaining(String keyword);
}
