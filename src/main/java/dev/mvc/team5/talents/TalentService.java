package dev.mvc.team5.talents;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import dev.mvc.team5.school.School;
import dev.mvc.team5.talentcategory.TalentCategory;
import dev.mvc.team5.talents.talentdto.TalentCreateDTO;
import dev.mvc.team5.talents.talentdto.TalentListDTO;
import dev.mvc.team5.talents.talentdto.TalentResponseDTO;
import dev.mvc.team5.talents.talentdto.TalentUpdateDTO;
import dev.mvc.team5.talenttype.talenttypedto.TalentTypeResponseDTO;
import dev.mvc.team5.talentcategory.talentcategorydto.TalentCategoryResponseDTO;
import dev.mvc.team5.talenttype.TalentType;
import dev.mvc.team5.user.User;
import jakarta.servlet.http.HttpSession;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TalentService {

    @Autowired
    private TalentRepository talentRepository;

    /** 등록 (CREATE) */
    public TalentResponseDTO save(TalentCreateDTO dto) {
      Talent talent = dto.toEntity();  // DTO → 엔티티 변환
      Talent saved = talentRepository.save(talent);
      return toResponseDTO(saved);
  }


    /** 전체 조회 (LIST) */
    public List<TalentListDTO> findAll() {
        return talentRepository.findAll().stream() // 람다식 + 스트림
                .map(this::toListDTO) 
                .collect(Collectors.toList());
    }
    
//    람다식  + 스트림쓴거 원래(?)코드
//    List<Talent> entityList = talentRepository.findAll();
//    List<TalentListDTO> dtoList = new ArrayList<>();
//
//    for (Talent t : entityList) {
//        TalentListDTO dto = toListDTO(t);
//        dtoList.add(dto);
//    }


    /** 개별 조회 (DETAIL) */
    public Optional<TalentResponseDTO> findById(Long talentno) {
        return talentRepository.findById(talentno)
                .map(this::toResponseDTO);
    }


    /** 수정 (UPDATE) */
    public TalentResponseDTO update(TalentUpdateDTO dto, Long loggedInUserNo) {
        Talent talent = talentRepository.findById(dto.getTalentno())
                .orElseThrow(() -> new IllegalArgumentException("재능이 존재하지 않음"));

        // 권한 체크 (작성자만 수정 가능)
        if (!talent.getUser().getUserno().equals(loggedInUserNo)) {
            throw new SecurityException("수정 권한이 없습니다.");
        }

        // 필드 업데이트
        talent.setTitle(dto.getTitle());
        talent.setDescription(dto.getDescription());
        talent.setLanguage(dto.getLanguage());

        Talent updated = talentRepository.save(talent);
        return toResponseDTO(updated);
    }



    /** 삭제 (DELETE) */
    public void delete(Long talentno) {
        if (talentRepository.existsById(talentno)) {
            talentRepository.deleteById(talentno);
        } else {
            throw new IllegalArgumentException("삭제할 재능이 존재하지 않음: talentno=" + talentno);
        }
    }

    /** 🔁 엔티티 → 리스트 DTO */
    private TalentListDTO toListDTO(Talent t) {
        return new TalentListDTO(
                t.getTalentno(),
                t.getTitle(),
                t.getLanguage(),
                t.getCategory() != null ? t.getCategory().getName() : "없음",
                t.getType() != null ? t.getType().getName() : "없음"
        );
    }
    
    /** 🔁 엔티티 → 상세 DTO */
    private TalentResponseDTO toResponseDTO(Talent t) {
        return new TalentResponseDTO(
                t.getTalentno(),
                t.getUser() != null ? t.getUser().getUserno() : null,
                t.getSchool() != null ? t.getSchool().getSchoolno() : null,
                t.getTitle(),
                t.getDescription(),
                t.getLanguage(),
                t.getCreatedAt(),
                t.getUpdatedAt(),
                (TalentTypeResponseDTO) null,      // 필요 시 실제 DTO로 변환해서 넣기
                (TalentCategoryResponseDTO) null   // 필요 시 실제 DTO로 변환해서 넣기
        );
    }

    
}
