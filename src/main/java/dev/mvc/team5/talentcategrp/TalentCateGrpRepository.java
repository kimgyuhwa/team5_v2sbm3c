package dev.mvc.team5.talentcategrp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TalentCateGrpRepository extends JpaRepository<TalentCateGrp, Long> {
    // 추가 쿼리 메소드 작성 가능
}
