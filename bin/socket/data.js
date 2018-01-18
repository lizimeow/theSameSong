const data = {
    // 所有的房间列表
    roomsList: {
        1: {
            // 房间 id
            id: 1,
            // 房间名
            roomName: '我爱林宥嘉',
            // 每个房间的在线用户数
            online: 0,
            // 房间的当前播放歌曲
            curSong: {
                name: '好想你',
                singer: '李雪莱',
                url: 'dl.stream.qqmusic.qq.com/C100001X2xG60kjdoW.m4a?vkey=84ACC753F44C68DE25DEB59EAA22C250FC3CE05417ABA63FB5EF0F88A106DC74641D132D6ECAF67FC5F871C96DA4F36E9C27EA666C70984F&guid=123456'
            },
            // 房间的播放列表
            playQueue: [
                { singer: "林宥嘉", name: "说谎", url: "dl.stream.qqmusic.qq.com/C100000W95Fk3lAVxV.m4a?vk…F72BA63A9A0B5AB36F82FA201EDE128046CEC&guid=123456" },
                { name: "残酷月光", singer: "林宥嘉", url: "dl.stream.qqmusic.qq.com/C100002FeoGW3Y832q.m4a?vkey=FD40FF9FFB7D39CA11568775E994171ABEB13B9567EB97CF83A16D0591B3D00ABBFA60A7FD9EE4F00CA0D010200B664A25116FD895A7D61C&guid=123456" },
                { singer: "林宥嘉", name: "浪费", url: "dl.stream.qqmusic.qq.com/C100000SU3OH3Nu5hx.m4a?vk…785B062A71F6B54261A9776CF1B8EAEB980FB&guid=123456" },
                { singer: "林宥嘉", name: "傻子", url: "dl.stream.qqmusic.qq.com/C100000duyvA356pZf.m4a?vk…6A90686D351864B3965FD361B2BFE76BF8C7F&guid=123456" }
            ]
        },
        2: {
            // 房间 id
            id: 2,
            // 房间名
            roomName: '222',
            // 每个房间的在线用户数
            online: 0,
            // 房间的当前播放歌曲
            curSong: {
                name: '第一天',
                singer: '孙燕姿',
                url: 'dl.stream.qqmusic.qq.com/C100001Ss4AC2Ol5Yg.m4a?vkey=878BF67D5D2ABDEDE9A2398BDB4A9CD99EDBA5833405358DC05250CD6F695FE38C05F036A60B6202F36432D3B2BD8AE43092E28DC2822F62&guid=123456'
            },
            // 房间的播放列表
            playQueue: []
        },
        3: {
            // 房间 id
            id: 3,
            // 房间名
            roomName: '222',
            // 每个房间的在线用户数
            online: 0,
            // 房间的当前播放歌曲
            curSong: {
                name: '等你下课(with 杨瑞代)',
                singer: '周杰伦',
                url: 'dl.stream.qqmusic.qq.com/C100001J5QJL1pRQYB.m4a?vkey=5B33D18052992C44B57BA4BF7544D2A5ED3DF918975F0357CEFDE02B9D70E6BE0C432527209DB0E20D155DDF3168FA76D5D95E55F35A3B7B&guid=123456'
            },
            // 房间的播放列表
            playQueue: []
        },

    },
    allNumber: 0,
    session: []
}

module.exports = data
