---
date: 2018-09-25 10:43:00
seti: go
---

# 3-Hello Worold

## 编写运行Hello World

先写个Hello World示例来稍微了解下Golang吧。

在随便哪个目录创建一个hello-world.go文件

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello World!")
}
```

在终端使用 `go run` 命令编译运行这个go文件。

```bash
go run hello-world.go
```

此时你应该能看到终端输出了 `Hello World!` 。

![Hello World!](http://ww1.sinaimg.cn/large/6a43d05fly1fvlmb5rengj20cc01ra9x.jpg)

## 先简单的看下Golang语法

```go
package main

// Golang类似Java等语言，需要在每个源码文件的开头声明当前文件所属的包的名称，
// 也就是这个包的导入路径（import path），这里声明了这个文件所属于main包中。
```

```go
import "fmt"

// 同样类似Java等语言，当需要导入其他包的时候，
// 需要使用import关键字声明需要导入的包的导入路径，导入的路径名称是一个字符串。
```

```go
func main() {
    ...
}

// 这里使用func关键字声明了一个名为main的方法。
// 值得注意的是，在Golang中包裹函数体的第一个大括号，必须和声明函数的语句保持同一行，否则编译时会报错。
```

```go
fmt.Println("Hello World!")

// 这里就调用了fmt包下的Println方法，将"Hello World!"字符串输出到标准输出中。
```

## go run 命令

通过 `go help run` 命令可以查看 `go run` 命令的官方介绍。

![go help run](http://ww1.sinaimg.cn/large/6a43d05fly1fvloaq70fxj20g90c23z7.jpg)

简单来说， `go run` 命令编译并运行了相应的Golang源码。

此外 `go run` 的参数也可以是一个目录路径，它会自动寻找目录下的main包中的main方法并执行。在刚刚的hello-world.go文件目录下执行 `go run .` 试试。

如果想了解 `go run` 这个命令在后面做了什么工作，可以加上 `-n` 参数，比如 `go run -n hello-world.go` 。

![go run -n .](http://ww1.sinaimg.cn/large/6a43d05fly1fvlorjhzu7j20n30hnmz4.jpg)

> Tip: Golang在1.5版本之后实现了自举（即使用Golang语言编写并编译Golang本身），Golang底层的源码基本都是由Golang实现的，像 `go run` 命令的源码自然也是，可以在Golang的安装路径下的 `src` 目录找到。
> `go run` 的源码在 `<golang安装路径>/src/cmd/go/internal/run/run.go` 中。