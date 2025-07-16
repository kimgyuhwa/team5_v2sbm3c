package dev.mvc.team5.reservations;

import dev.mvc.team5.places.Places;
import dev.mvc.team5.places.PlacesRepository;
import dev.mvc.team5.user.User;
import dev.mvc.team5.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationsServiceImpl implements ReservationsService {

    private final ReservationsRepository reservationsRepository;
    private final UserRepository userRepository;
    private final PlacesRepository placesRepository;

    @Override
    public ReservationsResponseDTO create(ReservationsRequestDTO dto) {
    	
      Places place = placesRepository.findById(dto.getPlaceno())
          .orElseThrow(() -> new IllegalArgumentException("장소 없음"));
    	


      // 2. 이미 겹치는 예약이 있으면 안 됨
      List<Reservations> conflict = reservationsRepository.findConflict(
          dto.getPlaceno(), dto.getStart_time(), dto.getEnd_time());

      if (!conflict.isEmpty()) {
          throw new IllegalArgumentException("해당 시간에는 이미 예약이 존재합니다.");
      }
      
        User user = userRepository.findById(dto.getUserno())
                .orElseThrow(() -> new IllegalArgumentException("사용자 없음"));

        Reservations reservation = new Reservations(
                user,
                place,
                dto.getStart_time(),
                dto.getEnd_time(),
                dto.getPlacesinfo(),
                dto.getStatus()
        );

        Reservations saved = reservationsRepository.save(reservation);
        return toResponseDTO(saved);
    }


    
    @Override
    public ReservationsResponseDTO read(Long reservationno) {
        Reservations reservation = reservationsRepository.findById(reservationno)
                .orElseThrow(() -> new IllegalArgumentException("예약 정보 없음"));
        return toResponseDTO(reservation);
    }

    @Override
    public List<ReservationsResponseDTO> listAll() {
        return reservationsRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ReservationsResponseDTO update(Long reservationno, ReservationsRequestDTO dto) {
        Reservations reservation = reservationsRepository.findById(reservationno)
                .orElseThrow(() -> new IllegalArgumentException("예약 정보 없음"));

        User user = userRepository.findById(dto.getUserno())
                .orElseThrow(() -> new IllegalArgumentException("사용자 없음"));
        Places place = placesRepository.findById(dto.getPlaceno())
                .orElseThrow(() -> new IllegalArgumentException("장소 없음"));

        reservation.setUser(user);
        reservation.setPlace(place);
        reservation.setStart_time(dto.getStart_time());
        reservation.setEnd_time(dto.getEnd_time());
        reservation.setPlacesinfo(dto.getPlacesinfo());
        reservation.setStatus(dto.getStatus());

        return toResponseDTO(reservationsRepository.save(reservation));
    }
    


    
    @Override
    public void delete(Long reservationno) {
        reservationsRepository.deleteById(reservationno);
    }
    
    
    
    private ReservationsResponseDTO toResponseDTO(Reservations r) {
        ReservationsResponseDTO dto = new ReservationsResponseDTO();
        dto.setReservationno(r.getReservationno());
        dto.setUserno(r.getUser().getUserno());
        dto.setUsername(r.getUser().getName()); // 필요시 엔티티에 getName() 추가
        dto.setPlaceno(r.getPlace().getPlaceno());
        dto.setPlacename(r.getPlace().getPlacename());
        dto.setStart_time(r.getStart_time());
        dto.setEnd_time(r.getEnd_time());
        dto.setPlacesinfo(r.getPlacesinfo());
        dto.setStatus(r.getStatus());
        return dto;
    }
    
}
