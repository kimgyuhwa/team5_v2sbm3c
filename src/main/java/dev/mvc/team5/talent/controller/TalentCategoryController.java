package dev.mvc.team5.talent.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.mvc.team5.talent.entity.TalentCateGrp;
import dev.mvc.team5.talent.entity.TalentCategory;
import dev.mvc.team5.talent.service.TalentCategoryService;

@RestController
@RequestMapping("/talent_category")
public class TalentCategoryController {

  @Autowired
  TalentCategoryService service;
  
  
  public TalentCategoryController() {
    // System.out.println("-> TalentCateGrpController created.");
  }
  
  /**
   * 카테고리 중분류 등록
   * 
   * typeno가 없는 상태로 전달되면 새로운 데이터로 인식되어 INSERT 쿼리가 실행됩니다.
   *
   * @param entity 등록할 TalentCategory 객체 (요청 본문에 포함됨)
   * @return 등록된 TalentCategory 객체를 포함한 HTTP 200 응답
   */
  @PostMapping(path="/save")
  public ResponseEntity<TalentCategory> createEntity(@RequestBody TalentCategory entity) {
    System.out.println("-> 카테고리 대분류 추가: " + entity.getName());
    
    TalentCategory cate = service.save(entity);
    return ResponseEntity.ok(cate);
  }
  
  /**
   * 카테고리 대분류 수정
   * 
   * typeno가 포함된 상태로 전달되면 기존 데이터로 인식되어 UPDATE 쿼리가 실행됩니다.
   *
   * @param entity 수정할 TalentCategory 객체 (요청 본문에 포함됨)
   * @return 수정된 TalentCategory 객체를 포함한 HTTP 200 응답
   */
  @PutMapping("/update")
  public ResponseEntity<TalentCategory> updateEntity(@RequestBody TalentCategory entity) {
      // System.out.println("-> 카테고리 대분류 수정: " + entity.getName());

    TalentCategory grp = service.save(entity);
      return ResponseEntity.ok(grp);
  }
  
  
}
