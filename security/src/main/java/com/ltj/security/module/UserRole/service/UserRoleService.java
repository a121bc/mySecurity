package com.ltj.security.module.UserRole.service;

import com.ltj.security.module.UserRole.po.UserRole;

import java.util.Map;

public interface UserRoleService {

	//添加或修改
	Map<String,Object> insertOrUpdate(UserRole userrole);

	//根据主键删除
	Map<String,Object> deleteByFid(Integer fid);

	//查询所有记录
	Map<String,Object> selectAll();


}