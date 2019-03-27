package com.ltj.security.framework.config2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.ObjectPostProcessor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;

@Configuration
@EnableResourceServer
public class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {

	private static final String RESOURCE_ID = "my_rest_api";

	@Autowired
	CustomMetadataSource metadataSource;
	@Autowired
	UrlAccessDecisionManager urlAccessDecisionManager;

	@Override
	public void configure(ResourceServerSecurityConfigurer resources) {
		resources.resourceId(RESOURCE_ID).stateless(false);
	}

	@Override
	public void configure(HttpSecurity http) throws Exception {
		/*http.
			anonymous().disable()
			.authorizeRequests()
			.antMatchers("/User/**").denyAll()
			.antMatchers("/Menu/**").access("hasRole('ADMIN')")
			.and().exceptionHandling().accessDeniedHandler(new OAuth2AccessDeniedHandler());*/

		http.authorizeRequests()
				.anyRequest().authenticated()
				.withObjectPostProcessor(new ObjectPostProcessor<FilterSecurityInterceptor>() {
					@Override
					public <O extends FilterSecurityInterceptor> O postProcess(O o) {
						o.setSecurityMetadataSource(metadataSource);
						o.setAccessDecisionManager(urlAccessDecisionManager);
						return o;
					}
				});
//				.and().csrf().disable();

	}

}