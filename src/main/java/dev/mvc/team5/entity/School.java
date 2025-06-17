package dev.mvc.team5.entity;

import java.util.ArrayList;
import java.util.List;

import dev.mvc.team5.entity.user.User;
import jakarta.persistence.*;
import lombok.*;

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
    @OneToMany(mappedBy = "schoolno", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<User> users = new ArrayList<>();
    
    public School() {
      
    }


    public void addUser(User userno) {
      users.add(userno);
      userno.setSchoolno(this);
  }
    
    /**
     * 생성자
     * @param schoolname
     */
    public School(String schoolname) {
      this.schoolname = schoolname;
  }


}

