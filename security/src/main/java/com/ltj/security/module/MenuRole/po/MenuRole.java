package com.ltj.security.module.MenuRole.po;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
public class MenuRole{
    @Id
    @GeneratedValue(generator = "JDBC")
    private Integer id;

    /* 菜单id */
    private Integer mid;

    /* 角色id */
    private Integer rid;

}