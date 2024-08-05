package com.kerrlabajo.tour_of_heroes.dao;

import com.kerrlabajo.tour_of_heroes.model.Hero;

import java.util.List;

public interface HeroDao {
    List<Hero> getAllHeroes();

    Hero getHeroById(int id);

    Hero addHero(Hero hero);

    Hero updateHero(Hero hero);

    Hero deleteHero(int id);

}
