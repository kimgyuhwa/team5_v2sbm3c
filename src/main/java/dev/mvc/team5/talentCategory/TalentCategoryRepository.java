package dev.mvc.team5.talentCategory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TalentCategoryRepository extends JpaRepository<TalentCategory, Long> {
    // 추가 쿼리 메소드 작성 가능
}
