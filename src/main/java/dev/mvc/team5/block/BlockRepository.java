package dev.mvc.team5.block;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BlockRepository extends JpaRepository<Block, Long> {
  // 중복차단 방지  (이미했는지 안했는지)
  boolean existsByBlockerUsernoAndBlockedUserno(Long blocker, Long blocked);
  // 사용자가 차단한 사람 목록 보기
  List<Block> findByBlockerUserno(Long userno);
}
