package com.ltj.security.controller;

import com.ltj.security.module.Role.po.Role;
import com.ltj.security.module.Role.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/Role")
public class RoleController {

	@Autowired
	private RoleService roleService;

	@RequestMapping("/insertOrUpdate")
	public Map<String,Object> insertOrUpdate(Role role){
        return roleService.insertOrUpdate(role);
    }

	@RequestMapping("/deleteByFid")
	public Map<String,Object> deleteByFid(Integer fid){
        return roleService.deleteByFid(fid);
    }

	@RequestMapping("/selectAll")
	public Map<String,Object> selectAll(){
        return roleService.selectAll();
    }

}