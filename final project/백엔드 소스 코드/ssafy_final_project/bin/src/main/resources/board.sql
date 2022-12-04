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
    RegisterDate datetime not null
);

select * from fileInfo;
select * from article;

-- insert into fileInfo(userID, FileName,SaveFileName, FilePath, ContentType, FileSize, RegisterDate) value ("ssafy","a","a","folder",null,12,"2022-11-18 12:14:12.254");
-- insert into article(title, content,RegisterDate) values("title이다","content이다","2019-09-09 12:46:21.268");
