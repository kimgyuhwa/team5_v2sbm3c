package dev.mvc.team5.entity.user;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "blocks")
@Data
public class Block {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="block_seq")
    @SequenceGenerator(name="block_seq", sequenceName="BLOCK_SEQ", allocationSize=1)
    private Integer blockno;

    @ManyToOne
    @JoinColumn(name = "blocker")
    private User blocker;

    @ManyToOne
    @JoinColumn(name = "blocked")
    private User blocked;

    private LocalDateTime createdAt;
}