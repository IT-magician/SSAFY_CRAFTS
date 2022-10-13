



### 시작전에 해주어야하는 설정  
mysql : db schema 및 table 생성 필요
```sql
create database webdaejeon8th;
use webdaejeon8th;
CREATE TABLE `transaction` (`apt` VARCHAR(100),`floor` VARCHAR(10),`area` VARCHAR(100),`jibun` VARCHAR(100),`dong` VARCHAR(100),`transactionAmount` VARCHAR(100),`sigunguCode` VARCHAR(100));
create table userFavor(    id varchar(100),    code varchar(100),    dong varchar(100),    primary key(id,code,dong));
create table member(
    id varchar(100) primary key,
    pw varchar(100),
    name varchar(100),
    adr varchar(100)
);
```
