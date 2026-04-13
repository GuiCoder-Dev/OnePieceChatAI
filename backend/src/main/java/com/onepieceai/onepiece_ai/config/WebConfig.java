package com.onepieceai.onepiece_ai.config;


import com.onepieceai.onepiece_ai.service.consumptionApiService;
import com.onepieceai.onepiece_ai.service.dtos.CharacterRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Description;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import javax.validation.constraints.NotNull;
import java.util.function.Function;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(@NotNull CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:8080/", "http://localhost:3000/")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    @Description("Caso necessário, busca detalhes sobre os personagens de One Piece, como nomes, recompensas e Akuma no Mi")
    public Function<CharacterRequest, String> onePieceCallApiTool(consumptionApiService service) {
        return service::OnePieceApi;
    }


}
