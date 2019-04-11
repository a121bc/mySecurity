package com.ltj.security.module.Role.po;

import lombok.Data;

/**
 * 描 述
 * 创 建 人 刘天珺
 * 创建时间 2019-4-11 0011 13:03
 */
@Data
public class RoleCustom extends Role {
    /* 菜单ids */
    private Integer[] mids;
}
