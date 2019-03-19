package com.ltj.security.module.MenuRole.service.impl;
import com.ltj.security.module.MenuRole.mapper.MenuRoleMapper;
import com.ltj.security.module.MenuRole.service.MenuRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MenuRoleServiceImpl implements MenuRoleService {

	@Autowired
	private MenuRoleMapper menuroleMapper;


}