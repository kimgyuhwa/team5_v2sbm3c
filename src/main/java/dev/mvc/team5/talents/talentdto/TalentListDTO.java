package dev.mvc.team5.talents.talentdto;

import java.util.List;

import dev.mvc.team5.file.FileUploadDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class TalentListDTO {
    private Long talentno;
    private String title;
    private String description;
    private String categoryName;
    private String typeName;
    private Long userno; // 게시물 작성자
    
    private List<FileUploadDTO> fileInfos;
}
