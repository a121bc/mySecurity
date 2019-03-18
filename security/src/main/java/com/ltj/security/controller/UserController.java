package com.ltj.security.controller;

import com.ltj.security.module.User.po.User;
import com.ltj.security.module.User.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/User")
public class UserController {

	@Autowired
	private UserService userService;

	@RequestMapping("/insertOrUpdate")
	public Map<String,Object> insertOrUpdate(User user){
        return userService.insertOrUpdate(user);
    }

	@RequestMapping("/deleteByFid")
	public Map<String,Object> deleteByFid(Integer fid){
        return userService.deleteByFid(fid);
    }

	@RequestMapping("/selectAll")
	public Map<String,Object> selectAll(){
        return userService.selectAll();
    }

}