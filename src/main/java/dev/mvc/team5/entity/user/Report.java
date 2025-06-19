package dev.mvc.team5.entity.user;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

import dev.mvc.team5.tool.RequestStatus;

@Entity
@Table(name = "reports")
@Data
public class Report {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="report_seq")
    @SequenceGenerator(name="report_seq", sequenceName="REPORT_SEQ", allocationSize=1)
    private Integer reportno;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reporter")
    private User reporter;  // 신고자

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reported")
    private User reported;  // 신고당한 사용자

    @Lob
    @Column(nullable = false)
    private String reason;

    @Column(length = 50)
    private String reportType;

    private Integer targetId;

    private LocalDateTime createdAt;

    @Column(length = 20)
    private String status = RequestStatus.PENDING;
    
    
}