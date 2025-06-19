package dev.mvc.team5.talentCategory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TalentCategoryService {

  @Autowired
  TalentCategoryRepository repository;
  
  /**
   * 카테고리 대분류를 저장하거나 수정하는 메서드
   * @param entity 저장할 TalentCateGrp 엔티티 객체
   * @return 저장 완료된 TalentCateGrp 객체
   */
  public TalentCategory save(TalentCategory entity) {
    return repository.save(entity);
  }
  
  /** 수정 (UPDATE) → save() 재사용 */
  public TalentCategory update(TalentCategory updatedCate) {
      // 이미 있는 경우만 update 진행
      if (updatedCate.getCategoryno() != null && repository.existsById(updatedCate.getCategoryno())) {
          return repository.save(updatedCate);
      }
      throw new IllegalArgumentException("해당 재능이 존재하지 않음: talentno=" + updatedCate.getCategoryno());
  }
  
}
