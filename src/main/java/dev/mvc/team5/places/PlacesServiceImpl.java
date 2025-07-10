package dev.mvc.team5.places;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import dev.mvc.team5.schoolgwan.SchoolGwan;
import dev.mvc.team5.schoolgwan.SchoolGwanRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlacesServiceImpl implements PlacesService {

    private final PlacesRepository placesRepository;
    private final SchoolGwanRepository schoolGwanRepository;

    @Override
    public Places save(PlacesDTO dto) {
        SchoolGwan schoolGwan = schoolGwanRepository.findById(dto.getSchoolgwanno())
                .orElseThrow(() -> new IllegalArgumentException("학교관 정보가 존재하지 않습니다."));
        
     // 시간 겹침 검사
        List<Places> overlaps = placesRepository.findOverlappingPlaces(
                dto.getSchoolgwanno(),
                dto.getStart_time(),
                dto.getEnd_time()
        );

        if (!overlaps.isEmpty()) {
            throw new IllegalStateException("해당 시간에 이미 등록된 강의실이 있습니다.");
        }
        Places place = new Places(
                schoolGwan,
                dto.getPlacename(),
                dto.getHosu(),
                dto.getStart_time(),
                dto.getEnd_time()
        );
        return placesRepository.save(place);
    }

    @Override
    public Optional<Places> findById(Long placeId) {
        return placesRepository.findById(placeId);
    }

    @Override
    public List<Places> findAll() {
        return placesRepository.findAll();
    }

    @Override
    public Places update(Long placeId, PlacesDTO dto) {
        Places place = placesRepository.findById(placeId)
                .orElseThrow(() -> new IllegalArgumentException("강의실이 존재하지 않습니다."));

        SchoolGwan schoolGwan = schoolGwanRepository.findById(dto.getSchoolgwanno())
                .orElseThrow(() -> new IllegalArgumentException("학교관 정보가 존재하지 않습니다."));

        place.setSchoolGwan(schoolGwan);
        place.setPlacename(dto.getPlacename());
        place.setHosu(dto.getHosu());
        place.setStart_time(dto.getStart_time());
        place.setEnd_time(dto.getEnd_time());

        return placesRepository.save(place);
    }

    @Override
    public void delete(Long placeId) {
        placesRepository.deleteById(placeId);
    }

    //강의실 이름 검색
    @Override
    public List<Places> searchByPlacename(String keyword) {
        return placesRepository.findByPlacenameContaining(keyword);
    }

    //학교관 에 잇는 강의실만 볼수 있게
    @Override
    public List<PlacesDTO> findBySchoolGwanNo(Long schoolgwanno) {
        return placesRepository.findBySchoolGwan_Schoolgwanno(schoolgwanno)
            .stream()
            .map(entity -> {
                PlacesDTO dto = new PlacesDTO();
                dto.setPlaceno(entity.getPlaceno());
                dto.setPlacename(entity.getPlacename());
                dto.setHosu(entity.getHosu());
                dto.setStart_time(entity.getStart_time());
                dto.setEnd_time(entity.getEnd_time());
                dto.setSchoolgwanno(entity.getSchoolGwan().getSchoolgwanno());
                return dto;
            })
            .collect(Collectors.toList());
    }
    // 상세보기
    public Optional<PlacesDTO> findByPlaceno(Long placeno) {
      return placesRepository.findById(placeno)
          .map(place -> {
              PlacesDTO dto = new PlacesDTO();
              dto.setPlaceno(place.getPlaceno());
              dto.setPlacename(place.getPlacename());
              dto.setHosu(place.getHosu());
              dto.setStart_time(place.getStart_time());
              dto.setEnd_time(place.getEnd_time());
              dto.setSchoolgwanno(place.getSchoolGwan().getSchoolgwanno());
              return dto;
          });
  }

    
//    @Override
//    public List<PlacesDTO> findPlacesBySchoolno(Long schoolno) {
//        return placesRepository.findBySchoolgwan_School_Schoolno(schoolno)
//                               .stream()
//                               .map(this::toDTO)
//                               .collect(Collectors.toList());
//    }
    @Override
    public List<PlacesDTO> findBySchoolno(Long schoolno) {
        return placesRepository.findBySchoolGwan_School_Schoolno(schoolno)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }
    
    @Override
    public List<PlacesDTO> findBySchoolnoAndSchoolgwanno(Long schoolno, Long schoolgwanno) {
        return placesRepository
                .findBySchoolGwan_School_SchoolnoAndSchoolGwan_Schoolgwanno(schoolno, schoolgwanno)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private PlacesDTO toDTO(Places entity) {
        PlacesDTO dto = new PlacesDTO();
        dto.setPlaceno(entity.getPlaceno());
        dto.setPlacename(entity.getPlacename());
        dto.setHosu(entity.getHosu());
        dto.setStart_time(entity.getStart_time());
        dto.setEnd_time(entity.getEnd_time());
        dto.setSchoolgwanno(entity.getSchoolGwan().getSchoolgwanno());
        dto.setSchoolgwanname(entity.getSchoolGwan().getSchoolgwanname());
        return dto;
    }
    
    
}
