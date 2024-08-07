package com.kerrlabajo.tour_of_heroes.controller;

import com.kerrlabajo.tour_of_heroes.repository.HeroDao;
import com.kerrlabajo.tour_of_heroes.model.Hero;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping(params = "id")
    public Hero getHeroById(@RequestParam int id) {
        return heroDao.getHeroById(id);
    }
}
