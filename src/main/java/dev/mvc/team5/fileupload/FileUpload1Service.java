package dev.mvc.team5.fileupload;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FileUpload1Service {

    private final FileUpload1Repository fileUploadRepository;
    private final String uploadDir;

    public FileUpload1Service(FileUpload1Repository fileUploadRepository) {
        this.fileUploadRepository = fileUploadRepository;

        String ci = System.getenv("CI");
        if ("true".equals(ci)) {
            this.uploadDir = "build/uploads"; // CI 환경용 상대 경로
        } else {
            this.uploadDir = "C:/kd/deploy/team5/storage/user"; // 로컬 개발용 절대 경로
        }
    }

    public FileUpload1 uploadFile(MultipartFile multipartFile, String purpose, String targetType, Long targetId) throws IOException {
        if (multipartFile.isEmpty()) return null;

        File uploadPath = new File(uploadDir);
        if (!uploadPath.exists()) {
            uploadPath.mkdirs();
        }

        String originalFileName = Paths.get(multipartFile.getOriginalFilename()).getFileName().toString();
        String storedFileName = UUID.randomUUID() + "_" + originalFileName;
        String filePath = uploadDir + File.separator + storedFileName;

        File dest = new File(filePath);
        multipartFile.transferTo(dest);

        FileUpload1 fileUpload = new FileUpload1();
        fileUpload.setOriginalFileName(originalFileName);
        fileUpload.setStoredFileName(storedFileName);
        fileUpload.setFilePath(filePath);
        fileUpload.setFileSize(multipartFile.getSize());
        fileUpload.setUploadedAt(LocalDateTime.now());
        fileUpload.setPurpose(purpose);
        fileUpload.setTargetId(targetId);
        fileUpload.setTargetType(targetType);

        return fileUploadRepository.save(fileUpload);
    }
}
