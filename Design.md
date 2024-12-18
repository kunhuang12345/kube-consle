# **前端页面设计**

### 1. **登录页面**

- **功能**：用户登录验证身份（可暂时跳过，后续扩展）。

- 字段：

    - 用户名
    - 密码

- API：

    - `POST /api/auth/login`

------

### 2. **概览页面 (Dashboard)**

#### **功能**

- 展示当前集群的整体状态，包括 CPU、内存、Pod 数量等。

#### **字段**

- 集群概览：

    - 总 CPU 使用率 / 总内存使用率
    - 总 Pod 数量
    - 运行中 / 异常的 Pod 数量
  
- API：

    - `GET /api/monitor`（返回资源监控数据）

------

### 3. **命名空间列表页面**

#### **功能**

- 展示集群中的命名空间，用户可以选择一个命名空间查看详情。

#### **字段**

- 表头字段：

    - 命名空间名称（`metadata.name`）
    - 创建时间（`metadata.creationTimestamp`）
    - 状态（是否正常运行，可基于 Pod 状态计算）
    - 操作（查看详情）
  
- API：

    - `GET /api/namespaces`（返回命名空间列表）

------

### 4. **Pod 列表页面**

#### **功能**

- 查看某个命名空间下的所有 Pod 列表。

#### **字段**

- 表头字段：

    - Pod 名称（`metadata.name`）
    - 所属命名空间（`metadata.namespace`）
    - 状态（`status.phase`，如 Running、Pending、Failed）
    - 所在节点（`spec.nodeName`）
    - IP 地址（`status.podIP`）
    - 重启次数（`status.containerStatuses[].restartCount` 的总和）
    - 创建时间（`metadata.creationTimestamp`）
    - 操作（查看详情 / 删除 / 停止）
  
- API：

    - `GET /api/pods?namespace={namespace}`（按命名空间过滤）

------

### 5. **Pod 详情页面**

#### **功能**

- 展示 Pod 的详细信息，包括容器、事件和日志。

#### **字段**

- 基本信息：

    - Pod 名称（`metadata.name`）
    - 所属命名空间（`metadata.namespace`）
    - 所在节点（`spec.nodeName`）
    - IP 地址（`status.podIP`）
  
- 状态信息：

    - 当前状态（`status.phase`）
    - 状态条件（`status.conditions`，如 `Ready: True` 等）
  
- 容器列表：

    - 容器名称（`spec.containers[].name`）
    - 镜像（`spec.containers[].image`）
    - 状态（`status.containerStatuses[].state`）
    - 重启次数（`status.containerStatuses[].restartCount`）
  
- 事件日志：

    - 时间戳（`events.lastTimestamp`）
    - 类型（`events.type`，如 Normal、Warning）
    - 消息（`events.message`）
  
- 操作按钮：

    - 停止 / 启动 Pod
    - 迁移 Pod
    - 删除 Pod
  
- API：

    - `GET /api/pods/{name}`（获取 Pod 详情）
    - `GET /api/pods/{name}/logs`（获取日志）
    - `POST /api/pods/{name}/action`（停止 / 启动）
    - `POST /api/pods/{name}/migrate`（迁移）
    - `DELETE /api/pods/{name}`（删除）

------

### 6. **Pod 创建页面**

#### **功能**

- 创建新的 Pod。

#### **字段**

- Pod 基本信息：

    - Pod 名称
    - 所属命名空间
    - 所在节点（可选，指定调度策略）
  
- 容器信息：

    - 容器名称
    - 镜像名称
    - 环境变量
    - 资源限制（CPU、内存）
  
- API：

    - `POST /api/pods`（创建 Pod）

------

### 7. **集群监控页面**

#### **功能**

- 实时监控 CPU 和内存使用情况，展示图表。

#### **字段**

- CPU / 内存统计：

    - 总量
    - 已使用
    - 空闲
  
- Pod 状态统计：

    - Running
    - Pending
    - Failed
  
- API：

    - `GET /api/monitor`（获取资源使用信息）

------

### 8. **事件页面**

#### **功能**

- 查看集群的事件日志。

#### **字段**

- 事件列表：

    - 时间戳（`lastTimestamp`）
    - 类型（`type`，如 Normal、Warning）
    - 来源（`source.component`）
    - 消息（`message`）
  
- API：

    - `GET /api/events`（获取事件日志）

------

### **页面层级结构设计**

```
- 登录页 (/login)
- 概览页 (/dashboard)
- 命名空间列表 (/namespaces)
  - Pod 列表 (/namespaces/{namespace}/pods)
    - Pod 详情 (/namespaces/{namespace}/pods/{pod})
      - 日志查看 (/namespaces/{namespace}/pods/{pod}/logs)
- 创建 Pod (/namespaces/{namespace}/create-pod)
- 集群监控 (/monitor)
- 事件查看 (/events)
```