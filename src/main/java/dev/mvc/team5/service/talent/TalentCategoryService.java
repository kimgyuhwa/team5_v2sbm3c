package dev.mvc.team5.service.talent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.mvc.team5.entity.talents.TalentCategory;
import dev.mvc.team5.repository.talents.TalentCategoryRepository;

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
  
}
