package com.ltj.security.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * 描 述
 * 创 建 人 刘天珺
 * 创建时间 2019-3-18 0018 16:51
 */
@RestController
public class RegLoginController {
    @RequestMapping("/login_p")
    public Map<String,Object> login() {
        Map<String,Object> map = new HashMap<>();
        map.put("flag",false);
        map.put("message","尚未登录，请登录!");
        return map;
    }
    @GetMapping("/employee/advanced/hello")
    public String hello() {
        return "hello";
    }    @GetMapping("/employee/basic/hello")
    public String basicHello() {
        return "basicHello";
    }
}
