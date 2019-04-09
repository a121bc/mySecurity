package com.ltj.security.module.Menu.mapper;

import com.ltj.security.framework.Util.MyMapper;
import com.ltj.security.module.Menu.po.Menu;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface MenuMapper extends MyMapper<Menu> {

    //获取所有菜单
    List<Menu> getAllMenu();

    //查询后台可视列表
    List<Menu> selectShowMenu(Integer id);

    //查询后台全部列表
    List<Menu> selectAllMenu(Integer id);
}