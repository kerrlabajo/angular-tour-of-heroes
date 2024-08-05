package com.kerrlabajo.tour_of_heroes.controller;

import com.kerrlabajo.tour_of_heroes.dao.HeroDao;
import com.kerrlabajo.tour_of_heroes.model.Hero;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/heroes")
@CrossOrigin
public class HeroController {

    @Qualifier("getHeroDao")
    @Autowired
    HeroDao heroDao;

    @GetMapping
    public List<Hero> getHeroes() {
        return heroDao.getAllHeroes();
    }
}
