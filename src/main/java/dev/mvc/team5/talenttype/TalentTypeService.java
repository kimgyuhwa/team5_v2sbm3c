package dev.mvc.team5.talenttype;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service; 

import dev.mvc.team5.talenttype.talenttypedto.TalentTypeCreateDTO; 
import dev.mvc.team5.talenttype.talenttypedto.TalentTypeResponseDTO;
import dev.mvc.team5.talenttype.talenttypedto.TalentTypeUpdateDTO;

@Service 
public class TalentTypeService {

  @Autowired 
  TalentTypeRepository typeRepository;
  
  /**
   * 타입 정보를 저장하는 메서드
   * @param dto 클라이언트로부터 전달받은 생성용 DTO (TalentTypeCreateDTO)
   * @return 저장된 엔티티를 응답용 DTO로 변환하여 반환
   */
  public TalentTypeResponseDTO save(TalentTypeCreateDTO dto) {
    TalentType type = dto.toEntity(); // DTO를 엔티티로 변환
    TalentType saved = typeRepository.save(type); // 변환된 엔티티를 DB에 저장
    
    return toTypeResponseDTO(saved); // 저장된 엔티티를 응답 DTO로 변환하여 반환
  }
  
  /**
   * TalentType 엔티티를 TalentTypeResponseDTO로 변환하는 헬퍼 메서드
   * @param t 변환할 TalentType 엔티티
   * @return 응답용 DTO 객체
   */
  private TalentTypeResponseDTO toTypeResponseDTO(TalentType t) {
    return new TalentTypeResponseDTO(
        t.getTypeno() != null ? t.getTypeno() : null, // null 체크 후 typeno 반환
        t.getName() // 엔티티의 name 필드 값 반환
        );
  }
  
  public TalentTypeResponseDTO update(TalentTypeUpdateDTO dto) {
    // typeno로 기존 데이터 조회
    TalentType existing = typeRepository.findById(dto.getTypeno())
                               .orElseThrow(() -> new RuntimeException("해당 타입이 존재하지 않습니다."));

    // 변경할 값만 업데이트
    existing.setName(dto.getName());
    // 저장
    TalentType updated = typeRepository.save(existing);
    // DTO로 변환해서 반환
    return toTypeResponseDTO(updated);
}
  
  
  public void delete(Long typeno) {
    // 1) 해당 typeno가 DB에 존재하는지 확인 (선택 사항)
    boolean exists = typeRepository.existsById(typeno);
    if (!exists) {
        throw new RuntimeException("삭제할 타입이 존재하지 않습니다.");
    }

    // 2) 삭제 수행
    typeRepository.deleteById(typeno);
}

  
  
}
