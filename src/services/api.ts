// 定义 fetchPods 函数，用于从后端 API 获取 Pod 数据
export const fetchPods = async () => {
    const response = await fetch('/api');
    if (!response.ok) {
        throw new Error('Failed to fetch pods');
    }
    return response.json();
};