package dev.mvc.team5.reservations;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReservationsResponseDTO {
    private Long reservationno;
    private Long userno;
    private String username; 
    private Long placeno;
    private String placename;
    private LocalDateTime start_time;
    private LocalDateTime end_time;
    private String placesinfo;
    private String status;
}
