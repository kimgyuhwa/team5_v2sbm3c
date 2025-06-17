package dev.mvc.team5.entity.talents;

import lombok.*;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import dev.mvc.team5.entity.school.School;
import dev.mvc.team5.entity.user.User;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "talents")
public class Talent {

    /**
     * 재능 게시물 고유 번호 (기본키)
     * 시퀀스(talent_seq)를 통해 자동 생성됨
     */
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "talent_seq")
    @SequenceGenerator(name = "talent_seq", sequenceName = "talent_seq", allocationSize = 1)
    @Column(name = "talentno")
    private Long talentno;

    /**
     * 재능을 등록한 사용자 (작성자)
     * User 엔티티와 다대일 관계 (ManyToOne)
     */
    @ManyToOne
    @JoinColumn(name = "userno")
    private User userno;

    /**
     * 재능 유형 (예: 악기, 언어 등)
     * TalentType 엔티티와 다대일 관계
     */
    @ManyToOne
    @JoinColumn(name = "typeno")
    private TalentType typeno;

    /**
     * 재능 카테고리
     * TalentCategory 엔티티와 다대일 관계
     */
    @ManyToOne
    @JoinColumn(name = "categoryno")
    private TalentCategory categoryno;

    /**
     * 재능과 연관된 학교 정보
     * School 엔티티와 다대일 관계
     */
    @ManyToOne
    @JoinColumn(name = "schoolno")
    private School schoolno;

    /**
     * 재능 제목 (게시글 제목)
     */
    private String title;

    /**
     * 재능 설명 (게시글 내용)
     */
    private String description;

    /**
     * 재능 언어 (예: Korean, English 등)
     */
    private String language;

    /**
     * 게시물 등록 일시
     * 엔티티 생성 시 자동으로 현재 시간 저장
     */
    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    /**
     * 게시물 수정 일시
     * 엔티티 수정 시 자동으로 현재 시간 갱신
     */
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // 양방향: Talent ↔ Request
    @OneToMany(mappedBy = "talentno", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Request> requests = new ArrayList<>();
    
 // 양방향: Talent ↔ Match
    @OneToMany(mappedBy = "talentno", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Match> matches = new ArrayList<>();

    
    
    /**
     * 생성자: 필수 정보로 객체 생성할 때 사용
     * 시퀀스, 생성/수정 시간은 자동 처리되므로 포함하지 않음
     *
     * @param user 작성자 User 객체
     * @param type 재능 유형 TalentType 객체
     * @param category 재능 카테고리 TalentCategory 객체
     * @param school 관련 학교 School 객체
     * @param title 게시글 제목
     * @param description 게시글 내용
     * @param language 사용 언어
     */
    public Talent(User userno, School schoolno, // TalentType type, TalentCategory category,
                  String title, String description, String language) {
        this.userno = userno;
//        this.type = type;
//        this.category = category;
        this.schoolno = schoolno;
        this.title = title;
        this.description = description;
        this.language = language;
    }
   


}
