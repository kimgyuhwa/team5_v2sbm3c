package dev.mvc.team5.file;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "file_uploads")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FileUpload {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="file_seq")
    @SequenceGenerator(name="file_seq", sequenceName="FILE_SEQ", allocationSize=1)
    private Long fileno;

    // 업로드 원본 파일명
    @Column(nullable = false)
    private String originalFileName;

    // 서버에 저장된 파일명 (UUID 등)
    @Column(nullable = false)
    private String storedFileName;

    // 저장 경로 (ex: /uploads/user/uuid.png)
    @Column(nullable = false)
    private String filePath;

    // 파일 크기 (bytes)
    private Long fileSize;

    // 업로드된 시간
    @CreationTimestamp
    private LocalDateTime uploadedAt;

    // 다형성의 핵심: 어떤 객체에 연결된 파일인지 나타내는 필드들
    @Column(nullable = false)
    private String targetType;  // 예: "user", "talent"

    @Column(nullable = false)
    private Long targetId;      // ex) userno, talentno

    // 용도 구분 필드: 프로필, 썸네일, 첨부 등
    private String profile;     // 예: "profile", "attachment"
    
    private String postfile;     // 예: "profile", "attachment"
}
