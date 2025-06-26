package dev.mvc.team5.reservations;

import java.util.List;

public interface ReservationsService {
	
    ReservationsResponseDTO create(ReservationsRequestDTO dto);
    
    ReservationsResponseDTO read(Long reservationno);
    
    List<ReservationsResponseDTO> listAll();
    
    ReservationsResponseDTO update(Long reservationno, ReservationsRequestDTO dto);
    
    void delete(Long reservationno);
    
}
