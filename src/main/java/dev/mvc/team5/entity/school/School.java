package dev.mvc.team5.entity.school;

import java.util.ArrayList;
import java.util.List;

import dev.mvc.team5.entity.talents.Talent;
import dev.mvc.team5.entity.user.User;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@Entity
@Table(name = "school")
@Data // Getter, Setter, toString 자동 생성
public class School {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="school_seq")
    @SequenceGenerator(name="school_seq", sequenceName="SCHOOL_SEQ", allocationSize=1)
    private Long schoolno;

    @Column(name = "schoolname", length = 50)
    private String schoolname;
    

    // 양방향: School ↔ Users
    @OneToMany(mappedBy = "school", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<User> users = new ArrayList<>();
    
    // 양방향: School ↔ talents
    @OneToMany(mappedBy = "school", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Talent> talents = new ArrayList<>();
    
    // 양방향: School ↔ schoolgwan
    @OneToMany(mappedBy = "school", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SchoolGwan> schoolgwan = new ArrayList<>();
    
    public void addUser(User userno) {
      users.add(userno);
      userno.setSchool(this);

  }
    
    /**
     * 생성자
     * @param schoolname
     */
    public School(String schoolname) {
      this.schoolname = schoolname;
  }

    
//  @NoArgsConstructor로 기본 생성자 삭제 가능
//  public School() {
//    
//  }
}

