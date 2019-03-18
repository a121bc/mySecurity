package com.ltj.security.module.Role.service;

import com.ltj.security.module.Role.po.Role;

import java.util.Map;

public interface RoleService {

	//添加或修改
	Map<String,Object> insertOrUpdate(Role role);

	//根据主键删除
	Map<String,Object> deleteByFid(Integer fid);

	//查询所有记录
	Map<String,Object> selectAll();


}