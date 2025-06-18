package dev.mvc.team5.entity.talents;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

import dev.mvc.team5.entity.user.User;
import jakarta.persistence.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "talent_type")
public class TalentType {

  @Id
  @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="type_seq")
  @SequenceGenerator(name="type_seq", sequenceName="type_seq", allocationSize=1)
    private Long typeno;

    private String name;

    private Integer cnt;
    
    // 양방향: Type ↔ Talent
    @OneToMany(mappedBy = "type", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Talent> talents = new ArrayList<>();
    
    // 생성자
    public TalentType(String name, Integer cnt) {
      this.name=name;
      this.cnt=cnt;
    }
}
