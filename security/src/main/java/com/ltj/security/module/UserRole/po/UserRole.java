package com.ltj.security.module.UserRole.po;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Data
public class UserRole{
    @Id
    @GeneratedValue(generator = "JDBC")
    private Integer id;

    /* 用户表id */
    private Integer uid;

    /* 角色表id */
    private Integer rid;

    /* 操作日期 */
    private Date modifydate;

}