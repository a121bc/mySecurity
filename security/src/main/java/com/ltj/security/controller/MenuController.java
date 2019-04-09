package com.ltj.security.controller;

import com.ltj.security.module.Menu.po.Menu;
import com.ltj.security.module.Menu.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/Menu")
public class MenuController {

	@Autowired
	private MenuService menuService;

	@RequestMapping("/insertOrUpdate")
	public Map<String,Object> insertOrUpdate(@RequestBody Menu menu){
        return menuService.insertOrUpdate(menu);
    }

	@RequestMapping("/deleteById")
	public Map<String,Object> deleteById(@RequestParam("id") Integer id){
        return menuService.deleteByFid(id);
    }

    /**
     * @Description 查询启用的菜单
     * @param
     * @return java.util.Map<java.lang.String,java.lang.Object>
     * @author 刘天珺
     * @Date 14:31 2019-4-9 0009
     **/
	@RequestMapping("/selectAll")
	public Map<String,Object> selectAll(){
        return menuService.selectAll();
    }

    /**
     * @Description 后台-查询所有菜单
     * @param
     * @return java.util.Map<java.lang.String,java.lang.Object>
     * @author 刘天珺
     * @Date 14:32 2019-4-9 0009
     **/
	@RequestMapping("/selectAllMenu")
	public Map<String,Object> selectAllMenu(){
		return menuService.selectAllMenu();
	}

}