package dev.mvc.team5.block;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BlockRepository extends JpaRepository<Block, Long> {
  // 필요하다면 커스텀 쿼리 추가 가능
}
