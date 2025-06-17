package dev.mvc.team5.entity.user;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "blocks")
@Data
public class Block {

    @Id
    private Integer blockno;

    @Column(nullable = false)
    private Long blockerId;

    @Column(nullable = false)
    private Long userno;

    private LocalDateTime createdAt;
}