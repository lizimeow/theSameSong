const data = {
    // 所有的房间列表
    roomsList: {
        1: {
            // 房间 id
            public: false,
            id: 1,
            // 房间名
            roomName: '我爱林宥嘉',
            // 每个房间的在线用户数
            online: 0,
            // 房间的当前播放歌曲
            curSong: {
                index: -1,
                name: '好想你',
                singer: '李雪莱',
                url: 'dl.stream.qqmusic.qq.com/C100001X2xG60kjdoW.m4a?vkey=84ACC753F44C68DE25DEB59EAA22C250FC3CE05417ABA63FB5EF0F88A106DC74641D132D6ECAF67FC5F871C96DA4F36E9C27EA666C70984F&guid=123456'
            },
            // 房间的播放列表
            playQueue: [
                { index: 0, singer: "林宥嘉", name: "说谎", url: "dl.stream.qqmusic.qq.com/C100000W95Fk3lAVxV.m4a?vk…F72BA63A9A0B5AB36F82FA201EDE128046CEC&guid=123456" },
                { index: 1, name: "残酷月光", singer: "林宥嘉", url: "dl.stream.qqmusic.qq.com/C100002FeoGW3Y832q.m4a?vkey=FD40FF9FFB7D39CA11568775E994171ABEB13B9567EB97CF83A16D0591B3D00ABBFA60A7FD9EE4F00CA0D010200B664A25116FD895A7D61C&guid=123456" },
                { index: 2, singer: "林宥嘉", name: "浪费", url: "dl.stream.qqmusic.qq.com/C100000SU3OH3Nu5hx.m4a?vk…785B062A71F6B54261A9776CF1B8EAEB980FB&guid=123456" },
                { index: 3, singer: "林宥嘉", name: "傻子", url: "dl.stream.qqmusic.qq.com/C100000duyvA356pZf.m4a?vk…6A90686D351864B3965FD361B2BFE76BF8C7F&guid=123456" },
                { "singer": "林宥嘉", "name": "天真有邪", "url": "dl.stream.qqmusic.qq.com/C100003wFozn3V3Ra0.m4a?vkey=610E4BC44DE46D7696E453F97B060260F1DD6E6578BD852FCF7019139C88280D5C56E55D0F069A08274BD2EE09EE97322CE53A17323EF57C&guid=123456", "index": 4 }
            ]
        },
        '29876': {
            // 房间 id
            public: true,
            id: '29876',
            // 房间名
            roomName: '😜',
            // 每个房间的在线用户数
            online: 0,
            // 房间的当前播放歌曲
            curSong: {
                index: -1,
                name: '第一天',
                singer: '孙燕姿',
                url: 'dl.stream.qqmusic.qq.com/C100001Ss4AC2Ol5Yg.m4a?vkey=878BF67D5D2ABDEDE9A2398BDB4A9CD99EDBA5833405358DC05250CD6F695FE38C05F036A60B6202F36432D3B2BD8AE43092E28DC2822F62&guid=123456'
            },
            // 房间的播放列表
            playQueue: []
        },
        '3asdn': {
            // 房间 id
            public: true,
            id: '3asdn',
            // 房间名
            roomName: '新歌榜',
            // 每个房间的在线用户数
            online: 0,
            // 房间的当前播放歌曲
            curSong: {
                index: -1,
                name: '等你下课(with 杨瑞代)',
                singer: '周杰伦',
                url: 'dl.stream.qqmusic.qq.com/C100001J5QJL1pRQYB.m4a?vkey=5B33D18052992C44B57BA4BF7544D2A5ED3DF918975F0357CEFDE02B9D70E6BE0C432527209DB0E20D155DDF3168FA76D5D95E55F35A3B7B&guid=123456'
            },
            // 房间的播放列表
            playQueue: []
        },
        '2444': {
            // 房间 id
            public: true,
            id: '2444',
            // 房间名
            roomName: 'Troye!',
            // 每个房间的在线用户数
            online: 0,
            // 房间的当前播放歌曲
            curSong:
                {
                    index: 0,
                    "singer": "Troye Sivan Allday",
                    "name": "For him.",
                    "url": "dl.stream.qqmusic.qq.com/C100003eb8oy3oB8FG.m4a?vkey=A5023F15C9F36E4572E65B0678438B19904471DFEB9724234062578FB2F8B931CC56C679573F6C1ECA57F9BE4081691279C0D5223C0F8655&guid=123456"
                },
            // 房间的播放列表
            playQueue: [
                {
                    index: 0,
                    "singer": "Troye Sivan Allday",
                    "name": "For him.",
                    "url": "dl.stream.qqmusic.qq.com/C100003eb8oy3oB8FG.m4a?vkey=A5023F15C9F36E4572E65B0678438B19904471DFEB9724234062578FB2F8B931CC56C679573F6C1ECA57F9BE4081691279C0D5223C0F8655&guid=123456"
                },
                {"singer":"Troye Sivan","name":"YOUTH","url":"dl.stream.qqmusic.qq.com/C100003g2Qd8198JOC.m4a?vkey=289F0B9343ED6D22F38F77047ADFA4BD70922CB5431474A631754A622459EE7CD015F7CBB2A5AB9D92D7972FFDD9F66BC7CF8D4834DF2765&guid=123456","index":1}
            ]
        },
    },
    allNumber: 0,
    psw: {
        1: '123456',
        '29876': '',
        '3asdn': '',
        '2444': '',
    },
    commitlist: {
        1: [
            { username: '我叫嘻嘻嘻', commit: '我超喜欢这首歌!', curSongName: '林宥嘉-天真有邪', time: 'Sat Jan 20 2018 19:31:51' },
            { username: 'lizimeow', commit: '我也超喜欢这首歌_(:зゝ∠)_', curSongName: '林宥嘉-天真有邪', time: 'Sat Jan 20 2018 19:21:40' },
            { username: '猜猜', commit: '还行吧', curSongName: '林宥嘉-残酷月光', time: 'Sat Jan 20 2018 19:11:00' },
        ],
        '29876': [],
        '3asdn': [],
        '2444': [
            { username: 'lizimeow', commit: '戳爷Troye Sivan 联手 马丁Martin Garrix的新单「There For You」终于出炉啦！ 💜💜💜', curSongName: 'Martin Garrix Troye Sivan-There For You', time: 'Sat Jan 20 2018 19:25:25' },            
        ],
    }
}

module.exports = data
