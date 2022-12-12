DROP database  if exists webdaejeon8th;
create database webdaejeon8th;
use webdaejeon8th;
DROP TABLE  if exists transaction;
DROP TABLE  if exists userFavor;
DROP TABLE  if exists member;

CREATE TABLE `transaction` (`apt` VARCHAR(100),`floor` VARCHAR(10),`area` VARCHAR(100),`jibun` VARCHAR(100),`dong` VARCHAR(100),`transactionAmount` VARCHAR(100),`sigunguCode` VARCHAR(100));
create table userFavor(    id varchar(100),    code varchar(100),    dong varchar(100),    primary key(id,code,dong));
create table member(
    id varchar(100) primary key,
    pw varchar(100),
    name varchar(100),
    adr varchar(100)
);