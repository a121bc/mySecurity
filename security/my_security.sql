/*
 Navicat Premium Data Transfer

 Source Server         : 本地数据库
 Source Server Type    : MySQL
 Source Server Version : 50723
 Source Host           : localhost:3306
 Source Schema         : my_security

 Target Server Type    : MySQL
 Target Server Version : 50723
 File Encoding         : 65001

 Date: 11/04/2019 10:47:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `url` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '请求路径规则',
  `path` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '路由path',
  `component` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '组件名称',
  `name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '组件名',
  `iconCls` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单图标',
  `keepAlive` tinyint(1) NULL DEFAULT NULL COMMENT '切换菜单时是否保活',
  `requireAuth` tinyint(1) NULL DEFAULT 1 COMMENT '是否登录后才能访问',
  `parentId` int(11) NULL DEFAULT 1 COMMENT '父菜单id',
  `enabled` tinyint(1) NULL DEFAULT 1 COMMENT '是否可用',
  `modify_userid` int(11) NULL DEFAULT NULL COMMENT '创建人id',
  `modifydate` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '操作日期',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES (1, '/', NULL, NULL, '所有', NULL, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `menu` VALUES (2, '/', '/home', 'Home', '员工资料', 'fa fa-user-circle-o', NULL, 1, 1, 0, NULL, NULL);
INSERT INTO `menu` VALUES (3, '/', '/home', 'Home', '人事管理', 'fa fa-address-card-o', NULL, 1, 1, 0, NULL, NULL);
INSERT INTO `menu` VALUES (4, '/', '/home', 'Home', '薪资管理', 'fa fa-money', NULL, 1, 1, 0, NULL, NULL);
INSERT INTO `menu` VALUES (5, '/', '/home', 'Home', '统计管理', 'fa fa-bar-chart', NULL, 1, 1, 0, NULL, NULL);
INSERT INTO `menu` VALUES (6, '/', '/home', 'Home', '系统管理', 'fa fa-windows', NULL, 1, 1, 0, NULL, NULL);
INSERT INTO `menu` VALUES (7, '/employee/basic/**', '/emp/basic', 'EmpBasic', '基本资料', NULL, NULL, 1, 2, 0, NULL, NULL);
INSERT INTO `menu` VALUES (8, '/employee/advanced/**', '/emp/adv', 'EmpAdv', '高级资料', NULL, NULL, 1, 2, 0, NULL, NULL);
INSERT INTO `menu` VALUES (9, '/personnel/emp/**', '/per/emp', 'PerEmp', '员工资料', NULL, NULL, 1, 3, 0, NULL, NULL);
INSERT INTO `menu` VALUES (10, '/personnel/ec/**', '/per/ec', 'PerEc', '员工奖惩', NULL, NULL, 1, 3, 0, NULL, NULL);
INSERT INTO `menu` VALUES (11, '/personnel/train/**', '/per/train', 'PerTrain', '员工培训', NULL, NULL, 1, 3, 0, NULL, NULL);
INSERT INTO `menu` VALUES (12, '/personnel/salary/**', '/per/salary', 'PerSalary', '员工调薪', NULL, NULL, 1, 3, 0, NULL, NULL);
INSERT INTO `menu` VALUES (13, '/personnel/remove/**', '/per/mv', 'PerMv', '员工调动', NULL, NULL, 1, 3, 0, NULL, NULL);
INSERT INTO `menu` VALUES (14, '/salary/sob/**', '/sal/sob', 'SalSob', '工资账套管理', NULL, NULL, 1, 4, 0, NULL, NULL);
INSERT INTO `menu` VALUES (15, '/salary/sobcfg/**', '/sal/sobcfg', 'SalSobCfg', '员工账套设置', NULL, NULL, 1, 4, 0, NULL, NULL);
INSERT INTO `menu` VALUES (16, '/salary/table/**', '/sal/table', 'SalTable', '工资表管理', NULL, NULL, 1, 4, 0, NULL, NULL);
INSERT INTO `menu` VALUES (17, '/salary/month/**', '/sal/month', 'SalMonth', '月末处理', NULL, NULL, 1, 4, 0, NULL, NULL);
INSERT INTO `menu` VALUES (18, '/salary/search/**', '/sal/search', 'SalSearch', '工资表查询', NULL, NULL, 1, 4, 0, NULL, NULL);
INSERT INTO `menu` VALUES (19, '/statistics/all/**', '/sta/all', 'StaAll', '综合信息统计', NULL, NULL, 1, 5, 0, NULL, NULL);
INSERT INTO `menu` VALUES (20, '/statistics/score/**', '/sta/score', 'StaScore', '员工积分统计', NULL, NULL, 1, 5, 0, NULL, NULL);
INSERT INTO `menu` VALUES (21, '/statistics/personnel/**', '/sta/pers', 'StaPers', '人事信息统计', NULL, NULL, 1, 5, 0, NULL, NULL);
INSERT INTO `menu` VALUES (22, '/statistics/recored/**', '/sta/record', 'StaRecord', '人事记录统计', NULL, NULL, 1, 5, 0, NULL, NULL);
INSERT INTO `menu` VALUES (23, '/system/basic/**', '/sys/basic', 'SysBasic', '基础信息设置', NULL, NULL, 1, 6, 0, NULL, NULL);
INSERT INTO `menu` VALUES (24, '/system/cfg/**', '/sys/cfg', 'SysCfg', '系统管理', NULL, NULL, 1, 6, 0, NULL, NULL);
INSERT INTO `menu` VALUES (25, '/system/log/**', '/sys/log', 'SysLog', '操作日志管理', NULL, NULL, 1, 6, 0, NULL, NULL);
INSERT INTO `menu` VALUES (26, '/system/hr/**', '/sys/hr', 'SysHr', '操作员管理', NULL, NULL, 1, 6, 0, NULL, NULL);
INSERT INTO `menu` VALUES (27, '/system/data/**', '/sys/data', 'SysData', '备份恢复数据库', NULL, NULL, 1, 6, 0, NULL, NULL);
INSERT INTO `menu` VALUES (28, '/system/init/**', '/sys/init', 'SysInit', '初始化数据库', NULL, NULL, 1, 6, 0, NULL, NULL);
INSERT INTO `menu` VALUES (31, '/User/**', 'app.user', 'User', '用户管理', 'icon-user icon text-success-lter', NULL, 1, 1, 1, NULL, NULL);
INSERT INTO `menu` VALUES (32, '/Role/**', 'app.role', 'Role', '角色管理', 'icon-badge icon text-success-lter', NULL, 1, 1, 1, NULL, NULL);
INSERT INTO `menu` VALUES (33, '/Menu/**', 'app.menu', 'Menu', '菜单管理', 'glyphicon glyphicon-list text-success-lter', NULL, 1, 1, 1, NULL, NULL);

-- ----------------------------
-- Table structure for menu_role
-- ----------------------------
DROP TABLE IF EXISTS `menu_role`;
CREATE TABLE `menu_role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `mid` int(11) NULL DEFAULT NULL COMMENT '菜单id',
  `rid` int(11) NULL DEFAULT NULL COMMENT '角色id',
  `modify_userid` int(11) NULL DEFAULT NULL COMMENT '创建人id',
  `modifydate` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '操作日期',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu_role
-- ----------------------------
INSERT INTO `menu_role` VALUES (1, 1, 1, NULL, NULL);
INSERT INTO `menu_role` VALUES (2, 3, 2, NULL, NULL);
INSERT INTO `menu_role` VALUES (3, 29, 1, NULL, NULL);
INSERT INTO `menu_role` VALUES (4, 31, 1, NULL, NULL);

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色名',
  `nameZh` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '中文名',
  `modify_userid` int(11) NULL DEFAULT NULL COMMENT '创建人id',
  `modifydate` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '操作日期',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '角色表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, 'ROLE_ADMIN', '超级管理员', NULL, '2019-03-27 09:50:21');
INSERT INTO `role` VALUES (2, 'ROLE_TEST', '测试角色', 1, '2019-03-27 09:50:29');
INSERT INTO `role` VALUES (3, 'ROLE_TEST3', '角色3', NULL, '2019-04-10 15:11:32');
INSERT INTO `role` VALUES (4, 'ROEL_TEST4', '角色4', NULL, '2019-04-10 15:11:52');
INSERT INTO `role` VALUES (5, 'ROLE_TEST12', '测试1', NULL, '2019-04-08 15:44:58');
INSERT INTO `role` VALUES (7, 'ROLE_TE002', '买买买', NULL, '2019-04-08 17:08:09');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户姓名',
  `sex` int(11) NULL DEFAULT NULL COMMENT '性别 0-女 1-男',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号码',
  `username` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `enabled` tinyint(1) NULL DEFAULT 1 COMMENT '是否启用',
  `locked` tinyint(1) NULL DEFAULT 0 COMMENT '是否锁定',
  `modify_userid` int(11) NULL DEFAULT NULL COMMENT '创建人id',
  `modifydate` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '操作日期',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', 1, '18322069238', 'liu', '$2a$10$1xYvNaEghOScabzFLrFTZ.8zGyXzqq7s.4bbDcjuZTtn4vdWcUSam', 1, 0, 1, '2019-03-27 16:33:17');
INSERT INTO `user` VALUES (2, '小明', 1, '15200000000', 'xm', '$2a$10$1xYvNaEghOScabzFLrFTZ.8zGyXzqq7s.4bbDcjuZTtn4vdWcUSam', 1, 0, 1, '2019-03-27 16:34:47');
INSERT INTO `user` VALUES (3, '小刚', 1, '15600000000', 'xg', '$2a$10$1xYvNaEghOScabzFLrFTZ.8zGyXzqq7s.4bbDcjuZTtn4vdWcUSam', 1, 0, 1, '2019-03-27 16:34:59');
INSERT INTO `user` VALUES (4, '小李', 1, '18212345678', 'xiaoli', '$2a$10$NRyxcZAHgcf6kBhiHGQRBeE9CtZZb50An.JD9ISlOW5/CyMe8AoBi', 1, 0, NULL, '2019-04-04 15:06:49');
INSERT INTO `user` VALUES (13, '管理员155', 1, '18255555555', 'admin', '$2a$10$FaljlU80eKbbJzrnnQGzQuF.IYKmtnCaYLtwYc.z1M2.oBSpuMbgW', 1, 0, NULL, '2019-04-04 17:19:52');
INSERT INTO `user` VALUES (14, '测试', 1, '18211111111', 'test1', '$2a$10$qHtzuPuvrTlMM5Mwsj.k2eQ03qY/Hb0xcYo1JrekSL3GYSof0ODnm', 1, 0, NULL, '2019-04-04 17:21:02');

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uid` int(11) NULL DEFAULT NULL COMMENT '用户表id',
  `rid` int(11) NULL DEFAULT NULL COMMENT '角色表id',
  `modify_userid` int(11) NULL DEFAULT NULL COMMENT '创建人id',
  `modifydate` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '操作日期',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户-角色关系表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES (4, 4, 2, NULL, NULL);
INSERT INTO `user_role` VALUES (15, 1, 1, NULL, '2019-04-11 10:45:32');
INSERT INTO `user_role` VALUES (16, 3, 2, NULL, '2019-04-11 10:45:44');
INSERT INTO `user_role` VALUES (17, 2, 2, NULL, '2019-04-11 10:45:50');
INSERT INTO `user_role` VALUES (18, 2, 7, NULL, '2019-04-11 10:45:50');
INSERT INTO `user_role` VALUES (19, 13, 5, NULL, '2019-04-11 10:46:03');

-- ----------------------------
-- Triggers structure for table menu
-- ----------------------------
DROP TRIGGER IF EXISTS `menu_updateDate`;
delimiter ;;
CREATE TRIGGER `menu_updateDate` BEFORE INSERT ON `menu` FOR EACH ROW set new.modifydate = now()
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table menu_role
-- ----------------------------
DROP TRIGGER IF EXISTS `menuRole_updateDate`;
delimiter ;;
CREATE TRIGGER `menuRole_updateDate` BEFORE INSERT ON `menu_role` FOR EACH ROW set new.modifydate = now()
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table role
-- ----------------------------
DROP TRIGGER IF EXISTS `role_createDate`;
delimiter ;;
CREATE TRIGGER `role_createDate` BEFORE INSERT ON `role` FOR EACH ROW set new.modifydate = now()
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table user
-- ----------------------------
DROP TRIGGER IF EXISTS `user_createDate`;
delimiter ;;
CREATE TRIGGER `user_createDate` BEFORE INSERT ON `user` FOR EACH ROW set new.modifydate = now()
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table user_role
-- ----------------------------
DROP TRIGGER IF EXISTS `userRole_updatedate`;
delimiter ;;
CREATE TRIGGER `userRole_updatedate` BEFORE INSERT ON `user_role` FOR EACH ROW set new.modifydate = now()
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
