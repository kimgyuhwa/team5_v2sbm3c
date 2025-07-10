package dev.mvc.team5.talents.talentdto;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import dev.mvc.team5.file.FileUploadDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class TalentDetailDTO {
    private Long talentno;
    private String typeName;
    private String categoryName;
    private String title;
    private String description;
    private String userName; // 게시물 작성자
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd HH:mm")
    private LocalDateTime createdAt;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd HH:mm")
    private LocalDateTime updatedAt;    
    private List<FileUploadDTO> fileInfos;
    
    public TalentDetailDTO(Long talentno, String typeName, String categoryName, String title,
        String description, String userName,
        LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.talentno = talentno;
        this.typeName = typeName;
        this.categoryName = categoryName;
        this.title = title;
        this.description = description;
        this.userName = userName;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        // fileInfos는 JPQL select 구문에 없으므로 null 처리 가능
        this.fileInfos = fileInfos;
    }

    
}
