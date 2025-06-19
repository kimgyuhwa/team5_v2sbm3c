package dev.mvc.team5.controller.talent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.mvc.team5.entity.talents.TalentCategory;
import dev.mvc.team5.service.talent.TalentCategoryService;

@RestController
@RequestMapping("/talent_category")
public class TalentCategoryController {

  @Autowired
  TalentCategoryService service;
  
  
  public TalentCategoryController() {
    // System.out.println("-> TalentCateGrpController created.");
  }
  
  @PostMapping(path="/save")
  public ResponseEntity<TalentCategory> createEntity(@RequestBody TalentCategory entity) {
    System.out.println("-> 카테고리 대분류 추가: " + entity.getName());
    
    TalentCategory cate = service.save(entity);
    return ResponseEntity.ok(cate);
  }
  
}
