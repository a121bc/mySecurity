package com.ltj.security.framework.Util;

import com.ltj.security.module.User.po.User;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * 描 述
 * 创 建 人 刘天珺
 * 创建时间 2019-3-18 0018 16:23
 */
public class UserUtils {
    public static User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
