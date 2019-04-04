package com.ltj.security.module.User.mapper;

import com.ltj.security.framework.Util.MyMapper;
import com.ltj.security.module.Role.po.Role;
import com.ltj.security.module.User.po.User;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface UserMapper extends MyMapper<User> {

    //根据用户名登陆
    User loadUserByUsername(String username);

    //根据用户id查询角色列表
    List<Role> getUserRolesByUid(Integer id);

    //查询所有用户
    List<User> selectAllUser();
}