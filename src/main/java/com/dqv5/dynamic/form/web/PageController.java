package com.dqv5.dynamic.form.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


/**
 * @author duq
 * @date 2021/9/18
 */
@Controller
@RequestMapping("/")
public class PageController {

    @GetMapping(value = {"/", "/index", "/home", "/design", "/welcome"})
    public String index() {
        return "forward:/index.html";
    }

}
