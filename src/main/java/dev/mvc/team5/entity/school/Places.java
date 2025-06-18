package dev.mvc.team5.entity.school;

import dev.mvc.team5.entity.user.User;
import dev.mvc.team5.entity.school.SchoolGwan;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "places")
@Data
@NoArgsConstructor
public class Places {
		
	
  /**
   * placeno
   * @param 강의실 번호
   */
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "places_seq")
    @SequenceGenerator(name = "places_seq", sequenceName = "PLACES_SEQ", allocationSize = 1)
    @Column(name = "placeno")
    private Long placeno;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userno", nullable = false)
    private User userno;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schoolgwan", nullable = false)
    private SchoolGwan schoolGwan;
    
    /**
     * placename
     * @param 강의실 이름
     */
    @Column(name = "placename", length = 100)
    private String placename;
    
    /**
     * placename
     * @param 강의실 호수
     */
    @Column(name = "hosu", length = 100)
    private String hosu;

    public Places(User userno, SchoolGwan schoolGwan, String placename, String hosu) {
        this.userno = userno;
        this.schoolGwan = schoolGwan;
        this.placename = placename;
        this.hosu = hosu;
    }
}
