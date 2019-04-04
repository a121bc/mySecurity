package com.ltj.security.controller;

import com.ltj.security.module.User.po.User;
import com.ltj.security.module.User.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/User")
public class UserController {

	@Autowired
	private UserService userService;

	@RequestMapping("/insertOrUpdate")
	public Map<String,Object> insertOrUpdate(@RequestBody User user){
        return userService.insertOrUpdate(user);
    }

	@RequestMapping("/deleteById")
	public Map<String,Object> deleteByFid(@RequestParam("id") Integer id){
        return userService.deleteById(id);
    }

	@RequestMapping("/selectAll")
	public Map<String,Object> selectAll(){
		return userService.selectAll();
    }

}