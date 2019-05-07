package com.ltj.security.module.MenuRole.service.impl;
import com.ltj.security.framework.Util.UserUtils;
import com.ltj.security.module.MenuRole.mapper.MenuRoleMapper;
import com.ltj.security.module.MenuRole.service.MenuRoleService;
import com.ltj.security.module.Role.po.RoleCustom;
import com.ltj.security.module.User.po.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
public class MenuRoleServiceImpl implements MenuRoleService {

	@Autowired
	private MenuRoleMapper menuRoleMapper;

	/**
	 * @Description 批量添加菜单角色
	 * @param roleCustom
	 * @return java.util.Map<java.lang.String,java.lang.Object>
	 * @author 刘天珺
	 * @Date 17:06 2019-5-3 0003
	 **/
	@Override
	public Map<String, Object> insertMenuRoles(RoleCustom roleCustom) {
		Map<String, Object> map = new HashMap<>();
		boolean flag = false;
		if(roleCustom != null){
			Integer[] mids = roleCustom.getMids();
			if(mids != null && mids.length>0){
				User currentUser = UserUtils.getCurrentUser();
				if(currentUser != null){
					roleCustom.setModify_userid(currentUser.getId());
				}
				menuRoleMapper.deleteByRid(roleCustom.getId());
				flag = menuRoleMapper.insertMenuRoles(roleCustom);
			}
		}
		map.put("flag",flag);
		map.put("message",flag?"修改成功！":"修改失败！");

		return map;
	}
}