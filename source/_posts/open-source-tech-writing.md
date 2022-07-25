---
title: 开源软件的技术写作
date: 2022-05-08
tags:
    - 开源
    - 写作
    - 文档
categories:
    - 夜天之书
---

开源社群虽然是围绕开源软件建立起来的，但是建设繁荣的开源生态，依靠只读的源代码是不够的。建设繁荣的开源生态需要开源协同，而协同的基础是沟通。沟通不仅有论坛和聊天室的交互式形式，还有主动的内容生产和发布，包括不同受众的文档的撰写和翻译，以及技术文章的传播等等。这些内容创造都可以归类为技术写作，也就是说，围绕开源软件的技术写作，是建设繁荣的开源生态的重要一环。

本文尝试讨论这些不同类型的技术写作在现实当中被采纳和运用的情况，以及它们相应的价值。

<!-- more -->

## 开发过程

虽然大一统的低语总是想让我说“代码也是技术写作的一部分”，但是我还是克制了这个冲动。不过，软件开发的过程当中，为了提高软件的可理解性和可维护性而刻意写好的代码注释和提交信息，确实可算作是技术写作的一部分。毕竟，很有一些开源软件即使增长到一定的复杂度，也没有半行注释，提交信息里全是 `update`、`save` 或 `fix` 这样不明所以的单词信息。

### 代码注释

代码注释的重要性在许多软件开发的最佳实践当中都有提及，总结下来我认为不外乎三点。

1. 关键设计要有模块注释，接口和数据结构要有基本的说明注释。
2. 实现上的 trick 要有行内注释。
3. 清晰明白的代码不需要啰嗦的注释。

第一点可以分成两个部分，第一个部分是通过模块注释提纲挈领地说明模块的设计动机和思路。一个软件往往由多个模块构成，每个模块又由多个小模块构成，这样层层拆分下去，每一层都有模块设计的注释，对于有志于投入到代码开发或使用的参与者来说，就是一个循序渐进且每次都能处理适量信息的过程。

这一方面做得尤为出色的是 [Rust 的标准库注释](https://doc.rust-lang.org/stable/std/)。虽说是注释，但是在 rustdoc 渲染工具的加持下，这份注释其实直接就可以作为实现文档呈现出来。Rust 的标准库注释从最上层介绍了标准库的构成和各个模块的职能，到每个模块细分之后同样复刻最上层的介绍模式，直到每一个具体的数据结构和方法的接口定义。可以说，开发 Rust 标准库的程序员和使用 Rust 标准库的程序员，都反复多次阅读过这些注释文档。

{% asset_img rustdoc-std.jpeg Rust 的标准库注释 %}

广泛使用的编程语言的标准库注释似乎总能做得十分完善，[Java 的标准库注释](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/module-summary.html)也类似。尤其是我时常翻阅的 [Java 并发模块的注释](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/package-summary.html)，由于并发的复杂性和设计上依赖约定的特性，详实的注释文档显得尤为重要。

{% asset_img javadoc-concurrent.png Java 标准库并发模块的注释 %}

由于标准库做出了好的示范，并且提供了好的注释文档化支持，Rust 生态的软件和 Java 生态的软件，大多能够考虑写好模块注释。语言对注释的支持是很重要的。

例如 Rust 按照模块拆分，支持了简单的模块注释手段和 Markdown 语法，程序员就很容易顺着这条预设路径写出好的注释。反观 Java 是以类来组织代码的，优秀的项目往往会在类注释内写好详实的注释，但是 `package-info.java` 的用例并不流行，甚至很多程序员都不知道有这么个东西，JavaDoc 生成出来的内容比起 rustdoc 更加难以阅读，尤其是因为缺乏模块的概要注释，以至于根本不知道应该看哪部分代码。所以 Java 程序员往往是直接阅读源码上的注释，而不是到对应的 JavaDoc 网站上阅读。

{% asset_img javadoc-bookkeeper-lifecycle.png 状态机经常需要注释定义 %}

回过头看 Rust 的文档，虽然生成的页面非常精致，对模块文档的高度支持让 rustdoc 生成的内容几乎就是一份形式上优质的实现文档，但是在代码内链接的部分，如果直接读源码注释则很难像 Java 注释一样方便的跳转。当然这有可能是编辑器和集成开发套件对这类跳转支持还不足的原因，但是确实会影响注释产生的实际价值。

{% asset_img rustdoc-tokio.png 缺少工具支持，直接阅读注释不方便 %}

第一点的第二部分是对第一部分的补充。除了大段的模块注释，组成软件对外契约的接口和公共数据结构，需要有基本的说明注释。也就是说，这个数据结构的用途和各个字段的定义，接口方法的用途和输入输出的约束等等。这些接口和数据结构往往被下游所引用和依赖，软件分层、抽象和封装的目的就在于使用者只需要阅读接口契约就够。

{% asset_img javadoc-zookeeper-asynccallback.png 典型的接口文档 %}

第二点比较好理解。如同前几天我发出的[讨论技术债问题的推特](https://twitter.com/tison1096/status/1521758171928223744)，很多时候实现上为了速度或者确实有客观复杂度难以理解，需要对实现做具体注释，例如经典地告诉别人不要乱动某几行代码。这样的注释是不可避免的。

{% asset_img javadoc-flink-hack.png THIS IS A HACK %}

第三点某种意义上是对前两点的总结，也就是说除了公开定义的数据结构和接口和模块的注释，以及实现上必须澄清的细节，其他的注释能少则少。这也是[《重构》](https://book.douban.com/subject/30468597/)当中颇为反直觉的一个论断，书中给出的解释如下

> 当你感觉需要撰写注释时，请先尝试重构，试着让所有注释都变得多余。

我同意这个观点。技术写作不必卷帙浩繁，内容不是越多越好，简练准确地传达出完整的信息，是注释要达到的效果。

### 提交信息

代码注释之外，与开发活动密切相关的另一个技术写作的实例，就是撰写提交信息了。

现代开源软件大多有源码控制系统版本化的管理，每次变更都会经过提交补丁和代码评审，通过后方可合并到代码仓库中。提交上来的补丁会包含提交信息，如果用 Git 管理，那就是所谓的 [Git Commit Message](https://git-scm.com/docs/git-commit#_discussion) 的内容。

关于[如何写好提交信息](https://cbea.ms/git-commit/)，相关讨论和材料不少。总结下来，我认为有以下几个关键点。

第一点，参考 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 的分类，根据项目特点突出每个提交的目的。同时，Conventional Commits 标准还给出了提交信息的基本格式指南。

第二点，为了突出提交的目的，标题采用祈使句而非陈述句，也就是说提交信息标题读起来形如“（应用这个补丁，将会）实现某个功能/修复某个缺陷”。

第三点，提交信息内容主要关注为什么要做变更和做了什么变更，而不是变更的细节或实现方式。如果项目使用 issue tracker 等工具记录需求和缺陷报告，通常可以简化为提供一个到 issue 的引用。如果实现细节 trick 是软件知识的一部分，也应该记录在案。这跟注释的分类方式是类似的，具体如何取舍详略，只能在实践当中根据直觉和同行评议交流积累经验了。

第四点，可能比较容易引起争议，我个人倾向于合入主分支的提交信息省略开发中间过程，保持主分支的线性提交历史，每个补丁提交的信息都是经过开发、评审、修改后的结论。Linus 设计 Git 的时候，其 git-merge 功能实际上会把开发分支的所有 commits 都合并到上游分支里，这就导致开发的中间过程被保留。往往多个分支互相反复 merge 以后，提交历史就变成一个复杂的有向无环图，难以阅读。当然，我认为开发的中间过程有其自身的价值所在，不过在 GitHub 式的平台接管开发流程的今天，这种在 pull request / merge request 交互过程中产生的中间状态，可以由代码托管平台记录下来，作为提交历史的外挂扩展信息存在。通常，只需要在提交历史里提及对应的 request 链接，即可关联上相关信息。

代码注释和提交信息，是在一线开发环境里产生的一手技术写作内容。实际上，如果这部分相对上游的内容生产被主动管理起来，生产出高质量的内容原材料，下游无论是文档还是宣传内容，都将受益匪浅。

## 文档

前文提到注释的时候，我经常会下意识地写成注释文档或者文档，这是因为注释可以理解成与代码共同演进的文档。其实，[《活文档》](https://book.douban.com/subject/35372829/)一书中就曾经提及，以开发过程中诞生的知识为源头活水，随软件开发不断进化的文档，或者叫“活文档”，才是可靠、高效、协同且有见地的文档。

虽然如此，为了编写描述实现细节、模块设计、开发流程和使用方式的文档，所需的技能集与代码开发还是有很多不同。尽管有不少开源项目的文档是由开发者顺便完成的，但是无论是在企业当中，还是组织复杂度达到一定程度的开源团队当中，都会形成专注文档内容输出的子团队。

如前所述，根据受众用途的差异，文档可以粗略地分成用户文档和开发文档；根据受众地域的差异和全球化的需求，文档团队又需要考虑国际化和本地化的问题。

讨论文档问题，可以从一个项目的 README 文件说起。这是开源运动伊始时就在开源项目的创作者中间传播开来的最佳实践。简单来说，无论你是一个开发者，获取到了开源软件的源码压缩包，还是一个用户，获取到了可供编译的源码压缩包或预编译的二进制文件发布包，解压缩以后的文件集合里，通常都会有一个 README 文件简要介绍该软件的名称、定位用途、使用方式、作者和著作权，以及其他联系方式或相关材料的信息。可以说，开源软件最初的专门文档，就是从 README 开始的。即使在今天，浏览托管在 GitHub 上的软件代码仓库，首页上最引人注目篇幅最大的，还是渲染 README 文件展示出来的页面。

{% asset_img readme-cpython.png Python 解释器的 README 文件 %}

对于国际化和本地化的问题，往往首先被考虑的也是 README 文件。例如 [Perl](https://github.com/perl/perl5) 就完成了中日韩等语言的 README 文档翻译和本地化。

### 用户文档

用户文档，顾名思义就是写给用户看的文档。

这看似是一句废话，却是不少开源项目用户文档质量不佳的症结所在。因为如果完全从开发者的角度出发，很容易因为过于了解实现细节，深度参与了设计讨论考虑了太多极端情况，而在用户文档的行为上不能换位到目标用户的知识储备和热点路径，经常出现专有名词或内部知识堆砌，或者热点路径和极端情况篇幅详略不当的情况。

对于这些情况，本文不做过多展开。还是把重点讲回到好的用户文档实践当中。

文档的发布有多种形式。如今互联网发达，成本低廉，大部分用户阅读文档的手段是在线文档，这些文档不仅包含文字和图片，还可以连接到音频，甚至嵌入在线互动模块。当然，还有以 EPUB 或 PDF 格式发布的文档，常见于罗列所有命令、接口或规格的参考手册当中，典型的包括 Intel 各个类型芯片架构的指令集文档，硬件驱动的接口文档等等。

关注到开源软件主要采用的前一种形式，好的文档网站还是有许多的。

我最喜欢举例的是 [Spring 框架生态的文档矩阵](https://spring.io/)。官网就是它的入口，顶端导航栏 Projects 按钮列出生态内 Spring Boot 和 Spring Framework 等一系列子项目的入口，Learn 按钮列出了半小时内快速搭建任何一项功能的样例项目的教程。

这里值得特别提出的就是 Spring 丰富的教程。从文档递进关系上 Learn 按钮下的 [Quickstart](https://spring.io/quickstart) 展示的是 Spring 生态当前强推的 Spring Boot 一揽子框架。Spring Boot 项目的意义就在于快速启动一个包含多个 Spring 生态模块的项目，首先展示这项内容，抓住了绝大部分用户最热点的问题，可以说不只是二八定律，而是用 1% 的投入换取了 90% 问题的解决。

我曾经和不少开发人员或技术写作人员讨论过，一个共识是专业人士往往由于掌握了高级知识，对问题有全面的了解，在写作文档的时候，总希望把内容全面的介绍出去，或者有些卖弄的动机在里面；同时，容易对难题产生极大的兴趣，以攻破难题为首要目标。实际上，文档写作经年沉淀的经验当中，能够总结出 TL;DR 和 FAQ 这样的缩写词，就是因为这是大部分的天性。也就是说，太长的内容不会看，少数几个最常问的问题组成了所有问题人次中的绝大部分。

其实，从知识成长的曲线也不难看出，自然演进的结果下，入门材料永远是最多的，点击频率也是最高的。内容文档团队想要生存下来，做好入门材料是一个百试不厌的护身符。

Spring 文档矩阵在 Quickstart 之下，是针对大量细分用户场景的 [Getting Started Guides](https://spring.io/guides) 文档。我在学习和使用 Spring 生态的过程中，大量参考了这些指南文档。无论是你想要连接数据库，提供 RESTful 接口，对接各种系统，部署上云，使用 Gradle 管理 Spring 项目构建，都可以在这里找到一个合适的入门点。

前面提到，入门材料是内容文档团队生存的护身符。不仅如此，做好入门材料也是挑战难点的前提条件。真正能够凭借一己之力或说动力，跨过入门阶段探索进阶用法的人少之又少，绝大部分潜在用户一试不成，也就放弃了。其实我也是如此，每次我遇到一个需求，想要寻求开源解决方案的时候，如果三两下试不出来解决好我的基本问题，那也就放弃了。如果基本问题被解决了，那么如何解好，发现软件的高级功能并从中受益，才会更加顺理成章。

高新科技派的代表是 [Kubernetes 的交互式教程](https://kubernetes.io/docs/tutorials/hello-minikube/)。其实这种形式的“文档”，我在大学期间通过 Codecademy 学习 Ruby on Rails 的时候就接触过了。随着 [Katacoda](https://www.katacoda.com/) 等构建交互式教程的工具的推出，相信以后这类“寓教于乐”的教程还会更多。

很多年前，有人提起前端的受众远多于后端的原因，就在于前端的教学反馈更加及时，所见即所得，用户可以直接视觉化的看到自己的“努力”的收获。反观后端的上手过程，大多是和终端打交道，越是深入进去，成功的喜悦就越是建立在一个正常的退出码，一段正确打印的内容，一个没有崩溃的程序，想要从这种体验中得到激励，本身就有一定的选择性。用户文档的受众是一般用户，顺应人性而非考验人性是一个基本要求。让用户快速地用起来，解决实际应用场景的问题，比软件本身的正常运行和底层接口返回了正确的结果，更能切中要害。

用户文档不仅仅是用来入门和指导搭建原型的，还有排查问题的作用。[TiDB 的文档](https://docs.pingcap.com/tidb/stable)在设计的时候就考虑到了这一点，在每个容易出问题的地方附上对应的 Note 或 Troubleshooting 段落。不过，文档终究不是用户排查问题的第一顺位。一般来说，在故障发生的地方就地打印提示信息帮助排查，是最有效的。除此以外，用户通常会在 Stack Overflow 及其他典型问答网站或搜索引擎上寻找问题的解法，面对这个场景的内容运营我会在最后“写作之外”一段当中再次提及。尽管如此，文档还是一个记录常见问题官方认可的解法的好地方。例如，Flink 用户经常会碰到 [Class Loading 的问题](https://nightlies.apache.org/flink/flink-docs-stable/docs/ops/debugging/debugging_classloading/)，这在官方文档中就有一个专门的页面介绍 Flink 解决 Class Loading 的整体思路和典型问题的可能解法。

### 开发文档

好的用户文档案例还有很多，数据库领域的卧龙凤雏 [PostgreSQL](https://www.postgresql.org/docs/current/) 和 [MySQL](https://dev.mysql.com/doc/refman/8.0/en/) 的文档就是经典之一。不过，这两份文档不仅仅是给用户看的，其中涉及了不少模块设计、数据结构和接口设计，以及设计哲学，不仅试图兼容这两大数据库软件的团队成员必须了解，所有数据库从业人员都能从中获益。

如果你去搜索 TiDB 代码当中以上面 MySQL 文档网站为引用的注释，能够从执行模块找到许多个匹配结果。可以说，要想兼容 MySQL 的语义，从文档和实现中复刻一套数据类型和表达式是不可避免的。同样还有试图对接或者复刻 PostgreSQL 的软件，例如现在想要支持让 psql 直接访问自研的数据库服务，那么了解 psql 的通信协议，实现对应的服务端编解码模块就是必须的。

开发文档主要受众是软件开发者。当然，前面用户文档一段里，Spring 的用户也是业务软件的开发者。开发文档的开发者，详细说来分成生态开发者和内核开发者，与直接生产业务软件乃至只是通过鼠标键盘和软件交互，不以编程方式交互的终端用户是有差别的。

生态开发者与终端用户有一定的相似之处。他们都不会关心软件的内部实现，主要关心对外暴露的接口。不同的是，终端用户直接生产不可复用的业务软件，或者不以编程的方式与软件打交道，而生态开发者往往围绕着软件暴露出来的接口或插件框架，实现自己的插件或者将这个开源软件与另一个生态连接起来。

插件开发，也就是对开源软件完成某项工作的功能模块做出抽象，允许加载第三方提供的实现。例如 Flink 读取数据源的模块，官方定义了接口，并提供了 Kafka 和 HBase 等一系列常见系统的对接。第三方开发者为了与企业内部系统对接，或者对接一个官方没有支持的开源软件，就可以根据开发文档实现 Flink 定义的接口，并根据文档装载和启动。

软件开发往往开始于解决一个特定问题。如果这个问题过于特殊或者简单，可能软件的开发周期就到此为止了。如果这个问题可以泛化，或者软件本身就定义了一种新的方法论，那么软件的复杂度就会随着时间日益增加。例如 Apache Flink 提出了一个有状态流处理的计算框架，那么与整个大数据生态的对接，就是其演进的必经之路。一个人或一个相同背景的团队，很难完成对世界上形形色色场景的覆盖，通过开源协同来丰富生态，是开源软件能够吞噬软件世界的一个基本前提。因此，强盛的开源软件往往会有丰富的扩展点，繁荣的开源社群会有大量的生态开发者将软件及其方法论传播到每一个有用户需求的地方。

例如，Flink 不仅通过 Connector 抽象了与其他数据源的对接，还通过 State Backend 的抽象和 High Availability Service 的抽象允许生态开发者对接其他能够提供相应能力的存储系统。例如，被某公司高管认为难以扩展生态的数据库领域，PostgreSQL 通过 Foreign Data Wrapper 和 Extension 等一系列插件化模块，激发了生态开发者极大的开发热情。又例如，Spring 这样一个提供了基础的控制反转和面向切面编程的方法论的软件，通过对接不同数据源，不同鉴权服务，不同部署环境，形成了庞大的 Java 开发生态。

{% asset_img ecosystem-flink.png Apache Flink 的开源生态 %}

开发文档要为生态开发者解决的问题，就是明确这些框架接口的定义和约定，让他们能够放心地依赖并创造出新的价值，构建出生态护城河。此外，开发文档网站可以罗列已有的生态开发项目，一方面能够激励生态开发者“名留青史”，另一方面对于新人来说，有一个天然的不用刻意编写的参考教程，即使是经验丰富的生态开发者，也有可能从其他人的作品当中汲取灵感。

{% asset_img ecosystem-skywalking.png Apache SkyWalking 的开源生态 %}

内核开发者指的是开发文档所属的开源软件的人。如果软件范畴小，那么它可能代指的是所谓的核心团队；如果软件足够复杂，那么内核开发者可能分成好几个团队。例如 Rust 的内核开发团队就分成编译器团队和标准库团队，而包管理器、资源网站开发和开发工具开发的团队，则介于内核开发者和生态开发者之间。

对于内核开发者来说，仅仅了解软件架构和公开的接口契约，就不太足够了。生态项目的开发者，只要了解开源软件的接口，开发的方式和风格很大程度上可以按照自己的喜好来决定，本质上是一个全新的开源项目。对于内核开发者来说，他们要开发的是一个已经存在的开源项目，因此项目的目标、设计哲学和风格，首先要入乡随俗，在经过深度的参与之后，才有可能提出合理的修改意见。

内核开发者核心的开发文档是介绍如何参与的 CONTRIBUTING.md 文件，或者进一步展开的 Dev Guide 文档。许多著名的开源项目都有类似的材料。

* [Python Developer's Guide](https://devguide.python.org/)
* [Guide to Rustc Development](https://rustc-dev-guide.rust-lang.org/)
* [PostgreSQL Development information](https://wiki.postgresql.org/wiki/Development_information)
* [TiDB Development Guide](https://pingcap.github.io/tidb-dev-guide/)

其中 TiDB 的开发文档是我在参与 TiDB 社群运行的时候提出了推动撰写的。此前 TiDB 有的是一系列源码阅读文章和博客分享。这些材料固然是有价值的，也是 TiDB 社群在当时相对早期的国内开源环境当中脱颖而出的依仗，但是开源运动发展到今天，当社群不再局限于一地，而是参与全球化竞争的时候，将发布后即不可变的零散材料，按照主题整理成可操作性的文档，就显得更加迫切了。

开发文档需要覆盖的内容，以 TiDB Development Guide 为例，分成了以下四个章节。

1. Get Started 搭建开发环境，介绍完成基本开发流程的必需知识。
2. Contribute to TiDB 开源社群欢迎哪些参与，这些参与方式分别如何进行。
3. Understand TiDB 深入了解软件架构设计、模块设计和关键实现细节。
4. Project Management 开源软件的项目管理和软件工程最佳实践。

其他的开发文档大同小异。例如 Rustc 的开发文档主要讨论了前三个问题，把项目管理的部分放到整体讨论 Rust 社群运作方式的 [Rust Forge](https://forge.rust-lang.org/) 文档里。例如 Python 的开发文档的顺序是 Getting Started 随后是各类参与形式的细节，最后以模块设计和开发 Tips 收尾。

构建并运行一个内核开发者社群，通常的知识流通方向就是从公开的官方交流渠道上积累，汇聚沉淀到开发文档上，再反哺到每日的沟通讨论当中，逐渐形成丰富的知识库财产，这是开源协同创造知识，并依托群体智慧制造高水平软件的秘密所在。

### 国际化和本地化

很长一段时间里，美国代表了软件开发的前沿方向，开源运动盛行于欧美，并以英文为通用语言。这一状况至今没有太大的变化，但是中国和日本等国家的强势加入，法国、德国和意大利等国家的内容本地化需求成长，使得开源软件的内容创作必须要考虑国际化和本地化的问题。

一方面，技术写作者以本地语言创作，往往能够最为准确的表意，并且满足直接受众需求。但是为了扩大内容的影响力，融入全球化前沿的开源共同体当中，也为了在内容创作上坚持国际化和本地化两手都要硬的需求，需要将内容翻译成英语或关键受众所在地区的本地语言。另一方面，对于第一手材料是外语的情况，开源社群的技术布道师为了将内容国际化和本地化，也需要进行相应的翻译工作。

内容翻译是个复杂的话题，本文不会深究如何翻译的问题，仅从现有的案例出发，介绍开源软件内容国际化和本地化的成熟做法。

首先要考虑的是展示问题。如同上面讨论文档交付和展示方式时提到的，当今开源软件的文档，往往是以网站形式展示的。为了顺应国际化和本地化需求的潮流，新兴的文档网站框架往往内置支持了多语言切换和发布的功能。

例如 Facebook 某团队基于 React 框架提出的 Docusaurus 网站框架，就支持切换多语言的功能。Apache InLong (Incubating) 和 Apache APISIX 等采用这一框架来开发自己文档网站的开源项目，也就因此能够顺利的支持国际化和本地化的需求。

{% asset_img i18n-docusaurus.png Docusaurus 的多语言功能 %}

除去展示阶段的趋势，另一个问题是内容翻译的专家如何参与进来。上面提到的 Docusaurus 框架，或者许多手工完成国际化的文档页面，往往采用一个页面写两次的手段，依靠人来维持不同版本之间的同步。这样很容易导致文档之间及时性不足不说，对于内容翻译者来说，他们更想关注的是内容的翻译，而非页面方式用于描述如何渲染和其他网站相关的元素。

[GNU gettext](https://www.gnu.org/software/gettext/) 项目提供了一种方案，能够提取出文件中的片段，翻译者只需要翻译相关片段的内容，通过成熟的套件支持，能够把原来文件当中的内容部分替换成翻译后的内容。

[Python 的用户文档](https://docs.python.org/3/)多语言支持做得是公认的好，其背后就是这样一套体系在支撑。具体的内容可以参考 PyCon Taiwan 2016 的演讲[《多语系 Sphinx 与 Python 官方文件中文化》](https://blog.liang2.tw/2016Talk-PyDoc-TW/)，这也是我最初接触文档国际化和本地化的重要材料之一。

{% asset_img i18n-pydoctw-transifex.png Python 官方文件中文化 %}

工具之外，开源共同体当中自发组成的内容翻译团队的力量也不容小觑。上面提到的 Python 官方文档的翻译，就是一个自发运行的小组。另一个颇有名气的翻译组，是 [Linux 中国的翻译组](https://linux.cn/lctt)。他们翻译了大量 Linux 社群的高质量文章，并且推进了许多实用工具文档的中文化，是一个很有行动力的组织。

## 书籍文章

按照距离开源软件生产中心的距离，文字内容创作依次分类成代码注释、提交信息和文档，再往下走就是本节要介绍的文章和书籍了。

例如，这篇文章就可以视作开源共同体当中讨论技术写作的重要性和必要性的内容输出。

我在“夜天之书”公众号上发布的系列文章，大部分都关注在如何认识开源社群的人和事，如何参与开源社群，以及如何建设开源社群上。这些文章与[“开源之道”](https://opensourceway.community/)的系列文章，[庄表伟的 Blog](https://zhuangbiaowei.github.io/)上讨论开源的文章，OpenTEKr 公众号的系列内容，以及广泛的关注开源、投入开源的参与者的文章一样，构成了开源共同体当中的每一个个体对开源的解读。

例如，前面提到的 TiDB 社群发布的每周速递、功能解读、源码阅读和路线展望等内容，就是具体到某个开源项目对自己的开发过程及结果的介绍和宣传。

这其中，自然也包括 TiDB 首席架构师 [@siddontang](https://www.jianshu.com/u/1yJ3ge) 在简书上发布的博客，核心开发者 [@tiancaiamao](https://www.zenlife.tk/index) 的个人博客等等。

技术博客文章的价值在哪？回答这个问题之前，我想先抛出一个论点。

**文章须言之有物。**

这个观点来自于胡适《文学改良刍议》的第一条。为什么讲这句话？因为技术博客及文章，其价值体现首先依赖于内容言之有物。

例如，上述个人博客的内容与社群的每周速递类似，大多抓住的当前开发过程当中遇到的问题，并针对问题提出务实且有建设性的议论。作者写下这些文字的时候，首先考虑的是对自己的思路整理有帮助，首先内容需要对自己有价值，进而才有可能让读者从中获益。只有言之有物的内容，才有可能引来同行的评论和碰撞。

例如，前不久登上 Hacker News 首页的 [Retool 团队升级 4TB PostgreSQL 的经验](https://news.ycombinator.com/item?id=31084147)一贴，就引来了数十条评论。@tiancaiamao 在自己博客当中讨论到具体问题的时候，我自己和其他读者都曾经回复讨论过这些问题的解法和自己的经验。

技术博客文章的价值在哪？我认为第一点是自己想写，想记录，满足自己整理思路和外挂记忆的需求，再有第二点是内容言之有物，与同行切磋碰撞。

开源精神的重要内涵是分享的精神，写作文章就是向开源共同体分享自己的所见与所思。开源协同的本质是共同创造价值，通过文章输出自己的观点，把别人不知道的事情讲给人听，把别人隐隐约约知道的事情讲清楚，挑明问题，提出解法，为开源共同体创造价值，最后，自己和文章所依托的开源社群收获真知灼见与技术影响力，这是开源社群的内容创作的闭环。

为什么要强调言之有物呢？这是因为内容渠道一旦建立，推送内容的压力立刻就会来到运营者身上。如果运营者本身不是内容的创作者，为了保证内容推送的密度，很容易饥不择食降低标准推送一些无关的内容或者低质量的内容。

例如，我曾经多次和 Databend 团队的成员提过，他们在公众号上直接复制发布英文写成的 Weekly 是不能达到正向运营的效果的。因为微信公众号的受众天然是中文受众，由于人力紧张或者其他原因，直接将英文写成的 Weekly 原封不动地推送出来，除了制造垃圾以外，很难想象有什么价值。最近，Databend 公众号在推送此类消息时，就做了基本的翻译工作，以及除了无情报幕以外，增添了部分 Tips 内容。

不过，其实 Weekly 并不需要将所有内容都重复一遍，我在 TiDB 社群和 Flink 社群写 Weekly 的时候，主要参考的是 Perl 6 当时的 Weekly 和 Flink 的英文 Weekly 的选材方式，以一个开发者的角度看我自己会关心会感兴趣的内容，挑选出来以后略加评论并说明这个改动或者新功能、模块的发布，可以怎么用，还能怎么改进。否则，只是简单的说“主分支进了 X 个提交”，分别是什么提交号、标题是啥，真成了报幕的，信息价值就很低了。

要想改善内容输出的频率和质量，培训和引导是必要的。例如，PingCAP 为了提高员工的技术写作水平，优化 TiDB 社群内容的质量，在公司内举行了多个技术写作培训计划。例如，[Google 发布了自家关于技术写作的材料](https://developers.google.com/tech-writing/one)，这份材料本身就是其内容影响力矩阵的一部分。

一个好的例子是 Bytebase 团队，他们围绕开源软件 Bytebase 关注的数据库运维领域，输出了一系列相关技术文章，同时也包括团队的文化和运行管理方式。这很大程度上是由于创始人重视内容创作，并且以身作则示范好的内容应该如何生产的缘故。

* [Bytebase - 重新定义 DBA](https://mp.weixin.qq.com/s/Mg89XdV2vMzESLJRF-JZIw)
* [什么是数据库 Schema Drift](https://mp.weixin.qq.com/s/vP9r74-jj4KQTo0_P9aWaA)
* [解读 Retool 团队升级 4TB PostgreSQL 踩坑](https://mp.weixin.qq.com/s/FQxgow6lqHydagUm_QG6hA)

博客文章毕竟是一种比较口语化的内容输出形式，并且受限于文章篇幅，往往不能够完整地讨论一个问题。通常，博客文章的作用局限于对知识思路进行整理时的阶段性输出，或者即时地议论时事。如果相关内容在你的脑海中有比较完整的脉络，或者有具体的结论，首先可以写一篇文章再做一轮输出，然后就是把相关文章作为原材料，二次创作形成文档、论文或者书籍了。

前面提到，内核开发者社群的内容飞轮，是沟通渠道和开发文档共同支撑的。沟通渠道产生原始知识，总结沉淀形成开发文档，文档再作为可引用的对象参与沟通，相互促进。其实把博客文章认为是一种作者对读者有输出优势的沟通渠道，这个论断仍然是成立的。例如，TiDB Development Guide 的内核技术部分，很大程度上来源于此前发布的源码阅读系列。例如，我正在撰写的[《开源指南》](https://tisonkun.org/open-source-guides/)文档，内容也会参考此前写作的与开源相关的博客。

论文的形式相对博客文章更加正式，并且经过同行评审后才会在相关期刊会议上发出。分布式系统的明星博主 [Martin Kleppmann](https://martin.kleppmann.com/) 就实践过这种做法。

书籍相对于博客文章来说，容量更加宽裕。开源软件到达一定的流行程度以后，大多会发行相关的书籍来系统性的介绍自己的设计和使用场景，大幅度的提升自己的技术影响力。《Redis 使用手册》、《HBase 原理与实践》以及各种“权威指南”，均属于此类。

## 写作之外

写作之外的内容不是本文的重点，因此只做简单的介绍。

随着时代的发展，多媒体内容逐渐占据了内容市场的重要比例。除去撰写文章、书籍和文档，以及开发过程当中涉及的技术写作内容以外，在内容创作这个大门类下面，还有其他的重要形式。

例如，演讲是近年来线上线下社群活动的重要组成部分。通过 KOL 围绕主题并提供示例的演讲，往往能够在听众当中形成一个强有力的印象。KOL 本身很多时候也需要通过演讲来建立起自己的影响力。可以说，演讲能力是一个内容创作者必须掌握的关键能力。

例如，越来越多的开源社群在 Bilibili 和 Youtube 等视频网站上开设自己的账号并上传视频和短视频内容。这可以理解成线上演讲的一部分，也包括线上课程和功能展示等等。目前视觉化地学习 Flink 和 Pulsar 最好的资源，就是它们在 Bilibili 上发布的视频内容。

* [Pulsar: TGIP-CN 直播合集](https://www.bilibili.com/video/av87830398)
* [Apache Flink 系列教程入门篇](https://space.bilibili.com/33807709/channel/seriesdetail?sid=1378455)

例如，播客作为视频和文字之间的折衷，也越来越得到开源社群的青睐。[ALC Beijing](http://xima.tv/1_mFtWul?_sonic=0) 和 [CHAOSS China](http://xima.tv/1_OWWef3?_sonic=0) 这样的社群，会通过播客的方式邀请专业嘉宾访谈来输出自己的内容观点。

可以看到，开源软件的技术写作，到开源软件的内容创作，是一个内涵极其丰富的领域。即使最贴近软件开发的注释和提交信息的部分可以结合到软件工程实践当中由开发人员完成，但是针对受众群体特征的文档的写作，内容的国际化与本地化，文章与书籍的技术写作技巧，内容生产之后运营和推广的能力，与开发一个软件所需掌握的技术能力是有很大区别的。

当然，我不会说一个人只能同时掌握这些能力当中的一个，我也见过许多开发人员有动力、有能力并最终通过努力成为高水平的内容创作者。但是，作为关注开源项目发展的决策者，作为需要认识到开源社群如何建设的每一个人，将这一过程类比为一个新兴的创业项目，要好过想象成一个开发者团队能够覆盖方方面面的工程项目。

实际上，我们尚未看到有任何一个创业公司，能够达到 Linux 这样的成就。同时，Linux 的协同方式与传统的公司运作方式有着许多不同。清醒客观地认识到开源社群建设与发展的复杂性和创新性，评估和应对其中包括软件开发、项目管理、内容创作、市场营销乃至资金支持的风险和相应的收益，才是应有的审慎的态度。