# SpringBoot 学习记录

## 文件上传

- 配置文件本地映射路径
  
```java
@Configuration
@EnableWebMvc
public class WebConfigure implements WebMvcConfigurer {
    private static final  String LOCATION_IMAGE_PATH = "file:D:\\ZyProject\\data-v\\images\\";
    private static final  String NET_IMAGE_PATH = "/img/**";

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        WebMvcConfigurer.super.addResourceHandlers(registry);
        /** 本地文件路径 **/
        registry.addResourceHandler(NET_IMAGE_PATH).addResourceLocations(LOCATION_IMAGE_PATH);

    }
 }
```

- 配置文件上传限制
  
  ```yml
  spring:
    servlet:
        multipart:
            #是否开启文件上传
            enabled: true 
            #写入磁盘的速度
            file-size-threshold: 2MB
            #单文件最大限制
            max-file-size: 20MB
            #单次传输最大限制
            max-request-size: 200MB
  ```

- 创建接口

```java
package com.data.v.sys.controller;
import com.data.v.util.http.AjaxResult;
import com.data.v.util.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

/**
 * @author it_dog_zhang
 * @version 1.0
 * @date 2021/12/1 15:45
 * @desc 系统相关
 */
@RestController
public class SysController {
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public AjaxResult upload(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return AjaxResult.error("上传文件为空");
            }
            // 获取文件名
            String fileName = file.getOriginalFilename();
            String filePath = "D:\\ZyProject\\data-v\\images\\";
            String path = filePath + fileName;
            File dest = new File(path);
            // 检测是否存在目录
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();// 新建文件夹
            }
            file.transferTo(dest);// 文件写入
            return AjaxResult.success(path, HttpStatus.SUCCESS);
        } catch (IllegalStateException e) {
            AjaxResult.error(e.getMessage());
        } catch (IOException e) {
            return AjaxResult.error(e.getMessage());
        }
        return AjaxResult.error("上传失败");
    }
    /**
     * 文件下载
     *
     * @return
     */
    @RequestMapping(value = "/download", method = RequestMethod.GET)
    public AjaxResult downLoadFile(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        String fileName = request.getParameter("file");
        String path = "D:\\ZyProject\\data-v\\images\\";
        File file = new File(path, fileName);

        if (file.exists()) {
            // 设置强制下载打开
            response.setContentType("application/force-download");
            response.addHeader("Content-Disposition", "attachment;fileName=" + java.net.URLEncoder.encode(fileName,"UTF-8"));

            // 读取文件
            BufferedInputStream bi = null;
            try {
                byte[] buffer = new byte[1024];
                bi = new BufferedInputStream(new FileInputStream(file));
                ServletOutputStream outputStream = response.getOutputStream();
                int i = -1;
                while (-1 != (i = bi.read(buffer))) {
                    outputStream.write(buffer, 0, i);
                }
                return AjaxResult.success("下载成功");
            } catch (Exception e) {
                return AjaxResult.error(e.getMessage());
            } finally {
                if (bi != null) {
                    try {
                        bi.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        return AjaxResult.error("文件不存在");
    }
}

```
