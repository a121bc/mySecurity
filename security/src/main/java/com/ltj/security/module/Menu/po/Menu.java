package com.ltj.security.module.Menu.po;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ltj.security.module.Role.po.Role;
import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.List;

@Data
public class Menu{
    @Id
    @GeneratedValue(generator = "JDBC")
    private Integer id;

    /* 请求路径规则 */
//    @JsonIgnore
    private String url;

    /* 路由path */
    private String path;

    /* 组件名称 */
    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    private Object component;

    /* 组件名 */
    private String name;

    /* 菜单图标 */
    private String iconcls;

    /* 切换菜单时是否保活 */
    private Boolean keepalive;

    /* 是否登录后才能访问 */
    private Boolean requireauth;

    /* 父菜单id */
    private Integer parentid;

    /* 是否可用 */
    private Boolean enabled;

    /* 角色List */
    @JsonIgnore
    private List<Role> roles;

    /* 子菜单 */
    private List<Menu> children;

}