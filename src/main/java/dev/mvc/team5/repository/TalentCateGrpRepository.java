package dev.mvc.team5.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.mvc.team5.entity.talents.TalentCateGrp;

@Repository
public interface TalentCateGrpRepository extends JpaRepository<TalentCateGrp, Long> {
    // 추가 쿼리 메소드 작성 가능
}
