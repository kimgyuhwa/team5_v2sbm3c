package dev.mvc.team5;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

@SpringBootApplication
@ComponentScan(basePackages = {"dev.mvc"}) 
public class Team5V2sbm3cApplication {

	public static void main(String[] args) {
		SpringApplication.run(Team5V2sbm3cApplication.class, args);
	}

}
