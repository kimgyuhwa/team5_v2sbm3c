package dev.mvc.team5.talent.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.mvc.team5.talent.Entity.Talent;

@Repository
public interface TalentRepository extends JpaRepository<Talent, Long> {
	// 제목에 특정 키워드 포함된 재능 조회
  // List<Talent> findByTitleContaining(String keyword);
}
