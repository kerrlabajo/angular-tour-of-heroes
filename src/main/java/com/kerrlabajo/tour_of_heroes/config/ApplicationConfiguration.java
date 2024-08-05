package com.kerrlabajo.tour_of_heroes.config;

import com.kerrlabajo.tour_of_heroes.repository.HeroDao;
import com.kerrlabajo.tour_of_heroes.repository.HeroDaoImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
@ComponentScan(basePackages = "com.kerrlabajo.tour_of_heroes")
@PropertySource(value = "classpath:application.properties")
public class ApplicationConfiguration {

    @Value("${spring.datasource.driver-class-name}")
    private String driverClassName;

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dMDS = new DriverManagerDataSource();
        dMDS.setDriverClassName(driverClassName);
        dMDS.setUrl(url);
        dMDS.setUsername(username);
        dMDS.setPassword(password);
        return dMDS;
    }

    @Bean
    public JdbcTemplate jdbcTemplate() {
        return new JdbcTemplate(dataSource());
    }

    @Bean
    public HeroDao getHeroDao() {
        return new HeroDaoImpl();
    }
}
