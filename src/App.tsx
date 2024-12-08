import { useState } from 'react'
import './App.css'

function App() {
    const [data, setData] = useState(null)
    const fetchData = async() => {
      try {
          const response = await fetch('/api')
          const result = await response.json();
          setData(result)
      } catch (error) {
          console.error('Error:', error)
      }
    }

    return (
        <div>
            {/* 10. 创建一个按钮，点击时调用 fetchData 函数 */}
            <button onClick={fetchData}>Get Data</button>

            {/* 11. 条件渲染：当 data 存在时，显示数据
          JSON.stringify 参数说明：
          - data: 要转换的数据
          - null: replacer 函数，这里不需要替换任何值
          - 2: 缩进空格数，使输出更易读 */}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    )
}

export default App
