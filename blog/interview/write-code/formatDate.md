# 格式化日期
问题：手写一个`format`函数，格式化以下日期格式。
```javascript
// 2024-1-1
format(new Date(), 'date')

// 2024-01-01
format(new Date(), 'date', true)

// 2024-1-1 0:0:0
format(new Date(), 'dateTime')

// 2024-01-01 00:00:00
format(new Date(), 'dateTime', true)

// 2024年01月01日 00:00:00
format(new Date(), 'yyyy年MM月dd日 HH:mm:ss')
```

实现思路：利用【**参数归一化**】思想，将格式日期转化为函数，再根据不同的格式替换日期信息。

```javascript
/**
 * 格式化函数
 * @param {Date} date 日期
 * @param {String | Function} formatter 格式
 * @param {Boolean} isPad 是否补位
 * @returns
 */
function format(date, formatter, isPad = false) {
  const dateInfo = {
    yyyy: date.getFullYear(),
    MM: date.getMonth() + 1,
    dd: date.getDate(),
    HH: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds(),
  }

  dateInfo.yyyy = dateInfo.yyyy.toString()
  dateInfo.MM = dateInfo.MM.toString()
  dateInfo.dd = dateInfo.dd.toString()
  dateInfo.HH = dateInfo.HH.toString()
  dateInfo.mm = dateInfo.mm.toString()
  dateInfo.ss = dateInfo.ss.toString()

  if (isPad) {
    _pad(dateInfo, 'yyyy', 4)
    _pad(dateInfo, 'MM', 2)
    _pad(dateInfo, 'dd', 2)
    _pad(dateInfo, 'HH', 2)
    _pad(dateInfo, 'mm', 2)
    _pad(dateInfo, 'ss', 2)
  }
  formatter = _formatNormalize(formatter)
  return formatter(dateInfo)
}

/**
 * 将格式化字符串转换为函数
 * @param {String | Function} formatter 格式
 * @returns {Function} 格式化函数
 */
function _formatNormalize(formatter) {
  if (typeof formatter === 'function') {
    return formatter
  }
  if (typeof formatter !== 'string') {
    return new TypeError('format must be a function or a string')
  }
  if (formatter === 'date') {
    formatter = 'yyyy-MM-dd'
  }
  if (formatter === 'dateTime') {
    formatter = 'yyyy-MM-dd HH:mm:ss'
  }
  return function (dateInfo) {
    const { yyyy, MM, dd, HH, mm, ss } = dateInfo
    return formatter
      .replaceAll('yyyy', yyyy)
      .replaceAll('MM', MM)
      .replaceAll('dd', dd)
      .replaceAll('HH', HH)
      .replaceAll('mm', mm)
      .replaceAll('ss', ss)
  }
}

function _pad(obj, key, length) {
  obj[key] = obj[key].padStart(length, '0')
}
```

[渡一参数归一化](https://www.bilibili.com/video/BV1bu411A7mf/?spm_id_from=333.999.0.0&vd_source=dce7b1ab94acfc972ab20009a0109fd3)
[duyi](https://github.com/duyi)