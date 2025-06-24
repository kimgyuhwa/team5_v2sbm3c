package dev.mvc.team5;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**") // 모든 경로에 대해
      .allowedOrigins("http://192.168.12.141:3000") // 프론트 React 주소
      .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
      .allowCredentials(true)
      .maxAge(3600);
  }
}