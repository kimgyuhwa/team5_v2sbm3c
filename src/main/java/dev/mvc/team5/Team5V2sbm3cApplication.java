package dev.mvc.team5;

//import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
//@ComponentScan(basePackages = {"dev.mvc"})
//@MapperScan(basePackages = "dev.mvc.team5.mybatis.mapper")         // MyBatis 매퍼 위치
@EnableJpaRepositories(basePackages = "dev.mvc.team5.repository") // JPA 리포지토리 위치

public class Team5V2sbm3cApplication {

	public static void main(String[] args) {
		SpringApplication.run(Team5V2sbm3cApplication.class, args);
	}

}
