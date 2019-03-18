package com.ltj.security.module.User.service.impl;

import com.ltj.security.module.User.mapper.UserMapper;
import com.ltj.security.module.User.po.User;
import com.ltj.security.module.User.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserMapper userMapper;

	/**
	 * @Description 注册 修改用户
	 * @param user
	 * @return java.util.Map<java.lang.String,java.lang.Object>
	 * @author 刘天珺
	 * @Date 14:56 2019-3-15 0015
	 **/
	@Override
	public Map<String,Object> insertOrUpdate(User user) {
        Map<String, Object> map = new HashMap<>();
        Boolean flag;
        if(!StringUtils.isEmpty(user.getPassword())){//加密密码
            encryptPassword(user);
        }
        if(user.getId()!=null){
            flag = userMapper.updateByPrimaryKeySelective(user)==1;
            map.put("flag",flag);
            map.put("message",flag?"修改成功！":"修改失败！");
        }else {
            flag = userMapper.insertSelective(user)==1;
            map.put("flag",flag);
            map.put("message",flag?"添加成功！":"添加失败！");
        }
        return map;
    }

    /**
     * @Description 删除用户
     * @param fid
     * @return java.util.Map<java.lang.String,java.lang.Object>
     * @author 刘天珺
     * @Date 14:57 2019-3-15 0015
     **/
	@Override
    public Map<String,Object> deleteByFid(Integer fid) {
        Map<String, Object> map = new HashMap<>();
        Boolean flag = userMapper.deleteByPrimaryKey(fid)==1;
        map.put("flag",flag);
        map.put("message",flag?"删除成功！":"删除失败！");
        return map;
    }

    /**
     * @Description 查询所有用户
     * @param
     * @return java.util.Map<java.lang.String,java.lang.Object>
     * @author 刘天珺
     * @Date 14:57 2019-3-15 0015
     **/
	@Override
    public Map<String,Object> selectAll() {
        Map<String, Object> map = new HashMap<>();
        map.put("flag",false);
        map.put("message","未查询到数据！");
        List<User> list = userMapper.selectAll();
        if(list.size()>0){
            map.put("flag",true);
            map.put("message","查询成功！");
        }
        map.put("list",list);
        return map;
    }

    /**
     * @Description 用户登录
     * @param username
     * @return org.springframework.security.core.userdetails.UserDetails
     * @author 刘天珺
     * @Date 14:57 2019-3-15 0015
     **/
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userMapper.loadUserByUsername(username);
        if(user == null) {
            throw new UsernameNotFoundException("用户名不存在");
        }
        //user.setRoles(userMapper.getUserRolesByUid(user.getId()));
        return user;
    }

    /**
     * @Description 加密密码
     * @param user
     * @return void
     * @author 刘天珺
     * @Date 14:50 2019-3-15 0015
     **/
    private void encryptPassword(User user){
        String password = user.getPassword();
        password = new BCryptPasswordEncoder().encode(password);
        user.setPassword(password);
    }
}