package com.ltj.security.module.UserRole.mapper;

import com.ltj.security.framework.Util.MyMapper;
import com.ltj.security.module.UserRole.po.UserRole;
import com.ltj.security.module.UserRole.po.UserRoleCustom;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

@Component
public interface UserRoleMapper extends MyMapper<UserRole> {

    //新增角色关系
    Integer insertUserRoleList(UserRoleCustom userRoleCustom);

    //删除角色关系
    Integer deleteByUid(@Param("uid") Integer uid);
}