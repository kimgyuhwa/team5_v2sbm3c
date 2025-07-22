package dev.mvc.team5.reservations;

import dev.mvc.team5.places.Places;
import dev.mvc.team5.places.PlacesRepository;
import dev.mvc.team5.user.User;
import dev.mvc.team5.user.UserRepository;
import jakarta.transaction.Transactional;
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

        // 여기서 place 객체로 전달해야 함
        List<Reservations> conflict = reservationsRepository.findConflicts(
            place, dto.getStart_time(), dto.getEnd_time());

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
                dto.getPurpose(),
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
        reservation.setPurpose(dto.getPurpose());
        reservation.setStatus(dto.getStatus());

        return toResponseDTO(reservationsRepository.save(reservation));
    }
    
    
    @Override
    @Transactional
    public void cancelReservation(Long reservationno) {
        Reservations reservation = reservationsRepository.findById(reservationno)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 예약번호입니다: " + reservationno));
        reservation.setStatus("취소됨");
        reservationsRepository.save(reservation);
    }
    
    // chatbot 예약
    @Override
    public List<Reservations> findChatConflict(Long placeno, LocalDateTime start, LocalDateTime end) {
        return reservationsRepository.findChatConflicts(placeno, start, end);
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
        dto.setPurpose(r.getPurpose());
        dto.setStatus(r.getStatus());
        return dto;
    }




		@Override
		public List<Reservations> findConflict(Places placeno, LocalDateTime start, LocalDateTime end) {
			// TODO Auto-generated method stub
			return null;
		}
    
		@Override
		public List<Reservations> findByPlace(Long placeno) {
		    return reservationsRepository.findByPlace_Placeno(placeno);
		}




    @Override
    public List<ReservationsResponseDTO> findByUser(Long userno) {
        return reservationsRepository.findByUser_Userno(userno)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

		// 엔티티 → DTO 변환 메서드
		private ReservationsResponseDTO convertToDTO(Reservations reservation) {
		    ReservationsResponseDTO dto = new ReservationsResponseDTO();
		    dto.setReservationno(reservation.getReservationno());
		    dto.setUserno(reservation.getUser().getUserno());
		    dto.setUsername(reservation.getUser().getUsername());  // getUsername() 메서드 User에 정의돼 있어야 함
		    dto.setPlaceno(reservation.getPlace().getPlaceno());
		    dto.setPlacename(reservation.getPlace().getPlacename());
		    
		    // schoolgwan이 Places → SchoolGwan 객체 안에 있다고 가정
		    if (reservation.getPlace().getSchoolGwan() != null) {
		        dto.setSchoolgwanname(reservation.getPlace().getSchoolGwan().getSchoolgwanname());
		    } else {
		        dto.setSchoolgwanname("");
		    }
		    
		    dto.setStart_time(reservation.getStart_time());
		    dto.setEnd_time(reservation.getEnd_time());
		    dto.setPurpose(reservation.getPurpose());
		    dto.setStatus(reservation.getStatus());
		    
		    return dto;
		}
    
}
