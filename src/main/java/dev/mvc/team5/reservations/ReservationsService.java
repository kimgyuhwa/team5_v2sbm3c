package dev.mvc.team5.reservations;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationsService {
	
    ReservationsResponseDTO create(ReservationsRequestDTO dto);
    
    ReservationsResponseDTO read(Long reservationno);
    
    List<ReservationsResponseDTO> listAll();
    
    ReservationsResponseDTO update(Long reservationno, ReservationsRequestDTO dto);
    
    void delete(Long reservationno);

    // chatbot 예약
    List<Reservations> findConflict(Long placeno, LocalDateTime start, LocalDateTime end);



}
