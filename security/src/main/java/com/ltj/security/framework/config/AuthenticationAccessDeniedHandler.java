package com.ltj.security.framework.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

/**
 * 描 述 返回授权失败的信息
 * 创 建 人 刘天珺
 * 创建时间 2019-3-18 0018 14:30
 */
@Component
public class AuthenticationAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse resp,
                       AccessDeniedException accessDeniedException) throws IOException, ServletException {
        resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
        resp.setContentType("application/json;charset=UTF-8");
        PrintWriter out = resp.getWriter();
        Map<String,Object> map = new HashMap<>();
        map.put("flag",false);
        map.put("msg","权限不足，请联系管理员!");
        out.write(new ObjectMapper().writeValueAsString(map));
        out.flush();
        out.close();
    }
}
