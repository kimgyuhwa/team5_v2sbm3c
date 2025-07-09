package dev.mvc.team5.talents;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TalentRepository extends JpaRepository<Talent, Long> {
  // 학교 번호로 구분
  List<Talent> findBySchool_Schoolno(Long schoolno);
  
  // 학교내의  특정 카테고리에 해당하는 글만보여주기
  List<Talent> findBySchool_SchoolnoAndCategory_Categoryno(Long schoolno, Long categoryno);

////학교번호(schoolno), 카테고리번호(categoryno)로 검색하는 메서드 선언
//  List<Talent> findBySchoolnoAndCategoryno(Long schoolno, Long categoryno);
}
