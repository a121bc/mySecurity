package com.ltj.security.framework.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ltj.security.framework.Util.UserUtils;
import com.ltj.security.module.User.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.*;
import org.springframework.security.config.annotation.ObjectPostProcessor;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;
import org.springframework.web.cors.CorsUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

/**
 * 描 述 springSecurity配置
 * 创 建 人 刘天珺
 * 创建时间 2019-3-15 0015 11:57
 */
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserService userService;
    @Autowired
    private CustomMetadataSource metadataSource;
    @Autowired
    private UrlAccessDecisionManager urlAccessDecisionManager;
    @Autowired
    private AuthenticationAccessDeniedHandler deniedHandler;

    private static ObjectMapper om = new ObjectMapper();
    static {
        om.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
    }

    /**
     * 这一步的配置是必不可少的，否则SpringBoot会自动配置一个AuthenticationManager,覆盖掉内存中的用户
     */
    /*@Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        AuthenticationManager manager = super.authenticationManagerBean();
        return manager;
    }*/

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(new BCryptPasswordEncoder());
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/index.html", "/static/**", "/login_p", "/favicon.ico");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().authorizeRequests()
                .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
//                .antMatchers("/oauth/*").permitAll()
                .withObjectPostProcessor(new ObjectPostProcessor<FilterSecurityInterceptor>() {
                    @Override
                    public <O extends FilterSecurityInterceptor> O postProcess(O o) {
                        o.setSecurityMetadataSource(metadataSource);
                        o.setAccessDecisionManager(urlAccessDecisionManager);
                        return o;
                    }
                })
                .and()
                .formLogin()
                .usernameParameter("username").passwordParameter("password")
                .failureHandler((HttpServletRequest req,HttpServletResponse resp,AuthenticationException e) -> {
                    resp.setContentType("application/json;charset=utf-8");
                    Map<String,Object> map = new HashMap<>();
                    map.put("flag",false);
                    if (e instanceof BadCredentialsException ||
                            e instanceof UsernameNotFoundException) {
                        map.put("message","账户名或者密码输入错误!");
                    } else if (e instanceof LockedException) {
                        map.put("message","账户被锁定，请联系管理员!");
                    } else if (e instanceof CredentialsExpiredException) {
                        map.put("message","密码过期，请联系管理员!");
                    } else if (e instanceof AccountExpiredException) {
                        map.put("message","账户过期，请联系管理员!");
                    } else if (e instanceof DisabledException) {
                        map.put("message","账户被禁用，请联系管理员!");
                    } else {
                        map.put("message","登录失败!");
                    }
                    resp.setStatus(401);

                    PrintWriter out = resp.getWriter();
                    out.write(om.writeValueAsString(map));
                    out.flush();
                    out.close();
                })
                .successHandler((HttpServletRequest req,HttpServletResponse resp,Authentication auth) ->{
                    resp.setContentType("application/json;charset=utf-8");
                    Map<String,Object> map = new HashMap<>();
                    map.put("flag",true);
                    map.put("message","登录成功!");
                    map.put("user", UserUtils.getCurrentUser());
                    PrintWriter out = resp.getWriter();
                    out.write(om.writeValueAsString(map));
                    out.flush();
                    out.close();
                })
                .permitAll()
                .and()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessHandler((HttpServletRequest req, HttpServletResponse resp, Authentication auth) -> {
                    resp.setContentType("application/json;charset=utf-8");
                    Map<String,Object> map = new HashMap<>();
                    map.put("flag",true);
                    map.put("message","注销成功!");
                    PrintWriter out = resp.getWriter();
                    out.write(om.writeValueAsString(map));
                    out.flush();
                    out.close();
                })
                .permitAll()
                .and()
                .exceptionHandling().accessDeniedHandler(deniedHandler);
    }

}
