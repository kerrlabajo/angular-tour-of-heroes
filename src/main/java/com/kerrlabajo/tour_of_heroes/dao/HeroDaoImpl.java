package com.kerrlabajo.tour_of_heroes.dao;

import com.kerrlabajo.tour_of_heroes.model.Hero;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class HeroDaoImpl implements HeroDao{

    JdbcTemplate jdbcTemplate;

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<Hero> getAllHeroes() {
        return List.of();
    }

    @Override
    public Hero getHeroById(int id) {
        return null;
    }

    @Override
    public Hero addHero(Hero hero) {
        return null;
    }

    @Override
    public Hero updateHero(Hero hero) {
        return null;
    }

    @Override
    public Hero deleteHero(int id) {
        return null;
    }
}