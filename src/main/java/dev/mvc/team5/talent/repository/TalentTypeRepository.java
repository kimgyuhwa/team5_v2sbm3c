package dev.mvc.team5.talent.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.mvc.team5.talent.Entity.TalentType;

@Repository
public interface TalentTypeRepository extends JpaRepository<TalentType, Long> {
    // 추가 쿼리 메소드 작성 가능
}
