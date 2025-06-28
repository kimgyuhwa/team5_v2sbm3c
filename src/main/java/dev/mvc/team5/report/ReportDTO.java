package dev.mvc.team5.report;

import lombok.Data;

@Data
public class ReportDTO {
    private Long reportno;
    private Long reporter;  // 신고자 userno
    private Long reported;  // 신고 대상 userno
    private String reason;
    private String reportType;
    private Integer targetId;
    private String createdAt;
    private String status;
}