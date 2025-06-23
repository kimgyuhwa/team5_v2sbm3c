package dev.mvc.team5.talentcategrp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dev.mvc.team5.talentcategrp.talentcategrpdto.TalentCateGrpCreateDTO;
import dev.mvc.team5.talentcategrp.talentcategrpdto.TalentCateGrpListDTO;
import dev.mvc.team5.talentcategrp.talentcategrpdto.TalentCateGrpResponseDTO;
import dev.mvc.team5.talentcategrp.talentcategrpdto.TalentCateGrpUpdateDTO;
import dev.mvc.team5.talenttype.talenttypedto.TalentTypeCreateDTO;
import dev.mvc.team5.talenttype.talenttypedto.TalentTypeListDTO;
import dev.mvc.team5.talenttype.talenttypedto.TalentTypeResponseDTO;
import dev.mvc.team5.talenttype.talenttypedto.TalentTypeUpdateDTO;

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
   * grpno가 없는 상태로 전달되면 새로운 데이터로 인식되어 INSERT 쿼리가 실행됩니다.
   *
   * @param entity 등록할 TalentCateGrp 객체 (요청 본문에 포함됨)
   * @return 등록된 TalentCateGrp 객체를 포함한 HTTP 200 응답
   */
  @PostMapping(path="/save")
  public ResponseEntity<TalentCateGrpResponseDTO> createCateGrp(@RequestBody TalentCateGrpCreateDTO dto) {
      // System.out.println("-> 카테고리 대분류 추가: " + entity.getName());
    TalentCateGrpResponseDTO savedDto = service.save(dto);
      return ResponseEntity.ok(savedDto);
  }

  /**
   * 카테고리 타입 수정
   * 
   * grpno가 포함된 상태로 전달되면 기존 데이터로 인식되어 UPDATE 쿼리가 실행됩니다.
   *
   * @param entity 수정할 TalentCateGrp 객체 (요청 본문에 포함됨)
   * @return 수정된 TalentCateGrp 객체를 포함한 HTTP 200 응답
   */
  @PutMapping("/update")
  public ResponseEntity<TalentCateGrpResponseDTO> updateType(@RequestBody TalentCateGrpUpdateDTO dto) {
      // System.out.println("-> 카테고리 대분류 수정: " + entity.getName());

    TalentCateGrpResponseDTO updateDto = service.update(dto);
      return ResponseEntity.ok(updateDto);
  }
  
  /**
   * 주어진 grpno를 가진 TalentCateGrp 데이터를 삭제하는 컨트롤러 메서드
   *
   * @param grpno 삭제할 TalentCateGrp의 고유 번호 (경로 변수로 전달됨)
   * @return 삭제 성공 메시지를 포함한 HTTP 200 응답
   */
  @DeleteMapping("/delete/{grpno}")
  public ResponseEntity<String> deleteCateGrp(@PathVariable(name="grpno") Long grpno) {
      service.delete(grpno); // 서비스에서 삭제 처리
      return ResponseEntity.ok("삭제 성공"); // 응답 반환
  }
  
  
  /**
   * 전체 목록 조회 (검색 + 정렬 + 페이징 처리)
   * 
   * 기본 정렬은 grpno 내림차순 (최근순)
   * 
   * @param keyword 검색 키워드 (기본: "")
   * @param pageable 페이지/정렬 정보 (기본: size=10, grpno desc)
   */
  @GetMapping("/list")
  public ResponseEntity<Page<TalentCateGrpListDTO>> listTypes(
      @RequestParam(defaultValue = "") String keyword,
      @PageableDefault(size = 10, sort = "grpno", direction = Sort.Direction.DESC)
      Pageable pageable
  ) {
      Page<TalentCateGrpListDTO> list = service.list(keyword, pageable);
      return ResponseEntity.ok(list);
  }
  
}
