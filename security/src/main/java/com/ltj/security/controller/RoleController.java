package com.ltj.security.controller;

import com.ltj.security.module.Role.po.Role;
import com.ltj.security.module.Role.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/Role")
public class RoleController {

	@Autowired
	private RoleService roleService;

	@RequestMapping("/insertOrUpdate")
	public Map<String,Object> insertOrUpdate(@RequestBody Role role){
        return roleService.insertOrUpdate(role);
    }

	@RequestMapping("/deleteById")
	public Map<String,Object> deleteByFid(@RequestParam("id") Integer id){
        return roleService.deleteByFid(id);
    }

	@RequestMapping("/selectAll")
	public Map<String,Object> selectAll(){
        return roleService.selectAll();
    }

}