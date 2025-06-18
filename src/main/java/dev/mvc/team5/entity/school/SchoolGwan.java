package dev.mvc.team5.entity.school;

import dev.mvc.team5.entity.school.School;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "schoolgwan")
@Data
@NoArgsConstructor
public class SchoolGwan {
	
	
  /**
   * 학교관 번호
   * @param schoolgwanno 
   */
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "schoolgwan_seq")
    @SequenceGenerator(name = "schoolgwan_seq", sequenceName = "SCHOOLGWAN_SEQ", allocationSize = 1)
    @Column(name = "schoolgwanno")
    private Long schoolgwanno;

    /**
     * 학교테이블 학교번호
     * @param schoolno
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schoolno", nullable = false)
    private School school;

    /**
     * 학교관 이름
     * @param schoolgwanname
     */
    @Column(name = "schoolgwanname", columnDefinition = "TEXT")
    private String schoolgwanname;
    
    
    
    // 생성자
    public SchoolGwan(School school, String schoolgwanname) {
        this.school = school;
        this.schoolgwanname = schoolgwanname;
    }
}
