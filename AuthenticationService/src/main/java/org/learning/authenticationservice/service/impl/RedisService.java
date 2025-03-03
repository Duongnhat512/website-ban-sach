package org.learning.authenticationservice.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class RedisService{
    private final RedisTemplate<String, Object> redisTemplate;
    public void save(String key, Object value){
        redisTemplate.opsForValue().set(key, value);
    }
    public void save(String key, Object values,long timeOut, TimeUnit timeUnit){
        redisTemplate.opsForValue().set(key, values, timeOut, timeUnit);
    }
    public String get(String key){
        return (String) redisTemplate.opsForValue().get(key);
    }
    public void delete(String key) {
        redisTemplate.delete(key);
    }
}
