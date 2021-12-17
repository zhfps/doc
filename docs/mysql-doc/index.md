# MySql 学习记录

## 创建数据库

```sql
create database survey character set utf8 collate utf8_general_ci
```

## 正则表达式

```sql
// mysql 
select * from dim_oa_db_hrmresource where WORKCODE regexp '^[0-9]*[0-9]$' and LOGINID is not null;
```

``` sql
// oracel
select a.LOGINID, a.LASTNAME, a.WORKCODE, b.DEPARTMENTNAME from HRMRESOURCE  a
join HRMDEPARTMENT b 
on a.DEPARTMENTID = b.ID
where a.LOGINID is not null and regexp_like(WORKCODE, '^\d*\d$');
```
