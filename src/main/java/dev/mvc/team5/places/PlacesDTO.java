package dev.mvc.team5.places;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class PlacesDTO {
    private Long placeno;
    private String placename;
    private String hosu;
    private LocalDateTime start_time;
    private LocalDateTime end_time;
    private Long schoolgwanno;  // SchoolGwan의 PK
}
