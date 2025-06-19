package dev.mvc.team5.talent.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.mvc.team5.talent.entity.TalentCateGrp;
import dev.mvc.team5.talent.entity.TalentType;
import dev.mvc.team5.talent.service.TalentCateGrpService;

@RestController
@RequestMapping("/talent_cate_grp")
public class TalentCateGrpController {

  @Autowired
  TalentCateGrpService service;
  
  
  public TalentCateGrpController() {
    // System.out.println("-> TalentCateGrpController created.");
  }
  
  /**
   * 카테고리 대분류 등록
   * 
   * typeno가 없는 상태로 전달되면 새로운 데이터로 인식되어 INSERT 쿼리가 실행됩니다.
   *
   * @param entity 등록할 TalentCateGrp 객체 (요청 본문에 포함됨)
   * @return 등록된 TalentCateGrp 객체를 포함한 HTTP 200 응답
   */
  @PostMapping(path="/save")
  public ResponseEntity<TalentCateGrp> createEntity(@RequestBody TalentCateGrp entity) {
    System.out.println("-> 카테고리 대분류 추가: " + entity.getName());
    
    TalentCateGrp grp = service.save(entity);
    return ResponseEntity.ok(grp);
  }
  
  /**
   * 카테고리 대분류 수정
   * 
   * typeno가 포함된 상태로 전달되면 기존 데이터로 인식되어 UPDATE 쿼리가 실행됩니다.
   *
   * @param entity 수정할 TalentCateGrp 객체 (요청 본문에 포함됨)
   * @return 수정된 TalentCateGrp 객체를 포함한 HTTP 200 응답
   */
  @PutMapping("/update")
  public ResponseEntity<TalentCateGrp> updateEntity(@RequestBody TalentCateGrp entity) {
      // System.out.println("-> 카테고리 대분류 수정: " + entity.getName());

    TalentCateGrp grp = service.save(entity);
      return ResponseEntity.ok(grp);
  }
  
}
