package com.ltj.security.module.User.po;

import lombok.Data;

import java.util.List;

/**
 * 描 述
 * 创 建 人 刘天珺
 * 创建时间 2019-4-11 0011 09:26
 */
@Data
public class UserCustom extends User {

    /* 角色ids */
    private Integer[] rids;
}
