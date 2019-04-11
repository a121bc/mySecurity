package com.ltj.security.module.Role.mapper;

import com.ltj.security.framework.Util.MyMapper;
import com.ltj.security.module.Role.po.Role;
import com.ltj.security.module.Role.po.RoleCustom;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface RoleMapper extends MyMapper<Role> {

    //查询所有角色和关联菜单ids
    List<RoleCustom> selectAllRoleMenu();
}