package dev.mvc.team5.talents;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TalentRepository extends JpaRepository<Talent, Long> {
  // 학교 번호로 구분
  List<Talent> findBySchool_Schoolno(Long schoolno);

}
