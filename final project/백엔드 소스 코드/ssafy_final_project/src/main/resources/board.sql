create database if not exists `ssafy_final_project`;
use ssafy_final_project;
create table if not exists fileInfo(
	id bigint primary key auto_increment,
    userID text not null,
    FileName text not null,
    SaveFileName text not null,
    FilePath text not null,
    ContentType text,
    FileSize bigint,
    RegisterDate datetime
);
create table if not exists article(
	id bigint primary key auto_increment,
    userID text not null,
    title text not null,
    content text,
    RegisterDate datetime not null,
    service_name text not null,
    service_item_id text not null,
    views bigint,
    
    AptId text,
    AptName text,
    AptSidoVal text,
	AptGugunVal text,
    AptDong text,
    AptJibun text
);

create table if not exists member(
	userID varchar(100) primary key not null,
	userPW varchar(100) not null,
	userName varchar(100) not null,
	userAddr varchar(100) not null
);

create table if not exists building(
	id int primary key auto_increment,
	sigunguCode varchar(500) not null,
	AptName varchar(500) not null,
	AptFloor varchar(500) not null,
	AptSize varchar(500) not null,
	AptDong varchar(500) not null,
    AptJibun varchar(500) not null,
	AptPrice varchar(500) not null,
	latY varchar(500) not null,
	latX varchar(500) not null,
    sidoVal text not null,
    gugunVal text not null
);

create table if not exists park(
	id bigint(20) primary key auto_increment,
    P_PARK varchar(500),
    P_LIST_CONTENT varchar(3000),
    AREA varchar(500),
    VISIT_ROAD varchar(3000),
    P_ZONE varchar(500),
    P_ADMINTEL varchar(500),
    P_ADDR varchar(500),
    LONGITUDE varchar(500),
    LATITUDE varchar(500) 
);

select * from fileInfo;
select * from article;

-- insert into fileInfo(userID, FileName,SaveFileName, FilePath, ContentType, FileSize, RegisterDate) value ("ssafy","a","a","folder",null,12,"2022-11-18 12:14:12.254");
-- insert into article(title, content,RegisterDate) values("title이다","content이다","2019-09-09 12:46:21.268");
