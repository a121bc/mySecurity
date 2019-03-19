package com.ltj.security.module.Menu.service;

import com.ltj.security.module.Menu.po.Menu;

import java.util.List;
import java.util.Map;

public interface MenuService {

	//添加或修改
	Map<String,Object> insertOrUpdate(Menu menu);

	//根据主键删除
	Map<String,Object> deleteByFid(Integer fid);

	//查询所有记录
	Map<String,Object> selectAll();

	//查询所有菜单
	List<Menu> getAllMenu();
}