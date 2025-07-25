package dev.mvc.team5.talents;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import dev.mvc.team5.talents.talentdto.TalentDetailDTO;

@Repository
public interface TalentRepository extends JpaRepository<Talent, Long> {
    // 학교 번호로 구분
    List<Talent> findBySchool_Schoolno(Long schoolno);
    
    // 학교내의  특정 카테고리에 해당하는 글만보여주기
    List<Talent> findBySchool_SchoolnoAndCategory_Categoryno(Long schoolno, Long categoryno);
  
  ////학교번호(schoolno), 카테고리번호(categoryno)로 검색하는 메서드 선언
  //  List<Talent> findBySchoolnoAndCategoryno(Long schoolno, Long categoryno);
    
  
    @Query("""
        SELECT new dev.mvc.team5.talents.talentdto.TalentDetailDTO(
            t.talentno,
            t.user.userno,
            t.type.name,
            t.category.cateGrp.name,
            t.category.name,
            t.title,
            t.description,
            t.price,
            t.viewCount,
            t.user.username,
            t.createdAt,
            t.updatedAt
        ) FROM Talent t
        WHERE t.talentno = :talentno""")
    TalentDetailDTO findDetailByTalentno(@Param("talentno") Long talentno);
    
    @Query("SELECT t FROM Talent t LEFT JOIN FETCH t.files LEFT JOIN FETCH t.user WHERE t.talentno = :talentno")
    Optional<Talent> findByIdWithFiles(@Param("talentno") Long talentno);
    
    //title 또는 description 에 keyword가 포함된 데이터를 페이징, 정렬해서 조회
    @Query("SELECT t FROM Talent t " +
        "WHERE (:keyword IS NULL OR t.title LIKE CONCAT('%', :keyword, '%') OR t.description LIKE CONCAT('%', :keyword, '%')) " +
        "AND (:categoryno IS NULL OR t.category.categoryno = :categoryno) " +
        "AND (:schoolno IS NULL OR t.school.schoolno = :schoolno)")
  Page<Talent> searchWithFilters(@Param("keyword") String keyword,
                               @Param("categoryno") Long categoryno,
                               @Param("schoolno") Long schoolno,
                               Pageable pageable);
    
  
    @Query("""
        SELECT t FROM Talent t
        WHERE (:keyword IS NULL OR t.title LIKE %:keyword% OR t.description LIKE %:keyword%)
          AND (:categoryno IS NULL OR t.category.categoryno = :categoryno)
          AND (:schoolno IS NULL OR t.school.schoolno = :schoolno)
          AND t.user.userno = :userno
    """)
    Page<Talent> searchWithFilters(
        @Param("keyword") String keyword,
        @Param("categoryno") Long categoryno,
        @Param("schoolno") Long schoolno,
        @Param("userno") Long userno,
        Pageable pageable
    );


    @Query("SELECT t FROM Talent t " +
        "WHERE (:keyword IS NULL OR t.title LIKE %:keyword% OR t.description LIKE %:keyword%) " +
        "AND (:schoolno IS NULL OR t.school.schoolno = :schoolno) " +
        "AND (COALESCE(:categorynos, NULL) IS NULL OR t.category.categoryno IN :categorynos)")
 Page<Talent> findByCategorynosInAndFilters(@Param("categorynos") List<Long> categorynos,
                                            @Param("keyword") String keyword,
                                            @Param("schoolno") Long schoolno,
                                            Pageable pageable);
  

    long countByUser_Userno(Long userno);  

  

  
}
