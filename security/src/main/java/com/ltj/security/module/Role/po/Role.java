package com.ltj.security.module.Role.po;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Data
public class Role{
    @Id
    @GeneratedValue(generator = "JDBC")
    private Integer id;

    /* 角色名 */
    private String name;

    /* 中文名 */
    private String namezh;

    /* 操作人id */
    private Integer modify_userid;

    /* 操作日期 */
    private Date modifydate;

}