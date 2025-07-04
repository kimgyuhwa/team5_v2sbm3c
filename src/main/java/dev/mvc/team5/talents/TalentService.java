package dev.mvc.team5.talents;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.mvc.team5.school.School;
import dev.mvc.team5.school.SchoolRepository;
import dev.mvc.team5.talentcategory.TalentCategory;
import dev.mvc.team5.talentcategory.TalentCategoryRepository;
import dev.mvc.team5.talents.talentdto.TalentCreateDTO;
import dev.mvc.team5.talents.talentdto.TalentListDTO;
import dev.mvc.team5.talents.talentdto.TalentResponseDTO;
import dev.mvc.team5.talents.talentdto.TalentUpdateDTO;
import dev.mvc.team5.talenttype.TalentType;
import dev.mvc.team5.talenttype.TalentTypeRepository;
import dev.mvc.team5.user.User;
import dev.mvc.team5.user.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TalentService {

    @Autowired
    private TalentRepository talentRepository;
    
    @Autowired
    private TalentCategoryRepository cateRepository;
    
    @Autowired
    private TalentTypeRepository typeRepository;
    
    @Autowired
    private SchoolRepository schoolRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    /**
     * 엔티티 → 상세 조회용 DTO 변환
     * @param t 변환할 Talent 엔티티
     * @return 상세 조회용 DTO
     */
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
                t.getType() != null ? t.getType().getTypeno() : null,
                t.getCategory() != null ? t.getCategory().getCategoryno() : null
        );
    }

    /**
     * 새로운 재능 등록 처리
     * @param dto 클라이언트에서 받은 생성용 DTO
     * @return 저장된 재능 정보를 담은 ResponseDTO
     */
    public TalentResponseDTO save(TalentCreateDTO dto) {
        // DTO → 엔티티 변환 후 저장
        Talent talent = dto.toEntity();
        
        School school = schoolRepository.findById(dto.getSchoolno())
            .orElseThrow(() -> new IllegalArgumentException("학교 없음"));
        TalentCategory category = cateRepository.findById(dto.getCategoryno())
            .orElseThrow(() -> new IllegalArgumentException("카테고리가 존재하지 않습니다."));
        TalentType type = typeRepository.findById(dto.getTypeno())
            .orElseThrow(() -> new IllegalArgumentException("타입이 존재하지 않습니다."));
              
       talent.setSchool(school);
       talent.setCategory(category);
       talent.setType(type);
        
        Talent saved = talentRepository.save(talent);

        // 저장된 엔티티를 DTO로 변환하여 반환
        return toResponseDTO(saved);
    }

    /**
     * 모든 재능 목록 조회
     * @return 재능 리스트를 담은 DTO 리스트
     */
    public List<TalentListDTO> findAll() {
        return talentRepository.findAll().stream()
                .map(this::toListDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * 학교별 게시물 조회
     * @return 재능 리스트를 담은 DTO 리스트
     */
    public List<TalentListDTO> findBySchoolno(Long schoolno) {
      return talentRepository.findBySchool_Schoolno(schoolno).stream()
              .map(this::toListDTO)
              .collect(Collectors.toList());
  }


    /**
     * 특정 재능 개별 조회
     * @param talentno 조회할 재능 고유번호
     * @return 재능 상세 정보를 담은 Optional DTO
     */
    public Optional<TalentResponseDTO> findById(Long talentno) {
        return talentRepository.findById(talentno)
                .map(this::toResponseDTO);
    }

    /**
     * 재능 정보 수정 처리
     * @param dto 수정할 정보가 담긴 DTO
     * @param loggedInUserNo 현재 로그인한 사용자의 고유번호 (권한 체크용)
     * @return 수정된 재능 정보를 담은 ResponseDTO
     * @throws IllegalArgumentException 재능이 없을 경우
     * @throws SecurityException 권한이 없을 경우
     */
    public TalentResponseDTO update(TalentUpdateDTO dto, Long loggedInUserNo) {
        // 수정 대상 엔티티 조회
        Talent talent = talentRepository.findById(dto.getTalentno())
                .orElseThrow(() -> new IllegalArgumentException("재능이 존재하지 않음"));

        // 작성자 권한 체크
        if (!talent.getUser().getUserno().equals(loggedInUserNo)) {
            throw new SecurityException("수정 권한이 없습니다.");
        }

        // 수정 정보 엔티티에 반영
        TalentType type = new TalentType();
        TalentCategory category = new TalentCategory();

        type.setTypeno(dto.getTypeno());           // 타입 번호 설정
        category.setCategoryno(dto.getCategoryno()); // 카테고리 번호 설정

        talent.setTitle(dto.getTitle());
        talent.setDescription(dto.getDescription());
        talent.setLanguage(dto.getLanguage());
        talent.setType(type);
        talent.setCategory(category);

        // 수정된 엔티티 저장
        Talent updated = talentRepository.save(talent);

        // 수정된 엔티티를 DTO로 변환하여 반환
        return toResponseDTO(updated);
    }

    /**
     * 재능 삭제 처리
     * @param talentno 삭제할 재능 고유번호
     * @throws IllegalArgumentException 삭제할 재능이 없을 경우
     */
    public void delete(Long talentno) {
        if (talentRepository.existsById(talentno)) {
            talentRepository.deleteById(talentno);
        } else {
            throw new IllegalArgumentException("삭제할 재능이 존재하지 않음: talentno=" + talentno);
        }
    }

    /**
     * 엔티티 → 리스트 조회용 DTO 변환
     * @param t 변환할 Talent 엔티티
     * @return 리스트 조회용 DTO
     */
    private TalentListDTO toListDTO(Talent t) {
        return new TalentListDTO(
                t.getTalentno(),
                t.getTitle(),
                t.getLanguage(),
                t.getCategory() != null ? t.getCategory().getName() : "없음",
                t.getType() != null ? t.getType().getName() : "없음",
                t.getUser().getUserno()
        );
    }
    
    //  특정학교내  특정카테고리 글
    public List<TalentListDTO> findBySchoolnoAndCategoryno(Long schoolno, Long categoryno) {
      return talentRepository.findBySchool_SchoolnoAndCategory_Categoryno(schoolno, categoryno)
                             .stream()
                             .map(this::toListDTO)
                             .collect(Collectors.toList());
  }
   

    

}
