package com.ltj.security.module.Menu.service.impl;

import com.ltj.security.module.Menu.mapper.MenuMapper;
import com.ltj.security.module.Menu.po.Menu;
import com.ltj.security.module.Menu.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class MenuServiceImpl implements MenuService {

	@Autowired
	private MenuMapper menuMapper;

	@Override
	public Map<String,Object> insertOrUpdate(Menu menu) {
        Map<String, Object> map = new HashMap<>();
        Boolean flag;
        if(menu.getId()!=null){
            flag = menuMapper.updateByPrimaryKeySelective(menu)==1;
            map.put("flag",flag);
            map.put("message",flag?"修改成功！":"修改失败！");
        }else {
            flag = menuMapper.insertSelective(menu)==1;
            map.put("flag",flag);
            map.put("message",flag?"添加成功！":"添加失败！");
        }
        return map;
    }

	@Override
    public Map<String,Object> deleteByFid(Integer fid) {
        Map<String, Object> map = new HashMap<>();
        Boolean flag = menuMapper.deleteByPrimaryKey(fid)==1;
        map.put("flag",flag);
        map.put("message",flag?"删除成功！":"删除失败！");
        return map;
    }

	@Override
    public Map<String,Object> selectAll() {
        Map<String, Object> map = new HashMap<>();
        map.put("flag",false);
        map.put("message","未查询到数据！");
        List<Menu> list = menuMapper.selectAll();
        if(list.size()>0){
            map.put("flag",true);
            map.put("message","查询成功！");
        }
        map.put("list",list);
        return map;
    }

}