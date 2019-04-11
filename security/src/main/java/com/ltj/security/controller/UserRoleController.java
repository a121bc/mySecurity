package com.ltj.security.controller;

import com.ltj.security.module.UserRole.po.UserRole;
import com.ltj.security.module.UserRole.service.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/UserRole")
public class UserRoleController {

	@Autowired
	private UserRoleService userRoleService;

	@RequestMapping("/insertOrUpdate")
	public Map<String,Object> insertOrUpdate(UserRole userRole){
        return userRoleService.insertOrUpdate(userRole);
    }

	@RequestMapping("/deleteByFid")
	public Map<String,Object> deleteByFid(Integer fid){
        return userRoleService.deleteByFid(fid);
    }

	@RequestMapping("/selectAll")
	public Map<String,Object> selectAll(){
        return userRoleService.selectAll();
    }

}