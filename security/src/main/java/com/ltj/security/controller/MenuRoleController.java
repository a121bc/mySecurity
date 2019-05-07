package com.ltj.security.controller;

import com.ltj.security.module.MenuRole.service.MenuRoleService;
import com.ltj.security.module.Role.po.RoleCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * 描 述 角色菜单管理
 * 创 建 人 刘天珺
 * 创建时间 2019-5-3 0003 16:59
 */
@RestController
@RequestMapping("/MenuRole")
public class MenuRoleController {

    @Autowired
    private MenuRoleService menuRoleService;

    /**
     * @Description 批量添加菜单角色
     * @param roleCustom
     * @return java.util.Map<java.lang.String,java.lang.Object>
     * @author 刘天珺
     * @Date 17:04 2019-5-3 0003
     **/
    @RequestMapping("/insertMenuRoles")
    public Map<String,Object> insertMenuRoles(@RequestBody RoleCustom roleCustom){
        return menuRoleService.insertMenuRoles(roleCustom);
    }

}
