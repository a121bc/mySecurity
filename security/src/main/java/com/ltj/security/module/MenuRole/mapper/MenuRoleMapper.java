package com.ltj.security.module.MenuRole.mapper;

import com.ltj.security.framework.Util.MyMapper;
import com.ltj.security.module.MenuRole.po.MenuRole;
import com.ltj.security.module.Role.po.RoleCustom;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

@Component
public interface MenuRoleMapper extends MyMapper<MenuRole> {

    //批量添加菜单角色
    boolean insertMenuRoles(RoleCustom roleCustom);

    int deleteByRid(@Param("rid") Integer rid);
}