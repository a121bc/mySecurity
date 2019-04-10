package com.ltj.security.module.Role.service.impl;

import com.ltj.security.module.Role.mapper.RoleMapper;
import com.ltj.security.module.Role.po.Role;
import com.ltj.security.module.Role.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

	@Autowired
	private RoleMapper roleMapper;

	@Override
	public Map<String,Object> insertOrUpdate(Role role) {
        Map<String, Object> map = new HashMap<>();
        Boolean flag;
        if(role.getId()!=null){
            flag = roleMapper.updateByPrimaryKeySelective(role)==1;
            map.put("message",flag?"修改成功！":"修改失败！");
        }else {
            flag = roleMapper.insertSelective(role)==1;
            map.put("message",flag?"添加成功！":"添加失败！");
            map.put("obj",role);
        }
        map.put("flag",flag);
        return map;
    }

	@Override
    public Map<String,Object> deleteByFid(Integer fid) {
        Map<String, Object> map = new HashMap<>();
        Boolean flag = roleMapper.deleteByPrimaryKey(fid)==1;
        map.put("flag",flag);
        map.put("message",flag?"删除成功！":"删除失败！");
        return map;
    }

    /**
     * @Description 查询角色
     * @param
     * @return java.util.Map<java.lang.String,java.lang.Object>
     * @author 刘天珺
     * @Date 16:12 2019-4-9 0009
     **/
	@Override
    public Map<String,Object> selectAll() {
        Map<String, Object> map = new HashMap<>();
        map.put("flag",false);
        map.put("message","未查询到数据！");
        List<Role> list = roleMapper.selectAll();
        if(list.size()>0){
            map.put("flag",true);
            map.put("message","查询角色成功！");
        }
        map.put("list",list);
        return map;
    }

}