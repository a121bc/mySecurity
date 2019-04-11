package com.ltj.security.module.User.service;

import com.ltj.security.module.User.po.User;
import com.ltj.security.module.UserRole.po.UserRoleCustom;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Map;

public interface UserService extends UserDetailsService {

	//添加或修改
	Map<String,Object> insertOrUpdate(User user);

	//根据主键删除
	Map<String,Object> deleteById(Integer id);

	//查询所有记录
	Map<String,Object> selectAll();

	//修改用户角色
    Map<String, Object> insertUserRole(UserRoleCustom userRoleCustom);
}