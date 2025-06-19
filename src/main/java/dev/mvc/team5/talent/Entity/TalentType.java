package dev.mvc.team5.talent.entity;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import dev.mvc.team5.entity.user.User;
import jakarta.persistence.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "talent_type")
public class TalentType {

    /** 재능 유형 고유 번호 (기본키) */
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="type_seq")
    @SequenceGenerator(name="type_seq", sequenceName="TYPE_SEQ", allocationSize=1)
    private Long typeno;

    /** 재능 유형 이름 */
    private String name;


    /**
     * 재능 목록과 일대다 양방향 관계
     * mappedBy="type"은 Talent 엔티티 내 type 필드와 연관됨
     * cascade = ALL : 유형 삭제 시 관련된 재능들도 함께 삭제
     * orphanRemoval = true : 유형에서 제거된 재능은 DB에서 삭제
     */
    @OneToMany(mappedBy = "type", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Talent> talents = new ArrayList<>();

    /** 
     * 기본 생성자 외에,
     * 재능 유형 이름과 개수를 초기화하는 생성자
     */
    public TalentType(String name) {
        this.name = name;
    }
}
