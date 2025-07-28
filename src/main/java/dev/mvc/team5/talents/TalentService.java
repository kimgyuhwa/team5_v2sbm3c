package dev.mvc.team5.talents;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import dev.mvc.team5.block.BlockService;
import dev.mvc.team5.file.FileUpload;
import dev.mvc.team5.file.FileUploadDTO;
import dev.mvc.team5.file.FileUploadRepository;
import dev.mvc.team5.school.School;
import dev.mvc.team5.school.SchoolRepository;
import dev.mvc.team5.talentcategory.TalentCategory;
import dev.mvc.team5.talentcategory.TalentCategoryRepository;
import dev.mvc.team5.talents.talentdto.TalentCreateDTO;
import dev.mvc.team5.talents.talentdto.TalentDetailDTO;
import dev.mvc.team5.talents.talentdto.TalentListDTO;
import dev.mvc.team5.talents.talentdto.TalentResponseDTO;
import dev.mvc.team5.talents.talentdto.TalentUpdateDTO;
import dev.mvc.team5.talenttype.TalentType;
import dev.mvc.team5.talenttype.TalentTypeRepository;
import dev.mvc.team5.user.User;
import dev.mvc.team5.user.UserRepository;
import jakarta.transaction.Transactional;

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
    
    @Autowired
    private FileUploadRepository fileUploadRepository;
    
    @Autowired
    private BlockService blockService;

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
                t.getPrice(),
                t.getViewCount(),
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

        // --- 파일 업로드 리스트 처리 추가 ---
        if (dto.getFileInfos() != null && !dto.getFileInfos().isEmpty()) {
            List<FileUpload> files = dto.getFileInfos().stream()
                    .map(fileDto -> {
                        FileUpload file = new FileUpload();
                        file.setOriginalFileName(fileDto.getOriginalFileName());
                        file.setStoredFileName(fileDto.getStoredFileName());
                        file.setFilePath(fileDto.getFilePath());
                        file.setFileSize(fileDto.getFileSize());
                        file.setTargetType(fileDto.getTargetType());
                        file.setTalent(talent);
                        file.setProfile(fileDto.getProfile());

                        // Talent 엔티티와 연관관계 설정
                        file.setTalent(talent);
                        return file;
                    })
                    .collect(Collectors.toList());
            talent.setFiles(files);
        }
        // ---------------------------------------

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
     * @param schoolno 학교 번호
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
    @Transactional
    public TalentResponseDTO update(TalentUpdateDTO dto, Long loggedInUserNo) {
        // 수정 대상 엔티티 조회
        Talent talent = talentRepository.findById(dto.getTalentno())
                .orElseThrow(() -> new IllegalArgumentException("재능이 존재하지 않음"));

        // 권한 체크
        if (!talent.getUser().getUserno().equals(loggedInUserNo)) {
            throw new SecurityException("수정 권한이 없습니다.");
        }

        // 타입, 카테고리 객체 설정
        TalentType type = new TalentType();
        type.setTypeno(dto.getTypeno());

        TalentCategory category = new TalentCategory();
        category.setCategoryno(dto.getCategoryno());

        // 기본 정보 업데이트
        talent.setTitle(dto.getTitle());
        talent.setDescription(dto.getDescription());
        talent.setPrice(dto.getPrice());
        talent.setType(type);
        talent.setCategory(category);

        // 기존 파일 DB에서 삭제
        fileUploadRepository.deleteByTalent_Talentno(dto.getTalentno());

        // 기존 files 컬렉션 비우기
        talent.getFiles().clear();

        // 새 파일 리스트가 있다면 기존 컬렉션에 추가
        if (dto.getFileInfos() != null && !dto.getFileInfos().isEmpty()) {
            List<FileUpload> files = dto.getFileInfos().stream()
                    .map(fileDto -> {
                        FileUpload file = new FileUpload();
                        file.setOriginalFileName(fileDto.getOriginalFileName());
                        file.setStoredFileName(fileDto.getStoredFileName());
                        file.setFilePath(fileDto.getFilePath());
                        file.setFileSize(fileDto.getFileSize());
                        file.setTargetType(fileDto.getTargetType());
                        file.setTalent(talent);
                        file.setProfile(fileDto.getProfile());
                        return file;
                    })
                    .collect(Collectors.toList());

            talent.getFiles().addAll(files);
        }

        // 엔티티 저장 및 DTO 반환
        Talent updated = talentRepository.save(talent);
        return toResponseDTO(updated);
    }


    /**
     * 재능 삭제 처리
     * @param talentno 삭제할 재능 고유번호
     * @throws IllegalArgumentException 삭제할 재능이 없을 경우
     */
    public void delete(Long talentno, Long loggedInUserNo) {
      Talent talent = talentRepository.findById(talentno)
              .orElseThrow(() -> new IllegalArgumentException("삭제할 재능이 존재하지 않음: talentno=" + talentno));

      if (!talent.getUser().getUserno().equals(loggedInUserNo)) {
          throw new SecurityException("삭제 권한이 없습니다.");
      }

      talentRepository.deleteById(talentno);
  }


    /**
     * 엔티티 → 리스트 조회용 DTO 변환
     * @param t 변환할 Talent 엔티티
     * @return 리스트 조회용 DTO
     */
    private TalentListDTO toListDTO(Talent t) {
        List<FileUploadDTO> fileDTOs = null;
        if (t.getFiles() != null) {
            fileDTOs = t.getFiles().stream().map(file -> new FileUploadDTO(
                    file.getFileno(),
                    file.getOriginalFileName(),
                    file.getStoredFileName(),
                    file.getFilePath(),
                    file.getFileSize(),
                    file.getProfile(),
                    file.getTargetType(),
                    file.getTalent() != null ? file.getTalent().getTalentno() : null
            )).collect(Collectors.toList());
        }

        return new TalentListDTO(
                t.getTalentno(),
                t.getTitle(),
                t.getDescription(),
                t.getPrice(),
                t.getViewCount(),
                t.getCategory() != null ? t.getCategory().getCateGrp().getName() : "없음",
                t.getCategory() != null ? t.getCategory().getName() : "없음",
                t.getType() != null ? t.getType().getName() : "없음",
                t.getUser().getUserno(),
                t.getUser().getUsername(),
                fileDTOs,
                false
        );
    }

    /**
     * 특정 학교 내 특정 카테고리 글 조회
     * @param schoolno 학교 번호
     * @param categoryno 카테고리 번호
     * @return 재능 리스트를 담은 DTO 리스트
     */
    public List<TalentListDTO> findBySchoolnoAndCategoryno(Long schoolno, Long categoryno) {
        return talentRepository.findBySchool_SchoolnoAndCategory_Categoryno(schoolno, categoryno)
                .stream()
                .map(this::toListDTO)
                .collect(Collectors.toList());
    }

    /**
     * 재능 상세 조회 (필요시)
     * @param talentno 재능 번호
     * @return 재능 상세 DTO
     */
    @Transactional
    public TalentDetailDTO getTalentDetail(Long talentno) {
        return talentRepository.findDetailByTalentno(talentno);
        // Optional 처리하거나 없으면 예외 처리 필요
    }
    
    @Transactional
    public TalentDetailDTO getTalentDetailWithFiles(Long talentno) {
        Optional<Talent> optionalTalent = talentRepository.findByIdWithFiles(talentno);
        if (optionalTalent.isEmpty()) {
            throw new IllegalArgumentException("재능이 존재하지 않음");
        }
        Talent t = optionalTalent.get();
        
        // 조회수 증가
        t.setViewCount(t.getViewCount() + 1);

        List<FileUploadDTO> fileDTOs = t.getFiles().stream()
            .map(file -> new FileUploadDTO(
                file.getFileno(),
                file.getOriginalFileName(),
                file.getStoredFileName(),
                file.getFilePath(),
                file.getFileSize(),
                file.getProfile(),
                file.getTargetType(),
                t.getTalentno()))
            .collect(Collectors.toList());

        TalentDetailDTO dto = new TalentDetailDTO(
            t.getTalentno(),
            t.getUser() != null ? t.getUser().getUserno() : null,
            t.getType() != null ? t.getType().getName() : null,
            t.getCategory() != null && t.getCategory().getCateGrp() != null ? t.getCategory().getCateGrp().getName() : null,
            t.getCategory() != null ? t.getCategory().getName() : null,
            t.getTitle(),
            t.getDescription(),
            t.getPrice(),
            t.getViewCount(),
            t.getUser() != null ? t.getUser().getUsername() : null,
            t.getCreatedAt(),
            t.getUpdatedAt()
        );

        dto.setTypeno(t.getType() != null ? t.getType().getTypeno() : null);
        dto.setCateGrpno(t.getCategory() != null && t.getCategory().getCateGrp() != null ? t.getCategory().getCateGrp().getCateGrpno() : null);
        dto.setCategoryno(t.getCategory() != null ? t.getCategory().getCategoryno() : null);
        dto.setFileInfos(fileDTOs);

        dto.setName(t.getUser() != null ? t.getUser().getName() : null);
        dto.setEmail(t.getUser() != null ? t.getUser().getEmail() : null);
        dto.setProfileImage(t.getUser() != null ? t.getUser().getProfileImage() : null);

        return dto;
    }

    
    /**
     * 제목 또는 설명에 키워드가 포함된 재능 리스트 조회 (페이징 + 정렬)
     * @param keyword 검색어 (null 또는 빈 문자열일 경우 전체 조회)
     * @param categoryno 카테고리 번호
     * @param schoolno 학교 번호
     * @param page 페이지 번호 (0부터 시작)
     * @param size 페이지 당 데이터 개수
     * @param loggedInUserno 로그인한 사용자의 userno (⭐ 파라미터 추가 ⭐)
     * @return 페이징된 DTO 리스트
     */
    public Page<TalentListDTO> searchTalents(String keyword, Long cateGrpno, Long categoryno, Long schoolno, int page, int size, Long loggedInUserno) { // ⭐ loggedInUserno 파라미터 추가 ⭐
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "talentno"));

        Page<Talent> talentPage;

        // --- 이 부분이 핵심 수정입니다! ---
        if (categoryno != null) { // 1. 소분류 번호가 들어온 경우 (가장 구체적인 필터이므로 최우선)
          // cateGrpno가 함께 왔더라도, categoryno가 있으면 이 단일 categoryno로만 필터링합니다.
          talentPage = talentRepository.searchWithFilters( // 이 메소드가 단일 categoryno를 받도록 되어 있음
              (keyword == null || keyword.trim().isEmpty()) ? null : keyword.trim(),
              categoryno, // 단일 categoryno 필터를 사용
              schoolno,
              pageable
          );
      } else if (cateGrpno != null) { // 2. 소분류 번호는 없고 대분류 번호만 들어온 경우
          // 해당 대분류에 속하는 모든 소분류를 포함하여 검색합니다.
          talentPage = talentRepository.findByCategorynosInAndFilters(
              cateRepository.findCategorynosByCateGrpno(cateGrpno), // 대분류에 속한 모든 소분류 ID를 가져옴
              (keyword == null || keyword.trim().isEmpty()) ? null : keyword.trim(),
              schoolno,
              pageable
          );
      } else if ((keyword != null && !keyword.trim().isEmpty()) || schoolno != null) { // 3. 카테고리 필터 없이 다른 필터만 들어온 경우
          // cateGrpno, categoryno 모두 없고, keyword 또는 schoolno가 있는 경우
          // 이 경우는 talentRepository.searchWithFilters가 categoryno=null로 호출됩니다.
          talentPage = talentRepository.searchWithFilters(
              (keyword == null || keyword.trim().isEmpty()) ? null : keyword.trim(),
              null, // categoryno는 없음
              schoolno,
              pageable
          );
      } else { // 4. 아무 필터도 없는 경우 (전체 조회)
          talentPage = talentRepository.findAll(pageable);
      }

        // ⭐ 핵심 수정 부분: 람다 표현식으로 DTO 변환 및 isBlocked 설정 ⭐
        return talentPage.map(talent -> {
            TalentListDTO dto = toListDTO(talent); // toListDTO를 사용하여 기본 DTO 생성

            Long currentTalentUserno = (talent.getUser() != null) ? talent.getUser().getUserno() : null;

            // 로그인한 사용자가 존재하고, 현재 재능 글 작성자와 로그인한 사용자가 다르다면
            // (즉, 본인 글이 아닐 경우에만 차단 여부 확인)
            if (loggedInUserno != null && currentTalentUserno != null && !loggedInUserno.equals(currentTalentUserno)) {
                // ⭐ 내가 상대방을 차단했는지 여부만 확인 ⭐
                boolean isBlockedByMe = blockService.isBlocked(loggedInUserno, currentTalentUserno); 
                dto.setBlocked(isBlockedByMe); // ⭐ isBlockedByMe 값으로 바로 설정 ⭐

                // 디버그 로그 (필요시 사용)
                System.out.println("--- 재능 ID 처리 중: " + talent.getTalentno() + " ---");
                System.out.println("  재능 작성자 Userno: " + currentTalentUserno);
                System.out.println("  로그인된 Userno: " + loggedInUserno);
                System.out.println("  나의 차단 여부 (" + loggedInUserno + " -> " + currentTalentUserno + "): " + isBlockedByMe);
                System.out.println("  최종 차단 상태 (재능 ID " + talent.getTalentno() + "): " + dto.isBlocked());
                System.out.println(isBlockedByMe);

            } else {
                dto.setBlocked(false); // 본인 글이거나 로그인되지 않은 경우 차단되지 않은 것으로 간주
                // 디버그 로그 (필요시 사용)
                System.out.println("  본인 글이거나 비로그인 상태. 재능 ID " + talent.getTalentno() + "의 차단 상태: false");
            }
            return dto;
        });
    }
    
    /**
     * 마이페이지 전용: 로그인한 사용자의 게시물만 검색 + 필터 + 페이징
     */
    public Page<TalentListDTO> searchMyTalents(String keyword, Long categoryno, Long schoolno, int page, int size, Long userno) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "talentno"));

        Page<Talent> talentPage = talentRepository.searchWithFilters(
            (keyword == null || keyword.trim().isEmpty()) ? null : keyword.trim(),
            categoryno,
            schoolno,
            userno, 
            pageable
        );

        return talentPage.map(this::toListDTO); // 마이페이지용은 block 여부 처리할 필요 없음
    }
    
    public long countTalentsByUserno(Long userno) {
      return talentRepository.countByUser_Userno(userno);
  }
    
    public List<TalentListDTO> findTalentsByUserno(Long userno) {
      List<Talent> list = talentRepository.findByUser_Userno(userno);
      return list.stream().map(this::toListDTO).toList();
  }



    public Page<Talent> findTalentsByCateGrp(Long cateGrpno, String keyword, Long schoolno, Pageable pageable) {
      List<Long> categorynos = cateRepository.findCategorynosByCateGrpno(cateGrpno);
      if (categorynos.isEmpty()) {
          return Page.empty();
      }
      return talentRepository.findByCategorynosInAndFilters(categorynos, keyword, schoolno, pageable);
  }
    
    public Talent getEntityById(Long talentno) {
        return talentRepository.findById(talentno)
            .orElseThrow(() -> new IllegalArgumentException("재능이 존재하지 않습니다. talentno = " + talentno));
    }




}
