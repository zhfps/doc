# Mybatis学习

## 使用MyBatis处理枚举类型

- 创建枚举

```java
public enum ProjectGroupType {
    UNGROUP(0,"未分组"),
    GROUP(1,"已分组");

    private Integer value;

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }
    @JsonValue
    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    private String  label;


    ProjectGroupType(Integer i, String label) {
        this.value = i;
        this.label = label;
    }

    public static  ProjectGroupType mValueOf(Integer value){
        for (ProjectGroupType group : ProjectGroupType.values()){
            if(group.getValue().equals(value)){
                return group;
            }
        }
        return null;
    }
}
```

- 创建处理类

``` java
public class ProjectGroupHandler implements TypeHandler<ProjectGroupType> {
    @Override
    public void setParameter(PreparedStatement preparedStatement, int i, ProjectGroupType projectGroupType, JdbcType jdbcType) throws SQLException {
        preparedStatement.setString(i,String.valueOf(projectGroupType.getValue()));
    }

    @Override
    public ProjectGroupType getResult(ResultSet resultSet, String s) throws SQLException {
        String value = resultSet.getString(s);
        if(value != null){
            return ProjectGroupType.mValueOf(Integer.parseInt(value));
        }else {
            return  null;
        }

    }

    @Override
    public ProjectGroupType getResult(ResultSet resultSet, int i) throws SQLException {
        String value = resultSet.getString(i);
        if(value != null){
            return ProjectGroupType.mValueOf(Integer.parseInt(value));
        }else {
            return  null;
        }
    }

    @Override
    public ProjectGroupType getResult(CallableStatement callableStatement, int i) throws SQLException {
        String value = callableStatement.getNString(i);
        if(value != null){
            return ProjectGroupType.mValueOf(Integer.parseInt(value));
        }else {
            return  null;
        }
    }
}

```

- 配置xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>  
    <typeHandlers>
        <typeHandler handler="com.data.v.mybatis.handler.ProjectGroupHandler" javaType="com.data.v.bi.types.ProjectGroupType"></typeHandler>
    </typeHandlers>
</configuration>
```

- 配置文件

``` yml

mybatis:
  config-location: classpath:mybatis/mybatis-config.xml
  mapper-locations: classpath:mapper/**/*.xml
  type-handlers-package: com.**.handler

```
