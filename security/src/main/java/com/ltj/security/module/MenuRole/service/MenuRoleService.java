package com.ltj.security.module.MenuRole.service;

import com.ltj.security.module.Role.po.RoleCustom;

import java.util.Map;

public interface MenuRoleService {

    //批量添加菜单角色
    Map<String, Object> insertMenuRoles(RoleCustom roleCustom);
}