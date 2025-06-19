package dev.mvc.team5.talent.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.mvc.team5.talent.entity.TalentType;
import dev.mvc.team5.talent.repository.TalentTypeRepository;

@Service
public class TalentTypeService {

  @Autowired
  TalentTypeRepository repository;
  
  /**
   * 회원 정보를 저장하거나 수정하는 메서드
   * @param entity 저장할 TalentType 엔티티 객체
   * @return 저장 완료된 TalentType 객체
   */
  public TalentType save(TalentType entity) {
    return repository.save(entity);
  }
  
}
