package dev.mvc.team5.talent.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.mvc.team5.talent.entity.TalentCateGrp;
import dev.mvc.team5.talent.entity.TalentCategory;
import dev.mvc.team5.talent.repository.TalentCateGrpRepository;

@Service
public class TalentCateGrpService {

  @Autowired
  TalentCateGrpRepository repository;
  
  /**
   * 카테고리 대분류를 저장하거나 수정하는 메서드
   * @param entity 저장할 TalentCateGrp 엔티티 객체
   * @return 저장 완료된 TalentCateGrp 객체
   */
  public TalentCateGrp save(TalentCateGrp entity) {
    return repository.save(entity);
  }
  
  /** 수정 (UPDATE) → save() 재사용 */
  public TalentCateGrp update(TalentCateGrp updatedGrp) {
      // 이미 있는 경우만 update 진행
      if (updatedGrp.getCateGrpno() != null && repository.existsById(updatedGrp.getCateGrpno())) {
          return repository.save(updatedGrp);
      }
      throw new IllegalArgumentException("해당 재능이 존재하지 않음: talentno=" + updatedGrp.getCateGrpno());
  }
  
}
