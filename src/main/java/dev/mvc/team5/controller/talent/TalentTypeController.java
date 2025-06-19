package dev.mvc.team5.controller.talent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.mvc.team5.entity.talents.TalentType;
import dev.mvc.team5.service.talent.TalentTypeService;

@RestController
@RequestMapping("/talent_type")
public class TalentTypeController {

  @Autowired
  TalentTypeService service;
  
  
  public TalentTypeController() {
    System.out.println("-> TalentTypeController created.");
  }
  
  @PostMapping(path="/save")
  public ResponseEntity<TalentType> createEntity(@RequestBody TalentType entity) {
    System.out.println("-> 카테고리 대분류 추가: " + entity.getName());
    
    TalentType type = service.save(entity);
    return ResponseEntity.ok(type);
  }
  
}
