package com.ltj.security.controller;

import com.ltj.security.module.Menu.po.Menu;
import com.ltj.security.module.Menu.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/Menu")
public class MenuController {

	@Autowired
	private MenuService menuService;

	@RequestMapping("/insertOrUpdate")
	public Map<String,Object> insertOrUpdate(Menu menu){
        return menuService.insertOrUpdate(menu);
    }

	@RequestMapping("/deleteByFid")
	public Map<String,Object> deleteByFid(Integer fid){
        return menuService.deleteByFid(fid);
    }

	@RequestMapping("/selectAll")
	public Map<String,Object> selectAll(){
        return menuService.selectAll();
    }

}