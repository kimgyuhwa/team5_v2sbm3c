package dev.mvc.team5.controller.talent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.mvc.team5.entity.talents.TalentCateGrp;
import dev.mvc.team5.service.talent.TalentCateGrpService;

@RestController
@RequestMapping("/talent_cate_grp")
public class TalentCateGrpController {

  @Autowired
  TalentCateGrpService service;
  
  
  public TalentCateGrpController() {
    // System.out.println("-> TalentCateGrpController created.");
  }
  
  @PostMapping(path="/save")
  public ResponseEntity<TalentCateGrp> createEntity(@RequestBody TalentCateGrp entity) {
    System.out.println("-> 카테고리 대분류 추가: " + entity.getName());
    
    TalentCateGrp grp = service.save(entity);
    return ResponseEntity.ok(grp);
  }
  
}
