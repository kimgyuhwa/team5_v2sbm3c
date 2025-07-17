package dev.mvc.team5.block;

import lombok.Data;

@Data
public class BlockDTO {
    private Long blockno;
    private Long blocker;   // 차단자 userno
    private Long blocked;   // 차단된 userno
    private String createdAt;
    private String  reason;
    private Boolean active = true;
}